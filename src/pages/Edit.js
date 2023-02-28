import React, { useEffect } from 'react';

import { StepperControl, StepperItem, StepperList} from "../components/design";

import InputFileHandler from '../components/InputFileHandler';
import PanoramaHandler from "../components/PanoramaHandler";
import ShareHandler from '../components/ShareHandler';

import { setPannellum, setFiles } from '../service/firebase_service';

function StepperPanel(props) {

  const [mediaFile, setMediaFile] = React.useState(null);
  const [configFile, setConfigFile] = React.useState(null);

  const handleFileMedia = (media) => {
    setMediaFile(media);
    console.log(media);
  }

  const handleFileConfig = (config) => {
    setConfigFile(config);
    console.log(config);
  }

  useEffect(() => {
    if(props.value === 3)
      setPannellum(configFile, mediaFile);
  });

  if (props.value === 1) {
    return (
        <InputFileHandler parentCallback={handleFileMedia} />
    )}
  else {
      if (props.value === 2) {
          return (
              <PanoramaHandler parentCallback={handleFileConfig} src={URL.createObjectURL(mediaFile)}/>
          )
      }
      else {  
        if (props.value === 3) {

          return (
            <ShareHandler src={URL.createObjectURL(mediaFile)}></ShareHandler>
          )
        }
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