import React, { useState } from "react";
import {Button} from "../components/design"
import FsLightbox from "fslightbox-react";

import { Link } from 'react-router-dom'
import PanoramaViewer from "../components/layout/PanoramaViewer";

export default function Home(props){

    const [toggler, setToggler] = useState(false);
    const ref = React.createRef();

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

			<img src="../test2.jpeg" onClick={() => setToggler(!toggler)} className="hover:cursor-pointer" alt=""/>

			<FsLightbox
				toggler={toggler}
				sources={[
                    <div style={{ width: "1000px", height: "600px" }}>
                        <PanoramaViewer forwardedRef={ref} src="../test2.jpeg"/>
                    </div>
				]}
			/>
        </> 
    )
}