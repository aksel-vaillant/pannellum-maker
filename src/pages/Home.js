import React, { useEffect, useState } from "react";
import { Button} from "../components/design"
import FsLightbox from "fslightbox-react";
import { Row } from "../components/design";

import { Link } from 'react-router-dom'
import PanoramaViewer from "../components/layout/PanoramaViewer";

import { getPannellumById } from "../service/firebase_service";

import Carousel from "../components/design/Carousel";


export default function Home(){

    const [loading, setLoading] = useState(true);
    const [pannellum, setPannellum] = useState();

    const [toggler, setToggler] = useState(false);
    const ref = React.createRef();

    const fetchData = async () => {
        setLoading(true);
    
        let res = await getPannellumById("FNj50Isb7ZRW55FxVdDz");
        setPannellum(res);     

        setLoading(false);
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    return(
        <>
            <div className=" my-4 flex items-center flex-col gap-y-5">
                <Row>
                <div className=" mr-auto">
                    <h1 className="text-6xl">Welcome !</h1>
                    <p className="text-justify text-2xl my-5">Discover an innovative way to mount your 360° <br/>photos in order to highlight them and show <br/>them to your loved ones!<br/>Add hotspots, points of interest, images, and more...</p>
                </div>
                <img className="ml-36" src="../test3.png" alt=""></img>
                </Row>
                
                
                <h2 className="font-bold font-body mr-auto text-2xl mb-4">Community projects</h2>
            </div>

            <div className="flex items-center flex-col">
                <img className="animate-bounce" alt="Bouncing arrow pointing under the main page" src="https://img.icons8.com/ios-filled/50/null/double-down.png"/>
            </div>
            <div className="">
                <Carousel/>
            </div>
            <div className="flex items-center  flex-col">
                <Button variant="dark" size="normal">
                    <Link to="/edit">Get started 🚀</Link>
                </Button>
            </div>           
            
        </> 
    )
}