import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import firebase from 'firebase/compat/app'
import "firebase/compat/auth"

// *** Funcion registrar en Firebase ***
const Registrar = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [mensaje, setMensaje] = useState('')

    const onSubmit = (data) => {
        console.log("Data es: ", data)
        registroenFireBase(data)
    }

    const registroenFireBase = async({email, password})=>{
        let UserId = ""
        try{
            const respuesta = await firebase.auth.createUserWithEmailAndPassword(email, password)
            UserId = respuesta.user.uid
    
            if(UserId){
                setMensaje("Registro Exitoso !")
                console.log("Registro Exitoso !")}
    
            }catch(error){        
                console.log("Error es: ", error.code)
                
                if (error.code ) {
                    //console.log('Email ya Registrado!')
                    setMensaje(`Se ha producido un Error ! ${error.code}`)
                }
                /* auth/network-request-failed  //falla internet
                'auth/email-already-in-use' */
            }
        } //Fin de RegistroFireBase

    return (
        <div className="container">
            <h1>Registro</h1>
            <form id="contactus" onSubmit={handleSubmit(onSubmit)} >
          
            <fieldset> 
            <input type="text" label="nombre" placeholder="Nombre"   
                    {...register("nombre",{ required: true })} />
                    {errors.nombre && <span>"Por favor, Ingrese su Nombre"</span>} 
            </fieldset> 
            
             <fieldset> 
            <input type="text" label="apellido" placeholder="Apellido"
                    {...register("apellido",{ required: true })} />
                    {errors.apellido && "Por favor, Ingrese su Apellido"}</fieldset> 
           
            <fieldset> 
            <input type="email" label="email" placeholder="email" id="email" 
                    {...register("email",{ required: true })} /> 
            {errors.email && <span>"Email es obligatorio"</span>}
            </fieldset> 
            
            <fieldset> <input type="password" label="password" placeholder="Password" 
                    {...register("password",{ required: true })}/>
            {errors.password && <span>"Por favor, Ingrese un Password"</span>}
             </fieldset> 
            <br/>
            <button type="submit">Registrar</button>
            <button type="reset" onClick={()=>setMensaje('')}>Borrar</button>
            </form>
            <div><h3>{mensaje}</h3></div>
        </div>
  
    )
}
  
export default Registrar; //onChange={setMensaje()}