import React, { useEffect } from 'react';

import Home from '../../pages/Home'
import PanGallery from '../../pages/Gallery'
import Help from '../../pages/Help'
import Edit from '../../pages/Edit'

import {Logo, Row, Button, NavbarProfile} from "./index"
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { getCurrentUser, signInUserByGoogle, signOutUser } from '../../service/firebase_service'

export default function Navbar(props){

    let [isConnected, setIsConnected] = React.useState(false);
    let [user, setUser] = React.useState(getCurrentUser());

    const fetchSignIn = async () => {
        let u = await signInUserByGoogle();
        setUser(u);
        setIsConnected(true);
    }

    const fetchDisconnect = async () => {        
        setIsConnected(false);
        await signOutUser();
        setUser("");        
    }

    useEffect(() => {
        if(user){
            setIsConnected(true);
        }
    }, [user])

    return(
        <Router>
            <Row justify="justify-between" gap="gap-7">
                <img className=" w-24" src="../LOGO1.png"></img>
                <Logo></Logo>
        
                <Button variant="classic" size="small" animation="underline">
                    <Link to="/">Home</Link>
                </Button>

                <Button variant="classic" size="small" animation="underline">
                    <Link to="/gallery">Gallery</Link>
                </Button>

                <Button variant="classic" size="small" animation="underline">
                    <Link to="/help">Help</Link>
                </Button>

                {
                    !isConnected ? (
                        <Button round="medium" size="normal" function={fetchSignIn}>
                            Sign in
                        </Button>
                    )
                    :(
                        <NavbarProfile user={user}>
                            <Link 
                                to="/edit"
                                className='group flex w-full items-center rounded-md px-2 py-2 text-sm'>
                                Create a pannellum
                            </Link>
                            <Link 
                                to="/"
                                className='group flex w-full items-center rounded-md px-2 py-2 text-sm'>
                                My profile
                            </Link>
                            <Link 
                                to="/"
                                className='group flex w-full items-center rounded-md px-2 py-2 text-sm'>
                                My favorites
                            </Link>
                            <Link 
                                to="/"
                                className='group flex w-full items-center rounded-md px-2 py-2 text-sm'
                                onClick={fetchDisconnect}>
                                Sign out
                            </Link>
                        </NavbarProfile>
                    )
                }
            </Row>
            
            <Routes>
                <Route exact path='/' element={<Home/>}></Route>
                <Route exact path='/gallery' element={< PanGallery />}></Route>
                <Route exact path='/help' element={< Help user={user}/>}></Route>                
                <Route exact path='/edit' element={< Edit />}></Route>
            </Routes>
        </Router>       
    )
}