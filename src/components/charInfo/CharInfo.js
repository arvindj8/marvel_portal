import {useEffect, useState} from "react";

import './charInfo.scss';
import Skeleton from "../skeleton/Skeleton";
import useMarvelService, {checkImgNotFound} from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from "prop-types";

const CharInfo = (props) => {
    const [char, setChar] = useState(null)
    const {loading, error, getCharacter} = useMarvelService()


    useEffect(() => updateChar(), [props.charId])

    const onLoadedChar = (char) => {
        setChar(char)
    }


    const updateChar = () => {
        const {charId} = props
        if (!charId) {
            return
        }
        getCharacter(charId)
            .then(onLoadedChar)
    }

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

    const styleImgChar = checkImgNotFound(thumbnail, 'contain')
    const comicsNotFoundDescr = comics.length > 0 ? null : 'There is no comics this char'

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail}
                     style={styleImgChar}
                     alt={name}/>
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