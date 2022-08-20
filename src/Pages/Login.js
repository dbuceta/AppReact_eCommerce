import React, {useState} from 'react'
import firebase from 'firebase/compat/app'
import {useNavigate} from 'react-router-dom'

const InputFields = {
    padding:'0.5rem',
    margin:'0.8rem',
    borderRadius: '3px'
}

// *** Funcion Login en Firebase ***
const Login = () => {
    let UserId = 0
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState("")
    const [form, setForm] = useState({
        email:'',
        password:''
    })

    const handleSubmit = async(event)=>{
        event.preventDefault()
        await login_en_FireBase(form)
      }

    let login_en_FireBase = async({email, password})=>{
        
        try{
            const res = await firebase.auth.signInWithEmailAndPassword(email, password)
            if (res.user.uid){    
                UserId = res.user.uid
                console.log("Usuario logueado uid: ", res.user.uid)       
                if(UserId){
                    setMensaje("Bienvenido!!!")
                    alert("Bienvenido!!!")
                    navigate('/publicaciones')}
                    else{navigate('/ingresar')}     
            }
        }catch(error){
            console.log("Error del Catch: ", error.code)
            setMensaje(`Se ha producido un Error ! ${error.code}`)
        }
    }
    return (
        <div className="container">
            <h1>Login</h1>
            <form id="contactus" onSubmit={handleSubmit} >
            
            <fieldset> <input type="text" label="email" style={InputFields} placeholder="email" id="email" onChange={(e) => 
            setForm({...form, email: e.target.value})} /> 
            </fieldset>

            <fieldset> <input type="password" label="password" placeholder="Password" style={InputFields} onChange={(e) => 
            setForm({...form, password: e.target.value})}/> 
            </fieldset>
            <br/>
            
            <button type="submit">Ingresar</button>
            </form>
            <div><h3> {mensaje} </h3></div>
        </div>
        
    )
}

export default Login;