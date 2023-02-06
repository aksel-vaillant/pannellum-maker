import React from 'react';

import Logo from "./Logo";
import Row from "./Row";
import Button from "./Button";

import Home from '../../pages/Home'
import PanGallery from '../../pages/Gallery'
import Favorites from '../../pages/Favorites'
import Help from '../../pages/Help'
import Edit from '../../pages/Edit'

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

export default function Navbar(props){
    return(
        <Router>
            <Row>
                <Logo></Logo>
        
                <Button variant="classic" size="small" animation="underline">
                    <Link to="/">Home</Link>
                </Button>

                <Button variant="classic" size="small" animation="underline">
                    <Link to="/gallery">Gallery</Link>
                </Button>

                <Button variant="classic" animation="underline">
                    <Link to="/favorites">My favorites</Link>
                </Button>

                <Button variant="classic" size="small" animation="underline">
                    <Link to="/help">Help</Link>
                </Button>

                <Button round="medium" size="normal">
                    <Link to="/edit">Get started</Link>
                </Button>  
            </Row>
            
            <Routes>
                <Route exact path='/' element={<Home/>}></Route>
                <Route exact path='/gallery' element={< PanGallery />}></Route>
                <Route exact path='/favorites' element={< Favorites />}></Route>
                <Route exact path='/help' element={< Help />}></Route>
                <Route exact path='/edit' element={< Edit />}></Route>
            </Routes>
        </Router>       
    )
}