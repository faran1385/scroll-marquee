import "./hero-section.css"
import {Marquee} from "../../components/ui/marquee/marquee";

export const HeroSection = () => {
    return (<section className={"hero-section flex items-center"}>
        <figure className={"w-full flex justify-center h-fit"}>
            <img alt={"soda"} className={"hero-section__image hero-section__image-large hero-section__image-small relative z-10"}
                 src={"https://assets.website-files.com/63b6f4497a8b7545922c200a/63b79f31efdaa8435776b63b_894164_All8Flavors_Cans_TropicalBerry_020821.png"}/>
        </figure>
        <div className={"absolute h-full overflow-hidden  flex flex-col w-full "} style={{fontSize:"2vw"}}>
            <Marquee moving={"backward"} zIndex={1}  titles={["BOOSTING IMMUNITY", "BOOSTING IMMUNITY"]} position={"end"}/>
            <Marquee moving={"forward"} zIndex={10} titles={["INCREASING ENDURANCE", "INCREASING ENDURANCE"]} position={"start"}/>
        </div>
    </section>)
}