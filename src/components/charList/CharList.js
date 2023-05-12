import {Component} from "react";

import MarvelService from "../../services/MarvelService";
import './charList.scss';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import marvelService from "../../services/MarvelService";

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.marvelService.getCharactersAll()
            .then(chars => this._setChars(chars))
            .catch(this.onErrorMessage)
    }

    _setChars = (chars) => {
        this.setState({
            chars,
            loading: false
        })
    }

    onErrorMessage = () => {
        this.setState({
            loading: false,
            error: true
        })
    }



    renderItems = (arr) => {
        const charItem = arr.map(char => {
            const styleImgChar = marvelService.checkImgNotFound(char.thumbnail, 'unset')
            return (
                <li key={char.id} className="char__item">
                    <img src={char.thumbnail} alt="abyss" style={styleImgChar}/>
                    <div className="char__name">{char.name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {charItem}
            </ul>
        )
    }


    render() {
        const {chars, loading, error} = this.state
        const items = this.renderItems(chars)
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(loading || error) ? items : null

        return (
            <div className="char__list">
                {content}
                {spinner}
                {errorMessage}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;