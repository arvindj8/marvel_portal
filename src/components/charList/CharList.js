import React, {useState, useEffect, useRef} from "react";

import useMarvelService, {checkImgNotFound} from "../../services/MarvelService";
import './charList.scss';

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {CircularProgress} from "@mui/material";
import PropTypes from "prop-types";

const CharList = (props) => {
    const [chars, setChars] = useState([])
    const [nextChars, setNextChars] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)
    const [activeCharId, setActiveChar] = useState(null)

    const {loading, error, getCharactersAll} = useMarvelService()




    useEffect(() => {
        onRequest(true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNextChars(false) : setNextChars(true)


        getCharactersAll(offset)
            .then(chars => onLoadedChar(chars))
    }


    const onLoadedChar = (newChars) => {
        let charEnded = false
        if (newChars.length === 0) {
            charEnded = true
        }

        setChars([...chars, ...newChars])
        setNextChars(false)
        setOffset(offset + 9)
        setCharEnded(charEnded)
    }


    const itemRef = useRef(null)

    const onFocus = (charId) => {
        setActiveChar(charId)
    }

    const onBlur = () => {
        setActiveChar(null)
    };

    const onKeyPress = (charId, event) => {
        if (event.key === "Enter") {
            if (activeCharId === charId) {
                props.onCharSelected(charId);
            } else {
                onFocus(charId);
            }
        }

    }

    const renderItems = (arr) => {
        const charItem = arr.map(char => {
            const styleImgChar = checkImgNotFound(char.thumbnail, 'unset')
            return (
                <li key={char.id}
                    onClick={() => props.onCharSelected(char.id)}
                    className="char__item"
                    ref={itemRef}
                    tabIndex={0}
                    onFocus={() => onFocus(char.id)}
                    onBlur={onBlur}
                    onKeyUp={(event) => onKeyPress(char.id, event)}
                    >
                    <img src={char.thumbnail}
                         style={styleImgChar}
                         alt="abyss"/>
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


    const items = renderItems(chars)
    const spinner = loading && !nextChars ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const spinnerLoading = !nextChars ? null : <CircularProgress style={
        {
            marginTop: "10px",
            color: "red",
            strokeWidth: "5"}
    }/>

    return (
        <div className="char__list">
            {items}
            {spinner}
            {errorMessage}
            {spinnerLoading}
            <button
                className="button button__main button__long"
                disabled={nextChars}
                onClick={() => onRequest(offset)}
                style={{display: charEnded ? "none" : "block"}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

CharList.prototypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;