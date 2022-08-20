import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import GrillaImagenes from "./GrillaImagenes"
import Titulo from "./Titulo"
import { getDownloadURL, uploadBytes, getStorage, ref} from "firebase/storage"
import SubirBase from "./SubirBase"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, onAuthStateChanged} from "../Config/firebase"
import { useNavigate } from 'react-router-dom'

// *** Funcion upLoad imagenes en Firestore y mostrar publicaciones ***
function ImagenesAlta(){
  const [imagen, setImagen] = useState(null)
  const [url, setUrl] = useState("")
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  
  const handleChange = e => {
    e.preventDefault()
    if (e.target.files[0]) {
      setImagen(e.target.files[0])
      
    }
  }

  // *** Funcion devuelve imagenes cargadas en Firestore
  const handleUpload = (e) => {
    e.preventDefault()
    const desc = document.getElementById("descripcion").value
    const price = document.getElementById("precio").value
    const title = document.getElementById("titulo").value
    let storage = getStorage()
    let storageRef = ref(storage, `imagenes/${imagen.name}`)
    
    console.log("descripcion, vale: ", desc)
  
    uploadBytes(storageRef, imagen)
    .then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        setUrl(url)
        SubirBase(imagen, url, title, desc, price)
    })
    })
}
  try{
    onAuthStateChanged(auth, (user) => {console.log("UserId: ", user.uid)})
    if(!auth.currentUser){navigate('/ingresar')}
    else{
    return(
    <>
      <div className="container">
                <form id="contactus" >
                <div><h3>Crear Publicación</h3></div>
                <input type="text" label="titulo" placeholder="Titulo" id="titulo" /> 
                <textarea type="text" label="descripcion" placeholder="Descripcion" id="descripcion" /> 
                <input type="text" label="precio" placeholder="Precio" id="precio" />            
                <br /> <br />
                <input type="file" onChange={handleChange}/><br /><br />
                <button name="upload" type="submit" id="contactus-submit" data-submit="" onClick={handleUpload}>
                <i id="icon" className=""></i>Subir Imagen</button>
                </form>                
                <br /><br />
          </div>
          <Titulo />
          <div>
                { url && <img src={url} alt="imagen" height={100} /> }     
                <GrillaImagenes /> 
      </div>
    </>
    )
    }
  }catch(error){console.log("Error", error.code)}

} // Fin funcion cargar imagenes en Firebase

export default ImagenesAlta;