import React from 'react';

export default function Callout(props) {
    return(
        <>
            <div className={`py-2 ${props.center ? "text-center" : ""} rounded-lg border-l-8 border-l-blue-500 border-2 border-gray-800 flex items-center flex-col gap-y-2 ${props.className ? props.className : ""}`}>
                {props.children}
            </div>
        </>
    );
}