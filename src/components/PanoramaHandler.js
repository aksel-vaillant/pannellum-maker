import React from "react";

import { Pannellum } from "pannellum-react";
import {Callout, Row, Button} from "./design";

import * as Slider from '@radix-ui/react-slider';
import "../styles/@radix-ui_slider.css";

export default function PanoramaHandler (props) {
    // Référence pour les hotspots => plus simple à manipuler dans la globalité
    let [idHS, setIDHS] = React.useState(0);

    // Données d'affichage => pour les tests
    let [yaw, setYaw] = React.useState(0);
    let [pitch, setPitch] = React.useState(0);

    // Données initales
    let [defaultHFOV, setHFOV] = React.useState(120);
    let [defaultTitle, setTitle] = React.useState("New Scene");
    let [isEditingTitle, setIsEditingTitle] = React.useState(false);

    // Affichage des panneaux
    let [json, setJSON] = React.useState(0);
    let [edit, setList] = React.useState(0);
    
    // Référence pour le panorama => pour récupérer les informations selon les évènements etc
    const panImage = React.useRef();

    function getHotspot(){
        if(panImage.current.getViewer() === "undefined"){
            return;
        }

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

                createTooltipFunc: v.hotSpots[i].createTooltipFunc,
                createTooltipArgs: v.hotSpots[i].createTooltipArgs,
                clickHandlerFunc: v.hotSpots[i].clickHandlerFunc,
                clickHandlerArgs: v.hotSpots[i].clickHandlerArgs
            });
        }

        return hotspotArray;
    }

    function addHotspot(){
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
        var newID = idHS + 1;
        setIDHS(newID);

        // Create the handler function
        let handlerFunc = () => {
            panImage.current.getViewer().lookAt(pitch, yaw); //  To add hfov and animation's duration = 120, 1000);

            document.getElementById("titre").innerHTML = "HotSpot n*" + newID;
            document.getElementById("description").innerHTML = dataHotSpot.name + ' -- ' + dataHotSpot.description;
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

    function delHotspot(id){
        let bool = panImage.current.getViewer().removeHotSpot(id);
        if(!bool){
            console.log ("Hotspot " + id + " pas supprimé");
        }
        return;
    }

    function listHotspot(){ 
        // Make an array with hotspot
        var hotspotArray = getHotspot();
        
        let data = hotspotArray.map((hotspot) => (
            <tr key={hotspot.id}>
                <td>{hotspot.id}</td>
                <td>{hotspot.handleClickArg.name}</td>
                <td>{hotspot.handleClickArg.description}</td>
                <td>
                    <Button 
                        variant="warning" size="min"
                        function={() => {
                            delHotspot(hotspot.id);
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
                        <th>Name</th>
                        <th>Description</th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        ));

        return(table);
    }

    function convertToJSON(){
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
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(jsonConfig)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";

        link.click();
        return jsonConfig;
    }

    function toggleScreen(){
        panImage.current.getViewer().toggleFullscreen();
    }

    return (
        <div id="panorama">

            <Row justify="justify-between" gap="gap-2" className="my-5">
                <div className="hover:outline-pink-500 outline-transparent outline outline-[3] border-b border-spacing-1 border-black border px-5 py-2 rounded-full">
                    <Row justify="justify-start" gap="gap-2">
                        <p>HFOV</p>     

                        <Slider.Root className="SliderRoot" defaultValue={[defaultHFOV]} min={50} max={150} step={1} onValueChange={(newValue) => setHFOV(newValue[0])} aria-label="Volume">
                            <Slider.Track className="SliderTrack">
                                <Slider.Range className="SliderRange" />
                            </Slider.Track>
                            <Slider.Thumb className="SliderThumb" />
                        </Slider.Root>                        
                        <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>     
                    </Row>
                </div>
                
                <div className="hover:outline-pink-500 outline-transparent outline outline-[3] border-b border-spacing-1 border-black border px-5 py-2 rounded-full">
                    <Row justify="justify-start" gap="gap-2">
                        {
                            isEditingTitle ?
                                (<input type="text" id="name-with-label" name="title" value={defaultTitle} onChange={(e) => setTitle(e.target.value)} className="rounded-full border-transparent appearance-none border border-gray-300 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:border-transparent"/>)
                            :
                                (<p onClick={() => setIsEditingTitle(!isEditingTitle)} className="text-black font-bold hover:cursor-pointer">{defaultTitle}</p>)
                        }
                        <svg onClick={() => setIsEditingTitle(!isEditingTitle)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </Row>
                </div>
                

                <div className="hover:cursor-pointer hover:outline-pink-500 outline-transparent outline outline-[3] border-b border-spacing-1 border-black border px-5 py-2 rounded-full">
                   <Row justify="justify-start" gap="gap-2">                    
                        <p>Copier l'adresse</p>     
                        <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </Row> 
                </div>
            </Row>

            <Pannellum
                ref={panImage}
                id="firstScene"

                width="100%"
                height="350px"
                
                image={props.src}
                preview={props.src}
                title={defaultTitle}
                previewTitle={defaultTitle}
                author="Aksel & Clément"
                previewAuthor="Aksel & Clément"

                pitch={0}
                yaw={50}
                hfov={defaultHFOV}
                
                //autoLoad
                autoRotate={8}
                showControls

                // Gère l'intégralité des évènements => avec un message dans la console
                onLoad={()=>{console.log("panorama loaded");}}
                onScenechange={(id)=>{console.log("Scene has change on " + id);}}
                onError={(err)=>{console.log("Error" , err);}}
                
                // Lors de la pression d'un clic => on récupère l'ensemble des informations XY/PitchYaw 
                onMousedown={(evt)=> {   
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
                <Row justify="justify-between" gap="gap-7">
                    <Button 
                        size="large"
                        function={() => {
                            addHotspot();
                            setList(listHotspot(panImage));
                        }}>
                            Ajouter un hotspot ✨
                    </Button>

                    <Button
                        size="large" 
                        function={() => {
                            toggleScreen();
                        }}>
                            Voir la liste 🎯
                    </Button>

                    <Button 
                        variant="light"
                        size="large"
                        function={() => {
                            setJSON(convertToJSON());
                        }}>
                            Exporter en JSON 🚀
                    </Button>
                </Row>                
            </Callout>
            
            {
                edit !== 0 && (
                
                <Callout className="my-5">
                    {edit}
                </Callout>)
            }

            {
                json !== 0 && (
                
                <Callout className="my-5">
                    <pre>
                        {JSON.stringify(json, null, 2)}
                    </pre>
                </Callout>)
            }            
        </div>
    );
};
