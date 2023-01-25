import React from "react";
import "./index.css";
import "./styles/App.css";
import Panorama from "./components/Panorama";

export default function App() {
  return (
      <div className="App">
        <h1 className="text-5xl font-bold text-blue-600 text-center my-10">Projet 5A</h1>
        <Panorama src="test2.jpeg" />
      </div>
    );
}