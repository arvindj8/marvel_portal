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

    getCharactersAll = () => {
        return this.getResource(`${this._prevApi}characters?limit=9&offset=200&${this._apiKey}`)
    }

    getCharacter = (id) => {
        return this.getResource(`${this._prevApi}characters/${id}?${this._apiKey}`)
    }
}

export default MarvelService