import React from "react";
import { Pannellum } from "pannellum-react";

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

export default function Panorama (props) {
    // Données d'affichage => pour les tests

    const [yaw, setYaw] = React.useState(0);
    const [pitch, setPitch] = React.useState(0);

    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);

    // Données hotspots
    let hotspots = [
        {
            id : 0,
            type : "custom",
            name : "image info",
            pitch : 12.41,
            yaw : 117.76
        },{
            id : 1,
            type : "info",
            pitch : 11,
            yaw : -167,
            text : "Info Hotspot Text", 
            URL : "https://github.com/farminf"
        }
    ]

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

    // Référence pour le panorama => pour récupérer les informations selon les évènements etc
    const panImage = React.useRef();

    return (
        <div id="panorama" className="w-10/12 mx-auto">
            <Pannellum
                ref={panImage}
                id="pannellum"

                width="100%"
                image={props.src}
                pitch={0}
                yaw={50}
                hfov={100}
                autoLoad
                autoRotate={6}
                showControls

                // Permet d'afficher les coordonnées dans la console debug
                // hotspotDebug

                // Gère l'intégralité des évènements => avec un message dans la console
                onLoad={()=>{console.log("panorama loaded");}}
                onScenechange={(id)=>{console.log("Scene has change on " + id);}}
                onScenechangefadedone={()=>{console.log("panorama loaded");}}
                onError={(err)=>{console.log("Error" , err);}}
                onErrorcleared={()=>{console.log("Error Cleared");}}

                //onMouseup={(evt)=>{console.log("Mouse Up", evt);}}
                
                // Lors de la pression d'un clic => on récupère l'ensemble des informations XY/Pitch/Yaw 
                onMousedown={(evt)=> {   
                    //console.log("Mouse Down", evt);   

                    setX(evt.clientX);
                    setY(evt.clientY);
                    
                    setPitch(panImage.current.getViewer().mouseEventToCoords(evt)[0]);
                    setYaw(panImage.current.getViewer().mouseEventToCoords(evt)[1]);

                    hotspots.push(
                        {
                            id : hotspots.length+1,
                            type : "custom",
                            name : "image info",
                            pitch : pitch,
                            yaw : yaw
                        }
                    )

                    console.log(hotspots);
                }}
                
                //onTouchstart={(evt)=>{console.log("Touch Start", evt);}}
                //onTouchend={(evt)=>{console.log("Touch End", evt);}}
            >

                {listHotSpots}
            
            </Pannellum>
            
            <div className="mt-6 py-2 text-center rounded-lg border-l-8 border-l-blue-500 border-2 border-stone-300 ">
                <h1 className="text-xl underline mb-2">Données</h1>
                <p>X = {x}; Y = {y}</p>
                <p>Pitch = {pitch} <br/> Yaw = {yaw}</p>
            </div>
        </div>
    );
};


/*
    <Pannellum.Hotspot
        // Liste des "enfants" de la classe Pannellum
        // Permet de créer des bulles au sein du panorama

        // Type info => lien url
        type="info"
        pitch={11}
        yaw={-167}
        text="Info Hotspot Text"
        URL="https://github.com/farminf"
    />

    <Pannellum.Hotspot
        // Type custom => gérer un event
        type="custom"                    
        name="image info"
        pitch={12.41}
        yaw={117.76}
        handleClick={(evt, name) => console.log(name)}
    />
*/