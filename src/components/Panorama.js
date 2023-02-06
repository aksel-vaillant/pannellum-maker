import React from "react";
import { Pannellum } from "pannellum-react";

import {Callout, Row, Button} from "./design";

// Référence pour les hotspots => plus simple à manipuler dans la globalité
let hotspots = [];

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

function getHotspot(panImage){
    // Can save the scene with this function~
    let v = panImage.current.getViewer().getConfig(); 
    
    // Make an array with hotspot
    var hotspotArray = [];
    for (var i in v.hotSpots) {
        hotspotArray.push({            
            type : v.hotSpots[i].type,
            id : v.hotSpots[i].id,
            pitch : v.hotSpots[i].pitch,
            yaw : v.hotSpots[i].yaw,
            createTooltipFunc: v.hotSpots[i].hotspotTooltip,
            createTooltipArgs: v.hotSpots[i].createTooltipArgs,
            clickHandlerFunc: v.hotSpots[i].handlerFunc,
            clickHandlerArgs: v.hotSpots[i].clickHandlerArgs
        });
    }

    return hotspotArray;
}

function addHotspot(panImage, pitch, yaw){
    // Parameters of the hotspot
    
    //let imgSrc = "https://img.icons8.com/material/" + myColor.replace("#","") + "/256/camera.png";
    let imgSrc = "https://img.icons8.com/material/3b82f6/256/camera.png";

    let paramatersHotSpot = {
        //"color" : "bg-blue-500", 
        imgSrc : imgSrc
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
        name :  Math.floor(Math.random() * 100),
        description : Math.random()
    }

    // Make an array with hotspot

    let arrayHS = getHotspot(panImage);
    let lastID = 0;
    if(arrayHS.length > 0){
        lastID = arrayHS[arrayHS.length-1].id;
    }
    var newID = lastID + 1;

    // Create the handler function
    let handlerFunc = () => {
        panImage.current.getViewer().lookAt(pitch, yaw); //  To add hfov and animation's duration = 120, 1000);

        document.getElementById("titre").innerHTML = "HotSpot n*" + newID;
        document.getElementById("description").innerHTML = dataHotSpot.name + ' -- ' + dataHotSpot.description;

        /*const hDiv = document.createElement('h1');
        hDiv.classList.add("text-red-600");
        hDiv.classList.add("text-3xl");
        hDiv.innerHTML = dataHotSpot.name;

        test.appendChild(hDiv);*/
    }
    
    // Add a hotspot
    panImage.current.getViewer().addHotSpot({
        id : newID,
        type : "custom",
        pitch : pitch,
        yaw : yaw,
        createTooltipFunc: hotspotTooltip,
        createTooltipArgs: paramatersHotSpot,
        clickHandlerFunc: handlerFunc,
        clickHandlerArgs: dataHotSpot
    });
}

function delHotspot(panImage, id){
    let bool = panImage.current.getViewer().removeHotSpot(id);
    if(!bool){
        alert("Hotspot " + id + " pas supprimé");
    }
    return;
}

function listHotspot(panImage){ 
    // Make an array with hotspot
    var hotspotArray = getHotspot(panImage);
    
    let data = hotspotArray.map((hotspot) => (
        <tr key={hotspot.id}>
            <td>{hotspot.id}</td>
            <td>{hotspot.clickHandlerArgs.description}</td>
            <td>
                <Button 
                    variant="warning" size="min"
                    function={() => {
                        delHotspot(panImage, hotspot.id);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                </Button>
            </td>
        </tr>
    ));
    
    let table = (() => (
        <table className="table-auto border-spacing-6 border-separate">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Tools</th>
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </table>
    ));

    return table;
}

function convertToJSON(panImage){
    // Can save the scene with this function~
    let v = panImage.current.getViewer().getConfig();    

    // Make an array with hotspot
    var hotspotArray = getHotspot(panImage);

    // Create json data
    var jsonConfig = {
        type: "equirectangular",
        panorama: v.panorama,
        haov: v.haov,
        vaov: v.vaov,
        vOffset: v.vOffset,
        yaw: v.yaw,
        pitch: v.pitch,
        hfov: v.hfov,
        minHfov: v.minHfov,
        maxHfov: v.maxHfov,
        minPitch: v.minPitch,
        maxPitch: v.maxPitch,
        minYaw: v.minYaw,
        maxYaw: v.maxYaw,
        autoRotate: v.autoRotate,
        compass: v.compass,
        preview: v.preview,
        previewTitle: v.previewTitle,
        previewAuthor: v.previewAuthor,
        author: v.author,
        title: v.title,
        autoLoad: v.autoLoad,
        orientationOnByDefault: v.orientationOnByDefault,
        showZoomCtrl: v.showZoomCtrl,
        keyboardZoom: v.keyboardZoom,
        mouseZoom: v.mouseZoom,
        draggable: v.draggable,
        disableKeyboardCtrl: v.disableKeyboardCtrl,
        showFullscreenCtrl: v.showFullscreenCtrl,
        showControls: v.showControls,
        hotSpotDebug: v.hotspotDebug,
        hotSpots: hotspotArray,
        onRender: v.onRender
    };

    // Permet de faire un fichier json

    /*const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(jsonConfig)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();*/

    return jsonConfig;
}

export default function Panorama (props) {

    // Données d'affichage => pour les tests
    let [yaw, setYaw] = React.useState(0);
    let [pitch, setPitch] = React.useState(0);

    let [json, setJSON] = React.useState(0);
    let [edit, setList] = React.useState(0);

    // Données hotspots
    
    /*let hotspots = [
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
            //URL : "https://github.com/farminf"
        }
    ]

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
    */

    // Référence pour le panorama => pour récupérer les informations selon les évènements etc
    const panImage = React.useRef();

    return (
        <div id="panorama">
            <Pannellum
                ref={panImage}
                id="firstScene"

                width="100%"
                image={props.src}
                preview={props.src}
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
                
                // Lors de la pression d'un clic => on récupère l'ensemble des informations XY/PitchYaw 
                onMousedown={(evt)=> {   
                    //console.log("Mouse Down", evt);  
                    setPitch(panImage.current.getViewer().mouseEventToCoords(evt)[0]);
                    setYaw(panImage.current.getViewer().mouseEventToCoords(evt)[1]);
                }}
            >
            </Pannellum>
            

            {
                // These data appears only when you click on a hotspot
            }
            <div>
                <h1 className="text-red-500 text-4xl my-6 font-bold" id="titre"></h1>
                <p className="text-left text-black text-xl" id="description"></p>
            </div>
            

            <Callout center>

                {
                    //<h1 className="text-xl underline mb-2">Données</h1>
                    //<p>Pitch = {pitch} <br/> Yaw = {yaw}</p>
                }

                <Row>
                    <Button 
                        size="large"
                        function={() => {
                            addHotspot(panImage, pitch, yaw);
                        }}>
                            Ajouter un hotspot ✨
                    </Button>

                    <Button
                        size="large" 
                        function={() => {
                            setList(listHotspot(panImage));
                        }}>
                            Voir la liste 🎯
                    </Button>

                    <Button 
                        variant="light"
                        size="large"
                        function={() => {
                            setJSON(convertToJSON(panImage));
                        }}>
                            Exporter en JSON 🚀
                    </Button>
                </Row>                
            </Callout>

            {
                json !== 0 && (
                
                <Callout className="my-5">
                    <pre>
                        {JSON.stringify(json, null, 2)}
                    </pre>
                </Callout>)
            }

            {
                edit !== 0 && (
                
                <Callout className="my-5">
                    {edit}
                </Callout>)
            }
        </div>
    );
};
