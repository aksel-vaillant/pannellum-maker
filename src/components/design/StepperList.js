import React from 'react';

export default function StepperList(props){
    return(
        <ol className="py-5 flex items-center gap-y-1 w-full text-sm font-medium text-center text-gray-600 dark:text-gray-500 sm:text-base">
            {props.children}
        </ol>
    )
}