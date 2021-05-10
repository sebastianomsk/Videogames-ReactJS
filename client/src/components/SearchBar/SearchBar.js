import React, { useState } from 'react';
import './SearchBar.css';
import Search from '../Search/Search';
import { useDispatch } from 'react-redux';
import { getVideogames, getVideogamesByRating } from '../../redux/actions'

 function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [orden, setOrden] = useState("");//'Rating más bajo' o 'Rating más alto' o 'Nombre A-Z', 'Nombre Z-A'
    const ordenamientos = ['Rating más bajo', 'Rating más alto', 'Nombre A-Z', 'Nombre Z-A'];

    function ordernar(orden) {
        setOrden(orden);
        buscarPorOrden(orden, name);
    }

    function buscarPorOrden(params, nombre) {
        switch (params) {
            case 'Rating más bajo':
                dispatch(getVideogamesByRating(true, 'asc', nombre));
                break;
            case 'Rating más alto':
                dispatch(getVideogamesByRating(true, 'desc', nombre));
                break;
            case 'Nombre A-Z':
                dispatch(getVideogames(nombre, 'asc'));
                break;
            case 'Nombre Z-A':
                dispatch(getVideogames(nombre, 'desc'));
                break;
            default:
                dispatch(getVideogames(nombre, null));
                break;
        }
    }

    return (

        <div className='search-bar'>
            <Search setName={setName}
                buscarPorOrden={(val) => buscarPorOrden(orden, val)}
            />

            <div>
                <label style={{ color: '#44617e' }}>
                    Ordenar por: &nbsp; &nbsp;
    
                </label>
                <label style={{ width: '200px' }}>

                    <select className='select-orden' value={orden} onChange={evento => { ordernar(evento.target.value) }}>
                        <option value="" >Aleatorio</option>
                        {ordenamientos.map(orden =>
                            (<option key={orden} value={orden}>{orden}</option>))
                        }
                    </select>
                </label>
            </div>
        </div>

    )
}
export default React.memo(SearchBar);