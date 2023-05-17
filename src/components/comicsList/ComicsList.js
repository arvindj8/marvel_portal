import React, {useState, useEffect} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './comicsList.scss';
import {CircularProgress} from "@mui/material";

const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [nextComics, setNextComics] = useState(true)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)
    const {loading, error, getComicsAll} = useMarvelService()


    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNextComics(false) : setNextComics(true)

        getComicsAll(offset)
            .then(comics => onLoadedComics(comics))
    }

    const onLoadedComics = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComics([...comics, ...newComics])
        setNextComics(false)
        setOffset(offset + 8)
        setComicsEnded(ended)
    }

    const renderComics = (arr) => {
        const comicsItem = arr.map((comics, i) => {
            return (
                <li key={i}
                    className="comics__item">
                    <a href={comics.url}>
                        <img src={comics.thumbnail}
                             alt="ultimate war"
                             className="comics__item-img"
                        />
                        <div
                            className="comics__item-name">{comics.title}</div>
                        <div
                            className="comics__item-price">{comics.price}
                        </div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {comicsItem}
            </ul>
        )
    }

    const comicsItems = renderComics(comics)
    const spinner = loading && !nextComics ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const spinnerLoading = !nextComics ? null : <CircularProgress style={
        {
            color: "red",
            strokeWidth: "5"}
    }/>


    return (
        <div className="comics__list">
            {comicsItems}
            {spinner}
            {errorMessage}
            <div className="comics__loading">{spinnerLoading}</div>
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    style={{display: comicsEnded ? "none" : "block"}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;