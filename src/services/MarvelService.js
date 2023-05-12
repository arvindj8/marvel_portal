class MarvelService {
    _prevApi = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=bad3fbcfe6024ed5edd8a80d58630018'


    getResource = async (url) => {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error(`Данные не получены, ошибка ${res.status}`)
        }
        return await res.json()
    }

    getCharactersAll = async () => {
        const result = await this.getResource(
            `${this._prevApi}characters?limit=9&offset=120&${this._apiKey}`
        )
        return result.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const result = await this.getResource(
            `${this._prevApi}characters/${id}?${this._apiKey}`
        )
        return this._transformCharacter(result.data.results[0])
    }

    _transformCharacter = (res) => {
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

    static checkImgNotFound = (thumbnail, objectfit) => {
        const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        return thumbnail === imgNotFound ? {objectFit: objectfit} : null
    }
}

export default MarvelService