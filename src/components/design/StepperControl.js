import React from 'react';

import Row from "./Row";
import Button from "./Button";

export default function StepperControl(props){
    let step = props.value;
    let min = props.min;
    let max = props.max;

    return (
        <Row className="items-end">
            <Button 
                variant="dark"                 
                disabled={step === min}
                animation="shake"
                function={() => { props.onPrevious()}}>
                    <span className={`mr-2 animate-wavingHand`}>⏮️</span>
                    Previous
            </Button>
            <Button 
                variant="dark"                 
                disabled={step === max}
                animation="shake"
                function={() => { props.onNext()}}>
                    Next
                    <span className={`ml-2 animate-wavingHand`}>⏭️</span>
            </Button>
    </Row>
    )
}