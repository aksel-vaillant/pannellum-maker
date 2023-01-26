import React from "react";
import "./index.css";
import "./styles/App.css";
import Panorama from "./components/Panorama";

export default function App() {
  return (
      <div className="App">
        <h1 className="animate-text bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent text-5xl font-black text-center my-10">
          Pannellum Maker
        </h1>
        <Panorama src="test2.jpeg"/>
      </div>
    );
}

