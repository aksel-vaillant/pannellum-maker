import React from "react";
import { Callout } from "../components/design";
import Slide from "../components/design/Slide"

export default function Home(props){
    return(
        <div className="fixe bg-[url('/public/backGround.jpg')]">
            <h1 className="text-5xl">Welcome !</h1><br></br>
            <p className="text-2xl">Discover an innovative way to mount your 360°<br></br> photos in order to highlight them and show <br></br>them to your loved ones!</p><br></br><br></br>
            <h2 className="text-2xl">Community projects :</h2>
            <Slide/>
        </div>
    )
}