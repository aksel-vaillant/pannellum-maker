import React, {useEffect, useRef} from "react";
import { Pannellum } from "pannellum-react";
import data from "./data.json";

function useFallbackRef(forwardedRef) {
    const fallbackRef = useRef(null)
    return forwardedRef || fallbackRef
}

const PanoramaViewer = React.forwardRef((props, forwardedRef) => {
    // Référence pour le panorama => pour récupérer les informations selon les évènements etc
    const panRef = useFallbackRef(forwardedRef)

    // Données à partir du fichier config JSON
    let panConfig = data;

    // Données hotspots
    let hotspots = panConfig.hotSpots;

    useEffect(() => {
        hotspots.map((hotspot, index) => {
            // Create tooltip function
            let tooltipFunc = (hotSpotDiv) => {
                // Remove the black cross in the upper left corner
                hotSpotDiv.classList.remove('pnlm-hotspot');
                hotSpotDiv.classList.remove('pnlm-sprite');
                hotSpotDiv.classList.remove('pnlm-custom');
    
                // Add custom style
                hotSpotDiv.classList.add('toolpicss');
                hotSpotDiv.classList.add('pnlm-pointer');
                hotSpotDiv.setAttribute("id", "textInfo");
                
                // Create divs with the icon
                const hDiv = document.createElement('div');
                hDiv.classList.add('hotspot');
                const outDiv = document.createElement('div');
                outDiv.classList.add('out');
                outDiv.classList.add(hotspot.createTooltipArgs.color);
                const inDiv = document.createElement('div');
                inDiv.classList.add('in');
                
                // Parameters of the picture
                const imageDiv = document.createElement('img');
                imageDiv.classList.add('image');
                imageDiv.setAttribute('width', '30');
                imageDiv.setAttribute('height', '30');
                imageDiv.setAttribute("src", hotspot.createTooltipArgs.imgSrc);
                imageDiv.classList.add('mx-auto');
                imageDiv.classList.add('mt-1');
    
                // Append childs in Div's hotspot
                hotSpotDiv.appendChild(hDiv);
                hDiv.appendChild(inDiv);
                hDiv.appendChild(outDiv);
                inDiv.appendChild(imageDiv);
            } 
    
            // Create handler function
            let handlerFunc = () => {
                panRef.current.getViewer().lookAt(hotspot.pitch, hotspot.yaw); //  To add hfov and animation's duration = 120, 1000);
            }
            
            // Add a hotspot
            panRef.current.getViewer().addHotSpot({
                id : index,
                type : hotspot.type,
                pitch : hotspot.pitch,
                yaw : hotspot.yaw,
                createTooltipFunc: tooltipFunc,
                createTooltipArgs: hotspot.createTooltipArgs,
                clickHandlerFunc: handlerFunc,
                clickHandlerArgs: hotspot.clickHandlerArgs
            });
        });
    }, [panRef])

    return (
        <div id="panorama">

            <Pannellum
                ref={panRef}
                id="firstScene"

                width="100%"
                height="600px"
                
                image={props.src}
                title={panConfig.title ? panConfig.title : ""}
                author={panConfig.author ? panConfig.author : ""}

                pitch={panConfig.pitch ? panConfig.pitch : 0}
                yaw={panConfig.yaw ? panConfig.yaw : 50}
                hfov={panConfig.hfov ? panConfig.hfov : 120}
                
                autoLoad
                //autoRotate={8}
                showControls

                // Gère l'intégralité des évènements => avec un message dans la console
                onLoad={()=>{console.log("panorama loaded");}}
                onScenechange={(id)=>{console.log("Scene has change on " + id);}}
                onError={(err)=>{console.log("Error" , err);}}
                
            />     
        </div>
    )
})

export default PanoramaViewer