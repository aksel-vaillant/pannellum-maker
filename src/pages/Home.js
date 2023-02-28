import React, { useEffect, useState } from "react";
import { Button} from "../components/design"
import FsLightbox from "fslightbox-react";

import { Link } from 'react-router-dom'
import PanoramaViewer from "../components/layout/PanoramaViewer";
import { getPannellumById } from "../service/firebase_service";

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
            <div className="my-44 flex items-center flex-col gap-y-5">
                <p className="text-3xl my-5 text-bold">Discover an innovative way to mount your 360° photos<br/>Add hotspots, points of interest, images, and more - all for free!</p>

                <Button variant="dark" size="normal">
                    <Link to="/edit">Get started 🚀</Link>
                </Button>
            </div>

            <div className="flex items-center flex-col">
                <img className="animate-bounce" alt="Bouncing arrow pointing under the main page" src="https://img.icons8.com/ios-filled/50/null/double-down.png"/>
            </div>

            {
                loading ? (
                    <>
                        <p>Waiting data</p>
                        <div className="h-[600px] w-[1200px] bg-slate-300 animate-pulse"></div>
                    </>
                )
                : (
                    <>
                        <img src={pannellum.panSource} onClick={() => setToggler(!toggler)} className="hover:cursor-pointer" alt=""/>
                        
                        <FsLightbox
                            toggler={toggler}
                            sources={[
                                <div style={{ width: "1000px", height: "600px" }}>
                                    <PanoramaViewer forwardedRef={ref} src={pannellum.panSource} config={pannellum.panConfig}/>
                                </div>
                            ]}
                        />
                    </>  
                )
            }
        </> 
    )
}