import React from "react";
import ReactDOM from 'react-dom';

import "./index.css";
import Panorama from "./components/Panorama";
import { StepperControl, StepperItem, StepperList, Button, Row, Logo} from "./components/design";

import reportWebVitals from './reportWebVitals';

function StepperPanel(props) {
  if (props.value === 0) {
      return (<div className="h-96" style={{ color: 'red' }}>
          <h1>Pick your scene stuff</h1>
      </div>)
  }
  else {
      if (props.value === 1) {
          return (<Panorama src="test2.jpeg"/>)

      }
      else {
          return (<div className="h-96" style={{ color: 'orange' }}>
              <h1>Good job! Now, share it with your friends or directly on your website</h1>
          </div>)
      }
  }
}

export default function App() {
  const [step, setStep] = React.useState(0)
  const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  return (
      <>
        <div className="w-10/12 mx-auto">
          <Row>
              <Logo/>
            
              <Button className="basis-1/12 link link-underline link-underline-black"
                text="Home"
                noHover
                noBackground
                function={() => {
                  alert("WIP - In Progress");
                }}
              />

            <Button className="basis-1/12 link link-underline link-underline-black"
              text="Gallery"
              noHover noBackground
              function={() => {
                alert("WIP - In Progress");
              }}
            />           
            
            <Button className="basis-1/12 link link-underline link-underline-black"
              text="My favorites"
              noHover noBackground
              function={() => {
                alert("WIP - In Progress");
              }}
            />

            <Button className="basis-1/12 link link-underline link-underline-black"
              text="Help"
              noHover noBackground
              function={() => {
                alert("WIP - In Progress");
              }}
            />                  

            <Button className="basis-1/12"
                text="Sign up"
                noHover
                function={() => {
                  alert("WIP - In Progress");
                }}
              />      
          </Row>

          <StepperList>
              <StepperItem number="1" name="Pick your scene" validated={step === 1 || step === 2} current={step === 0}></StepperItem>
              <StepperItem number="2" name="Add information" validated={step === 2} current={step === 1}></StepperItem>
              <StepperItem number="3" name="Save and share" current={step === 2} isLast></StepperItem>
          </StepperList>

          <StepperPanel value={step}></StepperPanel>

          <StepperControl value={step} min={0} max={2} onPrevious={onPrevious} onNext={onNext} />
        </div>        
      </>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();