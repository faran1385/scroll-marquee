import React from "react";
import "./slidingImage.css"

interface SlidingImageProps {
    readonly image: string,
}

export const SlidingImage: React.FC<SlidingImageProps> = (T) => {
    const {image} = T
    return (<figure className={`w-1/2 lg:w-1/4 px-2 sliding-image`}>
            <img
                src={image}
                className={"sliding-image__image w-full rounded-3xl"}
                alt=""
            />
        </figure>
    )
}