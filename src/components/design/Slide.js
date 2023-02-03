import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Callout from "./Callout";

function Slide() {
    return (
        <Carousel>
            <div className="w-40 h-40">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8hdyPIxx3xIwFU7rVEbe97yBI6xmQHw0ufcstYs9IIdpG4ZcjHrQU88LYuGFZb0brpB4&usqp=CAU' className="mr-7"/>
            </div>
            <div className="w-40 h-40">
                <img src='https://besthqwallpapers.com/Uploads/1-3-2021/158305/thumb2-abstract-mountains-landscape-4k-3d-art-summer-abstract-nature-backgrounds.jpg' className="mr-7"/>
            </div>
        </Carousel>
    )
}

export default Slide