import React from "react"
import Home from '../Pages/Home'
import Registrar from '../Pages/Registrar'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Login from '../Pages/Login'
import ImagenesAlta from '../Componentes/ImagenesAlta'
import NotFound from '../Pages/NotFound'
import Detalles from '../Componentes/Detalles'

function Public() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Navigate to="/" />} />
        <Route path='/alta' element={<Registrar />} />
        <Route path='/ingresar' element={<Login />} />
        <Route path='/publicaciones' element={<ImagenesAlta />} />
        <Route path='/detalles/:id' element={<Detalles />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
  )
}

export default Public;    

        