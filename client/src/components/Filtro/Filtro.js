import React from 'react'
import './Filtro.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getVideogames, searchByActivity, getVideogamesByRating } from '../../redux/actions'
import Checkboxs from '../Checkboxs/Checkboxs';


 function Filtro({ orden, generos }) {
    const [genero, setGenero] = useState('');
    const dispatch = useDispatch()

    function handleSubmit(evento) {

        //verificar
        evento.preventDefault();
        if (!genero) {
            dispatch(getVideogames())
        } 

    }

    function handlerSelect(evento) {
        setGenero(evento.target.value);
        dispatch(getVideogames(null,null, evento.target.value));
    }

    return (
        <div className='filtro'>
            <h2>Filtrar por:</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    
                    <select className='select-genero' value={genero} onChange={ handlerSelect} >
                        <option value="" >Todos los generos</option>
                        {generos.map(g => (<option key={g.id} value={g.name}>{g.name}</option>))}
                    </select>
                </label>


                <div id='checkboxes' >
            </div>
            </form>
            {/* <button type="submit" onClick={() => dispatch(getVideogamesByRating(true, orden))}> Ratng </button> */}

        </div>
    )
}

export default React.memo(Filtro);