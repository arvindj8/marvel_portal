import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelService from "./services/MarvelService";
import './style/style.scss';

const marvelService = new MarvelService()
marvelService.getCharactersAll().then(res => res.data.results.forEach(item => console.log(item.name)))
marvelService.getCharacter(1010910).then(r => console.log(r))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

