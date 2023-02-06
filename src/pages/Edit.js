import React from "react";

import Panorama from "../components/Panorama";

import { StepperControl, StepperItem, StepperList} from "../components/design";

function StepperPanel(props) {

  if (props.value === 1) {
      return (
        <div className="h-96">
            <h1 className="text-center text-3xl text-bold mt-8 flex flex-row gap-x-1 justify-center">Import your 36
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            
            photos
        
            </h1>

            <div className="mt-4 h-1/2 w-1/2 relative left-[41%]">
                <label htmlFor="upload" className="w-56 flex flex-row justify-center gap-x-1 py-2 px-2 text-center rounded-full hover:cursor-pointer bg-gray-800 hover:bg-gray-900 text-white font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                Upload file</label>
                <input id="upload" type="file" className="block opacity-0 absolute" />
            </div>
            
        </div>
    )
  }
  else {
      if (props.value === 2) {
          return (
              <Panorama src="test2.jpeg"/>
          )

      }
      else {
          return (
            <div className="h-96" style={{ color: 'orange' }}>
                <h1>Good job! Now, share it with your friends or directly on your website</h1>
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