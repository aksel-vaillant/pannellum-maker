/*export default function Stepper(props) {
    const [step, setStep] = React.useState(0)
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    };
  
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    return(
        <>
            <StepperList>
                <StepperItem number="1" name="Pick your scene" validated={step === 1 || step === 2} current={step === 0}></StepperItem>
                <StepperItem number="2" name="Add information" validated={step === 2} current={step === 1}></StepperItem>
                <StepperItem number="3" name="Save and share" current={step === 2} isLast></StepperItem>
            </StepperList>

            {props.children}

            <Row className="items-end">
                 <Button 
                    text="Previous"
                    emote="⏮️"
                    disabled={step === 0}
                    function={() => {
                        onPrevious()
                    }}
                />      
                <Button 
                    text="Next"
                    emote="⏭️"
                    disabled={step === 2}
                    function={() => {
                        onNext()
                    }}
                />      
            </Row>
           
        </>
    );
}*/