import React from 'react';
import {HeroSection} from "./containers/hero-section/hero-section";
import {Retailers} from "./containers/retailers/retailers";
import {ImageSlider} from "./containers/imageSlider/imageSlider";

function App() {


    return (
        <main className={"main-content"}>
            <HeroSection/>
            <Retailers/>
            <ImageSlider/>
        </main>
    )
}

export default App;
