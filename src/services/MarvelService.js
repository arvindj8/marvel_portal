import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _prevApi = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=bad3fbcfe6024ed5edd8a80d58630018'
    const _baseOffset = 210

    const getCharactersAll = async (offset = _baseOffset) => {
        const result = await request(
            `${_prevApi}characters?limit=9&offset=${offset}&${_apiKey}`
        )
        return result.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const result = await request(
            `${_prevApi}characters/${id}?${_apiKey}`
        )
        return _transformCharacter(result.data.results[0])
    }

    const _transformCharacter = (res) => {
        return {
            id: res.id,
            name: res.name,
            description: res.description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }

    const getComicsAll = async (offset= 0) => {
        const result = await request(`${_prevApi}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
        return result.data.results.map(_transformComics)
    }


    const _transformComics = (res) => {

        return {
            id: res.id,
            title: res.title,
            description: res.description || "There is no description",
            pageCount: res.pageCount ? `${res.pageCount} p.` : "No information about the number of pages",
            price: res.prices[0].price ? `${res.prices[0].price}$` : "not available",
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            language: res.textObjects[0]?.language || "en-us",
            url: res.urls[0].url
        }
    }



    return {
        loading,
        error,
        getCharactersAll,
        getCharacter,
        clearError,
        getComicsAll}
}


const checkImgNotFound = (thumbnail, objectFit) => {
    const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    return thumbnail === imgNotFound ? {objectFit: objectFit} : null
}

export default useMarvelService
export {checkImgNotFound}