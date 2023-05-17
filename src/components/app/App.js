import {useState} from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import AppBanner from "../appBanner/AppBanner";

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";


const App = () => {
    // const [selectChar, setChar] = useState(1011334)
    //
    // const onCharSelected = (id) => {
    //     setChar(id)
    // }

    return (
        <div className="app">
            <AppHeader/>

            <main>
                {/*<ErrorBoundary>*/}
                {/*    <RandomChar/>*/}
                {/*</ErrorBoundary>*/}
                {/*<div className="char__content">*/}
                {/*    <CharList onCharSelected={onCharSelected}/>*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharInfo charId={selectChar}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*</div>*/}
                {/*<img className="bg-decoration" src={decoration} alt="vision"/>*/}
                <AppBanner/>
                <ComicsList/>
            </main>

        </div>
    )

}

export default App;