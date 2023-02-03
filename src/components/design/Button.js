import React from 'react';

const classes = { 
    disabled : `hover:cursor-not-allowed opacity-50 `,       
    state : {
        default : `hover:cursor-pointer`,    
        hover : `hover:cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200`,
    },
    round : {
        classic : ``,
        medium : `rounded-sm`,
        full : `rounded-full`,
    },
    size : {
        small : 'w-28',
        normal: 'w-36',
        large: 'w-56'
    },
    variant : {
        classic : `link link-underline link-underline-black text-black font-medium`,
        default : `bg-blue-500 hover:bg-blue-600 text-white font-medium`,
        light : `bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium`,
        dark : `bg-gray-800 hover:bg-gray-900 text-white font-medium`,
        success : `bg-green-500 hover:bg-green-600 text-white font-medium`
    }    
}

export default function Button(props) {

    let round = classes.round.full;
    if(props.round && classes.round[props.round] !== "undefined"){
        round = classes.round[props.round];
    }

    let size = classes.size.normal;
    if(props.size && classes.size[props.size] !== "undefined"){
        size = classes.size[props.size];
    }

    let state = classes.state.default;
    if(props.state && !props.disabled && classes.state[props.state] !== "undefined"){
        state = classes.state[props.state];
    }

    let variant = classes.variant.default;
    if(props.variant && classes.variant[props.variant] !== "undefined"){
        variant = classes.variant[props.variant];
    }

    let disabled = "";
    if(props.disabled){
        disabled = classes.disabled; 
        state = "";
    }

    let styled = disabled + " " + round + " " + size + " " + state + " " + variant + " " + (props.className ? props.className : ""); 
    
    return(
        <>
            <div className={`px-2 py-2 my-2 text-center align-middle ${styled}`} onClick={props.function}>
                    {props.children}
            </div>
        </>
    );
}