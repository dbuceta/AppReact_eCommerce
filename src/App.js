import React from "react"
import './App.css'
import {
  BrowserRouter as Router
} from "react-router-dom"
import Menu from './Componentes/Menu'
import Public from './Routes/Public'
import {Container} from "react-bootstrap"


function App() {
  return (
    <Router>
      <Menu />
      <Container>
      <Public />
      </Container>
    </Router>
  );
}

export default App;