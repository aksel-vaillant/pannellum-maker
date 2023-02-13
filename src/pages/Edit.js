import React from 'react';

import InputFileHandler from '../components/InputFileHandler';
import PanoramaHandler from "../components/PanoramaHandler";

import { Row, StepperControl, StepperItem, StepperList} from "../components/design";
import ShareHandler from '../components/ShareHandler';
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid'

function StepperPanel(props) {

  const [imageURL, setImageURL] = React.useState(null);

  const handleCallback = (childData) => {
    setImageURL(childData);
  }

  if (props.value === 1) {
    return (
        <InputFileHandler parentCallback={handleCallback} />
    )}
  else {
      if (props.value === 2) {
          return (
              <PanoramaHandler src={imageURL}/>
          )
      }
      else {
          return (
            <div style={{ color: 'black' }}>
                <h1 className="text-center mb-11 text-3xl font-medium text-gray-800">Good job! Now, share it with your friends or directly on your socials</h1>
                <Row>
                  <img className="border-2 border-black" src={imageURL}/>
                  <ShareHandler></ShareHandler>
                </Row>
            </div>
          )
      }
  }
}

export default function Edit(props){
    const [step, setStep] = React.useState(1);
    const onChange = nextStep => {
      setStep(nextStep < 1 ? 1 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
  
  return(
        <>
            <StepperList>
                <StepperItem number="1" name="Pick your scene" validated={step === 2 || step === 3} current={step === 1}></StepperItem>
                <StepperItem number="2" name="Add information" validated={step === 3} current={step === 2}></StepperItem>
                <StepperItem number="3" name="Save and share" current={step === 3} isLast></StepperItem>
            </StepperList>

            <StepperPanel value={step}></StepperPanel>

            <StepperControl value={step} min={1} max={3} onPrevious={onPrevious} onNext={onNext} />
        </>
    )
}