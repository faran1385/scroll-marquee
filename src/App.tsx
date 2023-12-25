import React from 'react';

import {Section} from "./section";

function App() {

    return (
        <main className={"sections-container"}>

            <div className="home-sections">
                <Section id={1} texts={["2021", "Fashion & Accessories", "Branding","Website"]} title={"NEARA"}
                         imageUrl={"https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d571ab9d9502f_neara-cover-home.jpg"}/>
                <Section id={2} texts={["2021", "Food & Beverage", "Branding","Packaging"]} title={"I, THE QUEEN"}
                         imageUrl={"https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d57b75fd95030_scepter-cover-2.jpg"}/>
                <Section id={3} texts={["2021", "Real Estate", "Branding"]} title={"THE RADD"}
                         imageUrl={"https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d57d06dd95033_theradd-cover-home.jpg"}/>
                <Section id={4} texts={["2021", "Hospitality", "Branding","Website"]} title={"FUENTE REAL"}
                         imageUrl={"https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d57670dd95031_fuentereal-cover-home.jpg"}/>
                <Section id={5} texts={["2021", "Real Estate", "Branding","UI/UX"]} title={"FENWAY CENTER"}
                         imageUrl={"https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d570336d95034_fenwaycenter-cover-home.jpg"}/>
                <Section id={6} texts={["2021", "Professional Services", "Branding","UI/UX"]} title={"APOSTLE DIGITAL"}
                         imageUrl={"https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d57f61dd95032_apostle-cover-home.jpg"}/>
            </div>
            <div className={"lg:flex hidden fixed bottom-0 end-0 page-number px-8"}>
                <span className={"text-white me-8"}>
                    <span>1</span>
                    /
                    <span>6</span>
                </span>
                <span className={"page-number__arrow rotate-180 text-white"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5vw" viewBox="0 0 9.414 13.6">
                        <g id="Group_16" data-name="Group 16" transform="translate(-1.293 1.5)">
                            <line id="Line_1" data-name="Line 1" y1="13" transform="translate(6 -1.5)" fill="none"
                                  stroke="currentColor" strokeLinejoin="round" strokeWidth="1.3"></line>
                            <path id="Path_1320" data-name="Path 1320" d="M10,7.5l-4,4-4-4" fill="none"
                                  stroke="currentColor" strokeWidth="1.3"></path>
                        </g>
                    </svg>
                </span>
            </div>
        </main>
    )
}

export default App;
