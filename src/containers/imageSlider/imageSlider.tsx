import "./imageSlider.css"
import {SlidingImage} from "../../components/ui/slidingImage/slidingImage";
import {ContextSafeFunc, useGSAP} from "@gsap/react";
import gsap from "gsap"
import {useRef, useState} from "react";

const imageURls: string[] = ["https://assets.website-files.com/63b6f4497a8b7545922c200a/63b7afeea857158307b15514_DSC_6155_2x_e623f3c5-e04f-4ebb-98db-3ae5b58d7b0c_1000x.png", "https://assets.website-files.com/63b6f4497a8b7545922c200a/63b7b03efd7a427451f8ff16_Mask_Group_46_2x_47f014d7-9bb6-4551-a658-b993ab736d5a_1000x-p-500.png", "https://assets.website-files.com/63b6f4497a8b7545922c200a/63b7b011196ba12bc2ce8f82_Mask_Group_7_2x_cf7efe7a-e47c-4c5f-a1a1-27802437d4cb_1000x-p-500.png", "https://assets.website-files.com/63b6f4497a8b7545922c200a/63b7b02251c786e411c22dcb_12_2x_968916f4-fd4e-420b-8ff7-a841b5ad93e0_1000x-p-500.webp"]


export const ImageSlider = () => {
    const pauseBtn = useRef<null | HTMLButtonElement>(null)
    const [isMoving, setMoving] = useState(true)
    useGSAP(() => {
        let tl = gsap.to(".slider", {
            x: "-100%",
            duration: 10,
            repeat: -1,
            overwrite: true,
            ease: "none"
        })
        let isMoving = true;
        const move = () => {
            if (isMoving) {
                const target = document.querySelector(".slider") as HTMLElement;
                let progress = Math.abs(+(target.style.transform.slice(target.style.transform.indexOf("(") + 1, target.style.transform.indexOf(",")).slice(1, target.style.transform.slice(target.style.transform.indexOf("(") + 1, target.style.transform.indexOf(",")).indexOf("%"))))
                tl.play(progress / 10)
            } else {
                tl.pause()
                let pauseTl = gsap.timeline().to(".slider", {
                    x: "+=-2.5%",
                    duration: .625,
                    ease: "power1.out",
                    onUpdate: () => {
                        if (isMoving) {
                            pauseTl.pause()
                        }
                    }
                });
            }
        }
        move()
        const pauseBtnClick = () => {
            isMoving = !isMoving;
            move()
        }
        (pauseBtn.current as HTMLButtonElement).addEventListener("click", pauseBtnClick)

        return () => {
            (pauseBtn.current as HTMLButtonElement).removeEventListener("click", pauseBtnClick)
        }
    })


    return (<section className={"image-slider  overflow-hidden"}>
        <header className={"px-10"}>
            <h2 className={"image-slider__title image-slider__desktop image-slider__mobile"}>TROPICAL</h2>
            <div className={"flex items-center"}>
                <h2 className={"image-slider__title image-slider__desktop image-slider__mobile"}>BERRY</h2>
                <button ref={pauseBtn} onClick={() => setMoving(!isMoving)}
                        className={"image-slider__pause-btn image-slider__pause-btn-large image-slider__pause-btn-small rounded-full"}>
                    {isMoving ? <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 23 23">
                        <g id="Group_433" data-name="Group 433" transform="translate(-688 -1774)">
                            <rect id="Rectangle_316" data-name="Rectangle 316" width="23" height="23"
                                  transform="translate(688 1774)"
                                  fill="#fff" opacity="0"></rect>
                            <rect id="Rectangle_317" data-name="Rectangle 317" width="6" height="19" rx="1"
                                  transform="translate(692 1776)"
                                  fill="currentColor"></rect>
                            <rect id="Rectangle_318" data-name="Rectangle 318" width="6" height="19" rx="1"
                                  transform="translate(702 1776)"
                                  fill="currentColor"></rect>
                        </g>
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 23 23">
                        <g id="Group_432" data-name="Group 432" transform="translate(-688 -1774)">
                            <rect id="Rectangle_316" data-name="Rectangle 316" width="23" height="23"
                                  transform="translate(688 1774)" fill="#fff" opacity="0"></rect>
                            <path id="Polygon_2" data-name="Polygon 2"
                                  d="M9.352,2.4a2,2,0,0,1,3.3,0l7.2,10.47A2,2,0,0,1,18.2,16H3.8a2,2,0,0,1-1.648-3.133Z"
                                  transform="translate(709 1775) rotate(90)" fill="currentColor"></path>
                        </g>
                    </svg>}
                </button>
            </div>
        </header>
        <div className={"flex images-container"}>
            <div className={"w-full slider flex"}>
                {imageURls.map((url, index) => {
                    return <SlidingImage image={url} key={index}/>
                })}
            </div>
            <div className={"w-full slider flex"}>
                {imageURls.map((url, index) => {
                    return <SlidingImage image={url} key={index + imageURls.length}/>
                })}
            </div>
        </div>
    </section>)
}