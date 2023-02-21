import React from "react";
import { Pannellum } from "pannellum-react";
import data from "data.json";

function HotSpot(props){
    return ( 
        <Pannellum.Hotspot
            // Type custom => gérer un event
            id={props.id}
            type={props.type}                    
            name={props.name ? props.name : null}
            pitch={props.pitch}
            yaw={props.yaw}

            text={props.text ? props.text : null}
            URL={props.URL ? props.URL : null}

            handleClick={(evt, name) => console.log(name)}
        />
    );
}

export default function PanoramaViewer (props) {
    // Référence pour le panorama => pour récupérer les informations selon les évènements etc
    const panImage = React.useRef();

    // Données à partir du fichier config JSON
    let panConfig = JSON.parse(data);  

    // Données hotspots
    let hotspots = panConfig.hotSpots;

    // Pour initialiser les hotspots sur la map
    let listHotSpots = hotspots.map((hotspot) => (     
        <HotSpot 
            id={hotspot.id} key={hotspot.id} 
            type={hotspot.type} 
            name={hotspot.name} 
            pitch={hotspot.pitch} yaw={hotspot.yaw}
            text={hotspot.text} URL={hotspot.URL}
            handleClick={(evt, name) => console.log(name)}
        />
    ));

    return (
        <div id="panorama">

            <Pannellum
                ref={panImage}
                id="firstScene"

                width="100%"
                height="350px"
                
                image={props.src}
                preview={props.src}
                title="Jolie titre"
                previewTitle="Jolie titre"
                author="Aksel & Clément"
                previewAuthor="Aksel & Clément"

                pitch={0}
                yaw={50}
                hfov={120}
                
                //autoLoad
                autoRotate={8}
                showControls

                // Gère l'intégralité des évènements => avec un message dans la console
                onLoad={()=>{console.log("panorama loaded");}}
                onScenechange={(id)=>{console.log("Scene has change on " + id);}}
                onError={(err)=>{console.log("Error" , err);}}
                
            />     
        </div>
    );
};
