import React, {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
    imageUrl: string,
    title: string,
    texts: string[],
    id: number,
    setDirection: React.Dispatch<React.SetStateAction<"up" | "down" | null>>,
    direction: "up" | "down" | null,
    setPage: React.Dispatch<React.SetStateAction<{ pageNumber: number, mode: "enter" | "enterBack" }>>
}

export const Section: React.FC<SectionProps> = (T) => {
    const {id, imageUrl, title, texts, setPage, direction, setDirection} = T;
    const sectionBackground: React.MutableRefObject<HTMLImageElement | null> = useRef(null)

    const {contextSafe} = useGSAP(() => {
        const Entering = (mode: "enter" | "enterBack") => {
            if (id !== 1) {
                gsap.timeline().to(`.image-wrapper-${id}`, {
                    clipPath: "polygon(0px 0px, 100% 0%, 100% 100%, 0% 100%)",
                    transform: "rotate(0)",
                    duration: .5
                }).to(`.section-${id}-texts`, {
                    opacity: 1,
                    transform: "translate(0)",
                    stagger: .2
                }, ">").to(`.section-${id}-view-btn`, {
                    opacity: 1,
                }, "<").to(`.section-${id}-title`, {
                    opacity: 1,
                    transform: "translate(0)",
                    stagger: .2
                }, ">")
            } else {
                gsap.timeline().to(`.section-${id}-texts`, {
                    opacity: 1,
                    transform: "translate(0)",
                    stagger: .2
                }).to(`.section-${id}-view-btn`, {
                    opacity: 1,
                }, "<").to(`.section-${id}-title`, {
                    opacity: 1,
                    transform: "translate(0)",
                    stagger: .2
                }, ">")
            }
            setPage({pageNumber: id, mode})
        }
        const Leaving = (isBackLeave: boolean) => {
            if (id !== 1 && isBackLeave) {
                gsap.timeline().to(`.image-wrapper-${id}`, {
                    clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                    transform: "rotate(-50deg)",
                    duration: .5
                })
            }
            gsap.killTweensOf(`.section-${id}-texts`, {opacity: 0, transform: "translate(0,1rem)"})
            gsap.killTweensOf(`.section-${id}-view-btn`, {opacity: 0, transform: "translate(0,1rem)"})
            gsap.killTweensOf(`.section-${id}-title`, {opacity: 0, transform: "translate(0,1rem)"})
            gsap.set(`.section-${id}-title`, {opacity: 0, transform: "translate(0,1rem)"})
            gsap.set(`.section-${id}-texts`, {opacity: 0})
            gsap.set(`.section-${id}-view-btn`, {opacity: 0})
        }

        gsap.to(sectionBackground.current, {
            scale: "1.2 1.2",
            scrollTrigger: {
                trigger: ".sections-container",
                start: () => {
                    return (id - 1) * (document.querySelector(`.section-${id}`) as HTMLElement).clientHeight * 2
                },
                end: () => {
                    return (id * ((document.querySelector(`.section-${id}`) as HTMLElement).clientHeight * 2))
                },
                pin: true,
                scrub: 3,
                onEnter: () => Entering("enter"),
                onEnterBack: () => Entering("enterBack"),
                onLeaveBack: () => Leaving(true),
                onLeave: () => Leaving(false),
                onUpdate: (self) => direction !== "down" && self.direction === 1 ? setDirection("down") : direction !== "up" && self.direction === -1 ? setDirection("up") : ""
            }
        })
    })

    const viewBtnMouseIn = contextSafe(() => {
        gsap.to(".section-container__view-btn", {
            transform: "rotate(0)"
        })
    })

    const viewBtnMouseOut = contextSafe(() => {
        gsap.to(".section-container__view-btn", {
            transform: "rotate(45deg)"
        })
    })

    return (
        <section key={id} style={{zIndex: id}}
                 className={`section-container absolute section-${id} w-screen px-8`}>
            <figure style={{clipPath: id !== 1 ? "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" : "none"}}
                    className={`${id % 2 === 0 && id !== 1 ? "rotate-45" : id !== 1 ? "-rotate-45" : ""} w-full inset-0 h-full absolute image-wrapper-${id}`}>
                <img alt={"background"} ref={sectionBackground}
                     className={`w-full object-cover section-container__image image-${id}`}
                     src={imageUrl}/>
            </figure>
            <div className={"absolute top-1/2 -translate-y-1/2"}>
                {texts.map((text, index) => {
                    return <h2 key={index}
                               className={`${id !== 1 ? "translate-y-4 opacity-0" : ""} section-container__text section-${id}-texts  text-white`}>{text}</h2>;
                })}
            </div>

            <div className={"h-full w-full flex justify-end items-center"}>
                <button onMouseEnter={() => viewBtnMouseIn()} onMouseOut={() => viewBtnMouseOut()}
                        className={`${id !== 1 ? "translate-y-4 opacity-0" : ""} section-container__view-btn section-${id}-view-btn  text-white border-white border-solid border-2 rounded-full`}>VIEW
                </button>
            </div>
            <h1 className={`${id !== 1 ? "translate-y-4 opacity-0" : ""} section-container__title section-${id}-title absolute bottom-0 text-white`}>{title}</h1>
        </section>
    );
}