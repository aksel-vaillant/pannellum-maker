import React from 'react';

export default function Callout(props) {
    return(
        <>
            <div className={`py-2 ${props.center ? "text-center" : ""} rounded-lg border-l-8 border-l-blue-500 border-2 border-stone-300 flex items-center flex-col gap-y-2`}>
                {props.children}
            </div>
        </>
    );
}