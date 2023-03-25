import React from "react";
import ReactDOM from 'react-dom';

import "./index.css";
import reportWebVitals from './reportWebVitals';

import { Navbar } from "./components/design";

export default function App() {
  
  //className="bg-cover bg-[url('../public/hhh.png')] bg-cover w-full h-max"
  return (
      <>
        <div className="bg-cover bg-lime-50">   
          <div className="w-10/12 mx-auto">
            <Navbar/>
          </div>       
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