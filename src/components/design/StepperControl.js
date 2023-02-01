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
                text="Previous"
                emote="⏮️"
                disabled={step === min}
                noHover
                function={() => {
                    props.onPrevious()
                }}
            />      
            <Button 
                text="Next"
                emote="⏭️"
                disabled={step === max}
                noHover
                function={() => {
                    props.onNext()
                }}
            />      
    </Row>
    )
}