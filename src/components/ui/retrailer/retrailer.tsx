import React, {useRef} from "react";
import "./retrailer.css"


interface RetrailerProps {
    readonly image: string,
}

export const Retrailer: React.FC<RetrailerProps> = (T) => {
    const {image} = T
    const container: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

    return (
        <div ref={container} className={"retrailer relative my-3 rounded-3xl p-20 sm:p-12 flex items-center justify-center"}>
            <figure className={"flex justify-center"}>
                <img alt={""} className={"retrailer__img md:w-4/5 w-full"}
                     src={image}/>
            </figure>
        </div>)
}