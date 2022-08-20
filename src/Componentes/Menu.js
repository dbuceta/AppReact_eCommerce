import React from 'react'
import {Link} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import {Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app'

function Menu(){
        const navigate = useNavigate()
        
        // *** Funcion LogOut y redirige a "Home"
        const handleSignOut = async () => {
            try{
                await firebase.auth.signOut();
                navigate('/home');
            }catch(error){
                console.log(error);
            }
}
    return(
        <>
        <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link as={Link} to="/ingresar">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link as={Link} to="/alta">Registro</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>Mis favoritos</Nav.Link>
            </Nav.Item>
            <p align="right">
                <Button name="upload" type="submit" id="contactus-submit" data-submit="" onClick={handleSignOut}>
                <i id="icon" className=""></i>Salir</Button>
            </p>  
        </Nav>
        </>
    )
}
export default Menu;