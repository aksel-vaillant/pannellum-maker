import React from 'react';

import Row from "./Row";
import Button from "./Button";

export default function StepperControl(props){
    let step = props.value;
    let min = props.min;
    let max = props.max;

    return (
        <Row justify="justify-between" gap="gap-7">
            <Button 
                variant="dark"                 
                disabled={step === min}
                animation="shake"
                function={() => { props.onPrevious()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                    Previous
            </Button>
            <Button 
                variant="dark"                 
                disabled={step === max}
                animation="shake"
                function={() => { props.onNext()}}>
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
            </Button>
    </Row>
    )
}