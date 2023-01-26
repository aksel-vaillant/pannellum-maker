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

function addHotspot(panImage, pitch, yaw){
    // Parameters of the hotspot
    //let imgSrc = "https://img.icons8.com/material/" + myColor.replace("#","") + "/256/camera.png";
    let imgSrc = "https://img.icons8.com/material/3b82f6/256/camera.png";

    let paramatersHotSpot = {
        //"color" : "bg-blue-500", 
        "imgSrc" : imgSrc
    }

    // Create the tooltip style
    let hotspotTooltip = (hotSpotDiv) => {
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
        outDiv.classList.add(paramatersHotSpot.color);
        const inDiv = document.createElement('div');
        inDiv.classList.add('in');
        
        // Parameters of the picture
        const imageDiv = document.createElement('img');
        imageDiv.classList.add('image');
        imageDiv.setAttribute('width', '30');
        imageDiv.setAttribute('height', '30');
        imageDiv.setAttribute("src", paramatersHotSpot.imgSrc);
        imageDiv.classList.add('mx-auto');
        imageDiv.classList.add('mt-1');

        // Append childs in Div's hotspot
        hotSpotDiv.appendChild(hDiv);
        hDiv.appendChild(inDiv);
        hDiv.appendChild(outDiv);
        inDiv.appendChild(imageDiv);
    }

    // Details of the hotspot
    let dataHotSpot = {
        "name" :  Math.floor(Math.random() * 100)
    }

    // Create the handler function
    let handlerFunc = () => {
        console.log(dataHotSpot.name);
        panImage.current.getViewer().lookAt(pitch, yaw); //  To add hfov and animation's duration = 120, 1000);
    }

    // Add a hotspot
    panImage.current.getViewer().addHotSpot({
        "type": "custom",
        "pitch": pitch,
        "yaw": yaw,
        "createTooltipFunc": hotspotTooltip,
        "clickHandlerFunc": handlerFunc, 
    });

    // Can save the scene with this function~
    return(panImage.current.getViewer().getContainer());
}

export default function Panorama (props) {

    // Données d'affichage => pour les tests
    let [yaw, setYaw] = React.useState(0);
    let [pitch, setPitch] = React.useState(0);

    let newParonama = React.useRef();  

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
                id="firstScene"

                width="100%"
                image={props.src}
                pitch={0}
                yaw={50}
                hfov={120}
                autoLoad
                autoRotate={8}
                showControls
                compass

                // Permet d'afficher les coordonnées dans la console debug
                // hotspotDebug

                // Gère l'intégralité des évènements => avec un message dans la console
                onLoad={()=>{console.log("panorama loaded");}}
                onScenechange={(id)=>{console.log("Scene has change on " + id);}}
                onScenechangefadedone={()=>{console.log("panorama loaded");}}
                onError={(err)=>{console.log("Error" , err);}}
                onErrorcleared={()=>{console.log("Error Cleared");}}

                //onMouseup={(evt)=>{console.log("Mouse Up", evt);}}
                
                // Lors de la pression d'un clic => on récupère l'ensemble des informations XY/PitchYaw 
                onMousedown={(evt)=> {   
                    //console.log("Mouse Down", evt);  
                    setPitch(panImage.current.getViewer().mouseEventToCoords(evt)[0]);
                    setYaw(panImage.current.getViewer().mouseEventToCoords(evt)[1]);
                }}
                
                //onTouchstart={(evt)=>{console.log("Touch Start", evt);}}
                //onTouchend={(evt)=>{console.log("Touch End", evt);}}
            >

                {listHotSpots}
            
            </Pannellum>
            
            <div className="mt-6 py-2 text-center rounded-lg border-l-8 border-l-blue-500 border-2 border-stone-300 flex items-center flex-col gap-y-2">
                <h1 className="text-xl underline mb-2">Données</h1>

                <p>Pitch = {pitch} <br/> Yaw = {yaw}</p>

                <div className="flex justify-center py-2 w-44 rounded-md hover:cursor-pointer transition ease-in-out delay-150 bg-blue-400 hover:-translate-y-1 hover:scale-110 hover:bg-sky-400 duration-200"
                    onClick={() => {
                        newParonama = addHotspot(panImage, pitch, yaw);
                    }}
                >
                    Ajouter un hotspot                    
                    <span className="animate-waving-hand">✨</span>
                </div>
            </div>

            <div id="test">
                {console.log(newParonama)}
            </div>
        </div>
    );
};