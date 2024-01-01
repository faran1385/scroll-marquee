import React, {useRef} from "react";
import "./marquee.css"
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"

interface MarqueeProps {
    titles: string[],
    position: "start" | "end",
    zIndex: number,
    moving: "backward" | "forward"
}

export const Marquee: React.FC<MarqueeProps> = (T) => {
    const container = useRef<null | HTMLDivElement>(null)
    const {moving, titles, position, zIndex} = T
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        let movingMode: "play" | "reverse" = "reverse";
        let translate = moving === "backward" ? -50 : 0;

        let marqueeTl = gsap.timeline().to(container.current, {
            transform: `translateX(${translate}%)`,
            duration: 20,
            repeat: -1,
            ease: "none",
            onReverseComplete: () => {
                gsap.set(container.current, {transform: `translateX(${translate}%)`})
                marqueeTl.reverse(0)
            },
        });

        let scrollTriggerTimeline = gsap.timeline()

        ScrollTrigger.create({
            animation: scrollTriggerTimeline,
            scrub: 2,
            trigger: ".hero-section",
            start: "top top",
            end: "+=700",
            onUpdate: (self) => {
                if (self.direction === 1) {
                    movingMode = "play"
                    let time = (marqueeTl.time() + .3) >= 20 ? 0 : marqueeTl.time() + .3
                    marqueeTl.play(time)

                } else {
                    movingMode = "reverse"
                    let time = (marqueeTl.time() - .3) < 0 ? 0 : marqueeTl.time() - .3
                    marqueeTl.reverse(time)

                }
            },
            onScrubComplete: () => {
                setTime(marqueeTl);
            }
        });

        const setTime = (timeline: gsap.core.Timeline) => {
            let movedTranslateX = ((container.current as HTMLDivElement).style.transform.slice((container.current as HTMLDivElement).style.transform.indexOf("(") + 1, (container.current as HTMLDivElement).style.transform.indexOf(",")));
            let movedNumber = +(movedTranslateX.indexOf("px") !== -1 ? movedTranslateX.slice(0, movedTranslateX.indexOf("px")) : movedTranslateX.slice(0, movedTranslateX.length - 1));
            let movedPercent = (movedNumber + (Math.abs(movedNumber * 2))) * 100 / 50;
            let time = translate === 0 ? 20 - (20 * movedPercent / 100) : 20 * movedPercent / 100;
            timeline[movingMode](time);
        };
    });
    return (<>
        <div ref={container} style={{zIndex}}
             className={`flex h-2/4 w-fit relative items-${position} ${moving === "forward" ? "-translate-x-1/2" : ""}`}>
            {titles.map((title, index) => {
                return (<div key={index} className={`flex  h-fit me-24 marquee-${moving}`}>
                    <h1 className={`marquee__title marquee__title-large-size marquee__title-small-size`}>{title}</h1>
                    <img className={"ms-8"}
                         src="https://assets.website-files.com/63b6f4497a8b7545922c200a/63b79e762ba2a51e3b81f866_bolt.svg"
                         alt=""/>
                </div>)
            })}
        </div>
    </>)
}