import {Component} from "react";

import './charInfo.scss';
import Skeleton from "../skeleton/Skeleton";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import marvelService from "../../services/MarvelService";
import PropTypes from "prop-types";

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.charId !== this.props.charId) {
            this.updateChar()
        }
    }

    onLoadedChar = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onErrorMessage = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
            return
        }
        this.onCharLoading()
        this.marvelService.getCharacter(charId)
            .then(this.onLoadedChar)
            .catch(this.onErrorMessage)
    }

    render() {
        const {char, loading, error} = this.state
        const skeleton = loading || error || char ? null : <Skeleton/>
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(loading || error || !char ) ? <CharView char={char}/> : null

        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {content}
            </div>
        )
    }
}

const CharView = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char
    const comicsItem = comics.map((item, i) => {
        if (i > 10) return
        return (
            <li key={i}
                className="char__comics-item">
                {item.name}
            </li>
        )

    })

    const styleImgChar = marvelService.checkImgNotFound(thumbnail, 'contain')
    const comicsNotFoundDescr = comics.length > 0 ? null : 'There is no comics this char'

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImgChar}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsNotFoundDescr}
                {comicsItem}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;