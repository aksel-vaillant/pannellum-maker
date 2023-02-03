import React from 'react';

export default function Row(props) {
    return(
        <>
            <div className={`flex flex-row justify-between gap-7 items-center${props.className ? props.className : ""} `}>
                {props.children}
            </div>
        </>
    );
}