import React, { useState } from 'react'
import './Videogame.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { getVideogames } from '../../redux/actions'
import { getVideogameByIdService } from '../../services/videogame.service'

export default function Videogame({ match }) {
    const { id } = match.params;
    // const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    const options = { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" };
    const [loading, setLoading] = useState(true);
    const [videogameDetail, setVideogameDetail] = useState({});
    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        // axios.get('http://localhost:3001' + '/videogame/' + id)
        getVideogameByIdService(id)
            .then(res => {
                setVideogameDetail(res.data);
                setLoading(false)
                // setTimeout(()=>setLoading(false) ,500)
            })
            .catch(e => {alert(e); history.push(`/home`);})

        return ()=>{
            // clearTimeout(()=>setLoading(false) ,500)
        }
    }, [])

    // function getFechaConFormato() {
    //     return new Date(videogameDetail.released).toLocaleDateString("es-ES", options).toLocaleUpperCase().replace('.','')
    // }
    function generoOnClick(e, genero) {
        dispatch(getVideogames(null, null, genero));
        history.push(`/home`);

    }
    if (loading) {
        return <div className='image-loading'> </div>
    } else {
        return (
            <div className='videogame-detalle'>
                <div className='tarjeta-videogame-detalle'>
                    <div className='titulo-videogame-detalle'>
                        <div id='titulo-del-juego'>{videogameDetail.name}</div>
                    </div>
                    <div className='cuerpo-videogame-detalle'>
                        <div id='img-videogame-detalle'>
                            <img src={videogameDetail.background_image} width="100%" alt='videogame' />
                        </div>
                        <div id='descripcion-videogame-detalle'>
                            <div className='subtitulo-separador'>
                                Descripción del juego:
                            </div>
                            <div id='gradiente-lineal'></div>
                            <label style={{ marginBottom: '10rem' }}>
                                &nbsp; {videogameDetail.description}
                            </label>

                            <div>
                                <label id='subtitulo-atributo'>Fecha de lanzamiento:</label>
                                <label id='valor-atributo'>
                                    {new Date(videogameDetail.released).toLocaleDateString("es-ES", options).toLocaleUpperCase().replace('.', '')}
                                </label>

                            </div>
                            <div>
                                <label id='subtitulo-atributo'>Rating:</label>
                                <label id='valor-atributo'>{videogameDetail.rating}</label>
                                <label className='rating-label'
                                    style={{ fontSize: '1.4em', fontWeight: 'bolder' }} >
                                    ★
                                </label>
                            </div>

                            <div>
                                <p id='subtitulo-atributo-simple'>Plataformas:</p>
                                {videogameDetail.platforms.map(plataforma =>
                                    <a id='tag-plataforma' key={plataforma} >{plataforma + ','}&nbsp;&nbsp;</a>
                                )}

                                <p id='subtitulo-atributo-simple'>Género:</p>
                                <div className='genero-enlaces'>

                                    {videogameDetail.generos.map(genero =>
                                        <div id='tag-genero' key={genero.id} onClick={(e) => generoOnClick(e, genero.name)}>{genero.name}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
    
}

function primeraLetraEnMayuscula(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1)
}

