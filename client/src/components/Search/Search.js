import React from 'react'
import './Search.css';
import { useState } from 'react';

 function Search({ setName, buscarPorOrden }) {
    const [videogame, setVideogame] = useState('');

    function buscarVideogame() {
        buscarPorOrden(videogame)
    }

    function enviarName(nombre) {
        setVideogame(nombre)
        setName(nombre);
    }

    return (
        <div className='buscador'>
            <form onSubmit={
                evento => {
                    evento.preventDefault();
                    buscarVideogame();
                }
            }>
                <input type='text'
                    placeholder='Ingrese un videogame'
                    value={videogame}
                    onChange={evento => { enviarName(evento.target.value) }}
                />
                <input type="submit"
                    className="search-button"
                    onClick={() => buscarVideogame()}
                    value="Buscar"
                />
                
            </form>


        </div>
    )
}
export default React.memo(Search);