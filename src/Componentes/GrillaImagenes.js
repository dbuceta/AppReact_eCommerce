import React, { useState, useEffect } from "react"
import { firebaseDB } from "../Config/firebase"
import { motion } from "framer-motion"
import {useNavigate} from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner'

import {Button} from 'react-bootstrap'

const GrillaImagenes = () => {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {

          try{
                setLoading(true)
                firebaseDB.collection('imagenes')
                .onSnapshot((snap) => {
                    let documents = []
                    snap.forEach(doc => {
                        documents.push({...doc.data(), id: doc.id});
                        console.log(doc.data().titulo)
                    })
                    setDocs(documents)
                    setTimeout(() => {setLoading(false)}, 2000) 
                  })

          }catch(error){
            console.log("Error : " , error)
            setLoading(false)
          }
      },[])

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
              return(
                      <>
                        <div className = "img-grid">
                            
                            {docs && docs.map(doc => (
                            
                              <span key = {doc.id}>
                                  <p><b>Título:</b> {doc.titulo}</p>
                                <motion.div 
                                key = {doc.id} 
                                layout whileHover = {{opacity: 1}} 
                                className = "img-wrap" 
                                >
                                    
                                    <motion.img src = {doc.url}
                                    alt = "Uploaded Pic" 
                                    initial = {{opacity: 0}} 
                                    animate = {{opacity: 1}} 
                                    transition = {{delay: 1}}/>
                                </motion.div>
                                <p><b>Precio:</b> {doc.precio}</p>
                                <Button onClick={()=>navigate(`/detalles/${doc.id}`)}>[Ver Detalles]</Button></span> 
                            ))}
                        </div>
                        </>
                )
            }
}

export default GrillaImagenes;