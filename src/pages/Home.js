import React from "react";
import {Button} from "../components/design"

import { Link } from 'react-router-dom'

export default function Home(props){
    return(
        <>
            <div className="my-44 flex items-center flex-col gap-y-5">
                <p className="text-3xl my-5 text-bold">Create stunning 360° views with ease using our full automated tool<br/>Add hotspots, points of interest, images, and more - all for free!</p>

                <Button variant="dark" size="normal">
                    <Link to="/edit">Get started 🚀</Link>
                </Button>
            </div>

            <div className="flex items-center flex-col">
                <img className="animate-bounce" alt="Bouncing arrow pointing under the main page" src="https://img.icons8.com/ios-filled/50/null/double-down.png"/>
            </div>
        </> 
    )
}

/*
                <p className="text-3xl my-5 text-center text-bold">Discover an innovative way to mount your 360° photos<br/> in order to highlight them and show them to your loved ones!</p>

                <h2 className="text-2xl my-12">Community projects :</h2>

*/