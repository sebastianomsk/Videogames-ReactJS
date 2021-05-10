import React from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import Filter from '../../components/Filtro/Filtro';
import Cards from '../../components/Cards/Cards';
import { getVideogames, getGeneros } from '../../redux/actions'
import Paginacion from '../../components/Paginacion/Paginacion';
import SearchBar from '../../components/SearchBar/SearchBar';



 function Home() {
    const dispatch = useDispatch();
    const { videogames, generos, count, page } = useSelector(store => store);
    // const [orden, setOrden] = useState("");
    // const orderObj = { Ascendente: "asc", Descendente: "desc" };
    const [loading, setLoading] = useState(true);
    // const ordenamientos = [ 'Rating más bajo', 'Rating más alto', 'Nombre A-Z', 'Nombre Z-A'];
    // si ya tengo los datos no debería llamarlos
    useEffect(() => {
        if (!videogames.length)  dispatch(getVideogames()); 
        if (!generos.length) dispatch(getGeneros());
        setLoading(false)
        // const timer = setTimeout(() =>  setLoading(false) , 300);
        // return () => clearTimeout(timer);
    }, [])



    if (loading) {
        return <div className='image-loading' style={{display:'flex', flex:'1',justifyContent:'center', alignItems:'center'}}></div>
    } else {

        return (
            <div className='body2'>
                <div className='cuerpo'>
                    <div className='filter-area' >
                        <Filter
                            generos={generos}
                            orden={null}
                        />
                    </div>

                    <div className='main'>
                        <div className='main-encabezado'>
                            <SearchBar/>
                        </div>
                        {count && <Paginacion count={count} paginaActual={page} limit={15} />}

                        <Cards videogames={videogames} />

                        <div>
                            {count && <Paginacion count={count} paginaActual={page} limit={15} />}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}
export default React.memo(Home);