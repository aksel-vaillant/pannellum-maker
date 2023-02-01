import React from 'react';

export default function Button(props) {

    let buttonColor = props.color ? props.color : `bg-blue-400`;
    let buttonHoverColor = props.colorHover ? props.colorHover : `hover:bg-sky-400`;

    let styled = ""
    
    if(props.noBackground){
        styled += `hover:cursor-pointer `
    }else{
        if(props.disabled){
            styled += `bg-gray-300 hover:cursor-not-allowed `;
        }else{            
            styled += buttonHoverColor + ` ` + buttonColor + ` `;
            styled += `hover:cursor-pointer `
            if(props.noHover){
                styled += ` `
            }else{
                styled += `transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200 `;
            }
        }
    }

    if(props.size){
        styled += props.size + ` `;
    }
    
    return(
        <>
            <div    
                className={`py-2 w-56 rounded-md text-center align-middle ${styled} ${" " + props.className ? props.className : ""}`}
                onClick={props.function}
            >
                    {props.text}
                    {props.emote ? <span className={`ml-1 ${props.animation ? "animate-waving-hand" : ""}`}>{props.emote}</span> : ""}
            </div>
        </>
    );
}