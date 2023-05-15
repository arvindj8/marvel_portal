import React, {Component} from "react";

import MarvelService from "../../services/MarvelService";
import './charList.scss';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import marvelService from "../../services/MarvelService";
import {CircularProgress} from "@mui/material";
import PropTypes from "prop-types";

class CharList extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
        this.state = {
            chars: [],
            loading: true,
            error: false,
            loadingNextChars: false,
            offset: 210,
            charEnded: false,
            activeCharId: null
        }
    }


    marvelService = new MarvelService()

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.setState({
            loadingNextChars: true
        });

        this.marvelService.getCharactersAll(offset)
            .then(chars => this.onLoadedChar(chars))
            .catch(this.onErrorMessage)
    }

    onLoadingChar = () => {
        this.setState({
            loadingNextChars: true
        })
    }

    onLoadedChar = (newChars) => {
        let charEnded = false
        if (newChars.length === 0) {
            charEnded = true
        }

        this.onLoadingChar()
        this.setState(({chars, offset}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            loadingNextChars: false,
            offset: offset + 9,
            charEnded: charEnded
        }))
    }

    onErrorMessage = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onFocus = (charId) => {
        this.setState({
            activeCharId: charId
        })
    }

    onBlur = () => {
        this.setState({
            activeCharId: null,
        });
    };

    renderItems = (arr) => {
        const charItem = arr.map(char => {
            const styleImgChar = marvelService.checkImgNotFound(char.thumbnail, 'unset')
            return (
                <li key={char.id}
                    onClick={() => this.props.onCharSelected(char.id)}
                    className="char__item"
                    ref={this.myRef}
                    tabIndex={0}
                    onFocus={() => this.onFocus(char.id)}
                    onBlur={() => this.onBlur(char.id)}>
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
        const {chars, loading, error, offset, loadingNextChars, charEnded} = this.state
        const items = this.renderItems(chars)
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(loading || error) ? items : null
        const spinnerLoading = !loadingNextChars ? null : <CircularProgress style={
            {
                marginTop: "10px",
                color: "red",
                strokeWidth: "5"}
        }/>

        return (
            <div className="char__list">
                {content}
                {spinner}
                {errorMessage}
                {spinnerLoading}
                <button
                    className="button button__main button__long"
                    disabled={loadingNextChars}
                    onClick={() => this.onRequest(offset)}
                    style={{display: charEnded ? "none" : "block"}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.prototypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;