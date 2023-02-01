import React from 'react';

import Logo from "./Logo";
import Row from "./Row";
import Button from "./Button";

export default function Navbar(props){
    return(
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
    )
}