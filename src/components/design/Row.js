import React from 'react';

export default function Row(props) {

    let styled = "";

    if(props.gap){
        styled += " " + props.gap;
    }
    if(props.justify){
        styled += " " + props.justify;
    }
    if(props.className){
        styled += " " + props.className;
    }

    return(
        <>
            <div className={`flex flex-row items-center ${styled} `}>
                {props.children}
            </div>
        </>
    );
}