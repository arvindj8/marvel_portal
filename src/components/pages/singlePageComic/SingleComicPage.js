import './singleComic.scss';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import useMarvelService from "../../../services/MarvelService";

const SingleComicPage = () => {
    const [comic, setComic] = useState(null)
    const {loading, error, getComic, clearError} = useMarvelService()
    const {comicId} = useParams()

    useEffect(() => updateComic(), [comicId])

    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(onLoadedComic)
    }

    const onLoadedComic = (comic) => {
        setComic(comic)
    }

    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const content = !(loading || error || !comic ) ? <View comic={comic}/> : null

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}


const View = ({comic}) => {
    const {title, description, pageCount, price, thumbnail, language} = comic


    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <a href="src/components/pages#" className="single-comic__back">Back to all</a>
        </div>
    )
}

export default SingleComicPage;