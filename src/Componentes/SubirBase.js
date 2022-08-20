import { firebaseDB, timestamp } from "../Config/firebase"

  // *** Funcion guarda los datos en Firebase DB
function SubirBase(imagen, url,title, desc, price){
    const request = async()=>{    
    await firebaseDB.collection('imagenes').add({nombre: imagen.name, 
      url: url, 
      titulo: title,
      descripcion: desc,
      precio: price,
      creado: timestamp
    })
  }
    console.log("document url:", url, "nombre:", imagen.name )
    request()
}

export default SubirBase;