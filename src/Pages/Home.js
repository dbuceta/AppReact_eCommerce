import React from "react"
import Login from './Login'

function Home(){
    return(
        <div>
            <div>
                <h1>Mi App</h1>
                {<Login />}
            </div>
        </div>
    )    
    
}

export default Home;
