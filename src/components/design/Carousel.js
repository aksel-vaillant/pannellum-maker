import React, {useState} from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid';

const sliderData =[
    {
        image: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599'
    },
    {
        image: 'https://source.unsplash.com/Dm-qxdynoEc/800x799'
    },
    {
        image: 'https://source.unsplash.com/qDkso9nvCg0/600x799'
    },
    {
        image: 'https://source.unsplash.com/iecJiKe_RNg/600x799'
    }
];

const Carousel = (slides) =>{
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === sliderData.length -1 ? sliderData.length -1 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? 0 : current -1);
    };

    return(
        <>
            <div className=" mb-10 flex-wrap justify-center items-center">
                <ArrowLeftCircleIcon className="text-white absolute bottom-4 w-10 left-52 cursor-pointer select-none" onClick={prevSlide}/> 
                <ArrowRightCircleIcon className="text-white absolute bottom-4 w-10 right-52 cursor-pointer select-none" onClick={nextSlide}/>
            {sliderData.map((slide, index) =>{
                    return (
                        <div className="flex w-full h-2/6 justify-center items-center items-center" key ={index}>
                            {index === current &&(
                                <img style={{ width: "1000px", height: "500px" }} className="rounded-xl" src={slide.image} alt=""/>
                            )}                          
                            
                        </div>
                    )
            })}
            </div>
        </>
    )
}

export default Carousel