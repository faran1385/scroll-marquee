import React, {useRef, useState} from 'react';
import gsap from "gsap"
import {useGSAP} from "@gsap/react";
import {Section} from "./section";

const sectionData = [
    {
        id: 1,
        title: "NEARA",
        imageUrl: "https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d571ab9d9502f_neara-cover-home.jpg",
        texts: ["2021", "Fashion & Accessories", "Branding", "Website"]
    },
    {
        id: 2,
        title: "I, THE QUEEN",
        imageUrl: "https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d57b75fd95030_scepter-cover-2.jpg",
        texts: ["2021", "Food & Beverage", "Branding", "Packaging"]
    },
    {
        id: 3,
        title: "THERADD",
        imageUrl: "https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d57d06dd95033_theradd-cover-home.jpg",
        texts: ["2021", "Hospitality", "Branding", "Website"]
    },
    {
        id: 4,
        title: "FUENTE REAL",
        imageUrl: "https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d57670dd95031_fuentereal-cover-home.jpg",
        texts: ["2021", "Real Estate", "Branding", "UI/UX"]
    },
    {
        id: 5,
        title: "FENWAY CENTER",
        imageUrl: "https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d570336d95034_fenwaycenter-cover-home.jpg",
        texts: ["2021", "Professional Services", "Branding", "UI/UX"]
    },
    {
        id: 6,
        title: "APOSTLE DIGITAL",
        imageUrl: "https://assets.website-files.com/6266fd2c922d57e602d9502d/6266fd2c922d57f61dd95032_apostle-cover-home.jpg",
        texts: ["2021", "Professional Services", "Branding", "UI/UX"]
    }
];

function App() {
    const [scrollingDirection, setScrollingDirection] = useState<"up" | "down" | null>(null)
    const [page, setPage] = useState<{ pageNumber: number, mode: "enter" | "enterBack" }>({pageNumber: 1, mode: "enter"})
    const pageNumberArrow = useRef(null)
    useGSAP(() => {
        gsap.to(pageNumberArrow.current, {
            duration: 1,
            rotationZ: `${scrollingDirection === "down" ? "0" : "180"}deg`
        })
    }, {dependencies: [scrollingDirection]})

    useGSAP(() => {
        gsap.to(`.page-${page.pageNumber}`, {
            duration: .5,
            left: "0",
            opacity: "1"
        })
        if (page.mode === "enter") {
            gsap.to(`.page-${-1 + page.pageNumber}`, {
                duration: .5,
                left: "-100%",
                opacity: "0"
            })
        } else {
            gsap.to(`.page-${+1 + page.pageNumber}`, {
                duration: .5,
                left: "100%",
                opacity: "0"
            })
        }
    }, {dependencies: [page]})

    return (
        <main className={"sections-container"}>
            <div className="home-sections">
                {sectionData.map((section) => (
                    <Section
                        key={section.id}
                        setPage={setPage}
                        direction={scrollingDirection}
                        setDirection={setScrollingDirection}
                        id={section.id}
                        texts={section.texts}
                        title={section.title}
                        imageUrl={section.imageUrl}
                    />
                ))}
            </div>
            <div className={"lg:flex hidden fixed z-10 h-screen end-0 page-number px-8"}>
                <span className={"text-white flex relative items-center me-8"}>
                    <span className={"w-3/4 absolute h-full end-full overflow-hidden"}>
                        <span className={"absolute page-1"}>1</span>
                        <span className={`absolute start-full opacity-0 page-${2}`}>2</span>
                        <span className={`absolute start-full opacity-0 page-${3}`}>3</span>
                        <span className={`absolute start-full opacity-0 page-${4}`}>4</span>
                        <span className={`absolute start-full opacity-0 page-${5}`}>5</span>
                        <span className={`absolute start-full opacity-0 page-${6}`}>6</span>
                    </span>
                    <span>/</span>
                    <span className={"relative z-10"}>6</span>
                </span>
                <span ref={pageNumberArrow} className={"page-number__arrow rotate-180 text-white"}>
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
