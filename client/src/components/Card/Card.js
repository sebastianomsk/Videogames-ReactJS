import React, { useEffect, Fragment } from 'react';
import './Card.css';
import { useHistory } from "react-router-dom";


 function Card({ id, img, nombre, generos,rating }) {
    let history = useHistory();
    return (
        <Fragment>
            <div className='card-videogame' onClick={() => history.push(`/videogame/${id}`)}>
                <div id='imagenes-home' >
                    <img src={img} width='100%' alt='img videogame' />
                </div>
                    <div className='card-videogame-nombre'>
                        <span className="aboutLink" >{nombre}</span>
                        <div className='card-videogame-genero' >
                            {generos.map(genero =>
                                    <label className="label-genero" id={genero.id}>{genero.name}</label>
                            )}

                        </div>
                    </div>

                <div className='card-videogame-genero'>
                    
                        <div>

                        <label className="rating-name">Ranting: </label>
                        </div>
                        <div >
                         <label className="rating-name">{rating.toFixed(1)}</label>    
                        <label className='rating-label'
                            >
                            ★
                        </label>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}
export default React.memo(Card);