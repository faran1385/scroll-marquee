import React from "react";
import "./retailers.css"
import {Retrailer} from "../../components/ui/retrailer/retrailer";
import {useGSAP} from "@gsap/react";
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

const retrailerURls: string[] = ["https://assets.website-files.com/63b6f4497a8b7545922c200a/63b7a9906824184e13d312f7_google.svg", "https://assets.website-files.com/63b6f4497a8b7545922c200a/63b7ab882e7926ec6bc2f7c0_apple.svg", "https://assets.website-files.com/63b6f4497a8b7545922c200a/63b7abb28ed3430f61157cf9_Nike-Logo.png", "https://assets.website-files.com/63b6f4497a8b7545922c200a/63b7abe80574d50acbc7f457_amazon.svg"]
export const Retailers: React.FC = () => {

    useGSAP(() => {
        let upTlPlayingMode: "play" | "reverse" = "play"
        let downTlPlayingMode: "play" | "reverse" = "play"
        let marqueeUpTl = gsap.timeline().to(".retailer-up", {
            y: `-100%`,
            duration: 5,
            ease: "none",
            repeat: -1,
            onReverseComplete: () => {
                gsap.set(".retailer-up", {y: "-100%"})
                marqueeUpTl.reverse(0)
                console.log("S")
            }
        })

        let marqueeDownTl = gsap.timeline().to(".retailer-down", {
            y: `+=100%`,
            duration: 5,
            ease: "none",
            repeat: -1,
            onReverseComplete: () => {
                gsap.set(".retailer-down", {y: "+=100%"})
                marqueeDownTl.reverse(0)
                console.log("S")
            }
        })


        let scrollUpTl = gsap.timeline().to(".retailer-up", {
            y: `-100%`,
        })

        let scrollDownTl = gsap.timeline().to(".retailer-down", {
            y: `+=100%`,
        })

        ScrollTrigger.create({
            animation: scrollUpTl,
            trigger: ".hero-section",
            start: "bottom bottom",
            endTrigger: ".retailers-container",
            end: "bottom top",
            scrub: 2,
            onUpdate: (self) => {
                marqueeUpTl.pause()
                if (self.direction === 1) {
                    upTlPlayingMode = "play"
                } else {
                    upTlPlayingMode = "reverse"
                }
            },
            onScrubComplete: () => {
                setTime(marqueeUpTl, "retailer-up", 100, upTlPlayingMode)
            }
        })

        ScrollTrigger.create({
            animation: scrollDownTl,
            trigger: ".hero-section",
            start: "bottom bottom",
            endTrigger: ".retailers-container",
            end: "bottom top",
            scrub: 2,
            onUpdate: (self) => {
                marqueeDownTl.pause()
                if (self.direction === 1) {
                    downTlPlayingMode = "play"
                } else {
                    downTlPlayingMode = "reverse"
                }
            },
            onScrubComplete: () => {
                setTime(marqueeDownTl, "retailer-down", 100, downTlPlayingMode)
            }
        })

        const setTime = (timeline: gsap.core.Timeline, targetSelector: string, translate: number, movingMode: "play" | "reverse") => {
            let targets = document.querySelectorAll(`.${targetSelector}`)
            targets.forEach((target) => {
                let movedTranslateY = ((target as HTMLDivElement).style.transform.slice((target as HTMLDivElement).style.transform.indexOf(",") + 1, (target as HTMLDivElement).style.transform.lastIndexOf(",")))
                let movedNumber = +(movedTranslateY.indexOf("px") !== -1 ? movedTranslateY.slice(0, movedTranslateY.indexOf("px")) : movedTranslateY.slice(0, movedTranslateY.length - 1)) % 100
                let movedPercent = movedNumber > 0 ? movedNumber : movedNumber + 100
                let time = movedPercent * 5 / translate
                timeline[movingMode](time)
            })
        }
    })
    return (<section className={"retailers-container"}>
        <header className={"lg:hidden flex w-full px-4 mb-8 justify-between items-end flex-wrap col-end-2"}>
            <div>
                <h2 className={"retailers__title retailers__title-mobile"}>OUR</h2>
                <h2 className={"retailers__title retailers__title-mobile"}>RETAILERS</h2>
            </div>
            <div>
                <button className={"retailers__button retailers__button-mobile rounded-full mt-12"}>Shop Now</button>
            </div>
        </header>
        <div
            className={"retailers overflow-hidden  h-fit items-center md:px-36 sm:px-10 lg:px-28 grid grid-cols-2 w-full bg-white"}>
            <div className={"col-start-1 lg:block hidden absolute justify-center col-end-2"}>
                <h2 className={"retailers__title retailers__title-desktop"}>OUR</h2>
                <h2 className={"retailers__title retailers__title-desktop"}>RETAILERS</h2>
                <button className={"retailers__button rounded-full mt-12"}>Shop Now</button>
            </div>
            <div className={"col-start-1 lg:col-start-2 flex justify-center  col-end-3"}>
                <div className={"px-4 relative py-3 flex justify-between flex-col overflow-hidden"}>
                    <div className={"retailer-up"}>
                        {retrailerURls.map((url, index) => {
                            return <Retrailer image={url} key={index + "up"}/>
                        })}
                    </div>
                    <div className={"retailer-up"}>
                        {retrailerURls.map((url, index) => {
                            return <Retrailer image={url} key={(retrailerURls.length + index) + "up"}/>
                        })}
                    </div>
                </div>
                <div className={"px-4 py-3 flex justify-between flex-col overflow-hidden"}>
                    <div className={"retailer-down"}>
                        {retrailerURls.map((url, index) => {
                            return <Retrailer image={url} key={index + "down"}/>
                        })}
                    </div>
                    <div className={"retailer-down"} style={{transform: "translateY(-200%)"}}>
                        {retrailerURls.map((url, index) => {
                            return <Retrailer image={url} key={(retrailerURls.length + index) + "down"}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </section>)
}