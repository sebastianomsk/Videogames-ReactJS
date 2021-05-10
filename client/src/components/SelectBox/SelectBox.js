import React from 'react'
import './SelectBox.css'


export default function SelectBox({ generos, setGenerosSeleccionados }) {

    function agregarALaLista( id) {
        setGenerosSeleccionados(generos.find(genero => genero.id === id))//es bastante usado
    }
    console.log("SelectBox")
    return (
            <div className="contenedor">
                    <div className="selectbox">
                        <div className="opciones active" id="opciones" >
                            {generos ?.map(genero =>
                                <div className="contenido-opcion"
                                    id={genero.id} 
                                    key={genero.id}
                                    onClick={() => agregarALaLista( genero.id)}>
                                    <div className="textos" >
                                        <h1 className="titulo" >{genero.name}</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
            </div>
    )
}
