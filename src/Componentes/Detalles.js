import { useState, useEffect} from "react"
import { firebaseDB } from "../Config/firebase"
import {useParams} from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

  // *** Funcion leer datos en Firebase DB
function Detalles(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [url, setUrl] = useState('')
    const [titulo, setTitulo] = useState('')
    const [desc, setDesc] = useState('')
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [loading, setLoading] = useState(true)
    //const creado = []
    
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                console.log("id es", id)
                setLoading(true)
                const response = await firebaseDB.collection('imagenes').doc(id).get()
                console.log("response es", response.data())
                setUrl(response.data().url)
                setTitulo(response.data().titulo) 
                setDesc(response.data().descripcion)
                setNombre(response.data().nombre) 
                setPrecio(response.data().precio)
                setTimeout(() => {setLoading(false)}, 2000) 
                //const creado = timestamp(response.data().creado.seconds, response.data().creado.nanoseconds)
     
            } catch (error) {
                console.log(error)
                setLoading(false) 
            }
        }
        obtenerDatos()
    
    },[id])

    if(loading){
        return(
            <div>
                <h2>Cargando ...</h2>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )          
    }else{
        return (
            <>
            <center>
            <div>
            <h2>{titulo}</h2>
                <img src={url} alt={nombre} width="200"/>
                <br/><br/>
                <h4>Descripción:</h4> <p>{desc}</p>
                <h4>Nombre Archivo:</h4> <p>{nombre}</p>
                <h4>Precio:</h4> <p>{precio}</p>
                <input type="button" value="Volver!" onClick={()=>(navigate('/publicaciones'))}></input>
            </div>
            </center>
            </>
                )
            }
}  // *** Fin funcion leer datos en Firebase DB     <h6>{creado}</h6>

export default Detalles;