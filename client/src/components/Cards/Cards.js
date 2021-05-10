import React from 'react';
import './Cards.css';
import Card from '../Card/Card';

 function Cards({videogames}) {
    if (videogames.length) {
        return (
            <div className='cards'>
                {videogames.map(game =>
                    <Card key={game.id}
                        id={game.id}
                        img={game.background_image}
                        nombre={game.name}
                        generos={game.generos}
                        rating={game.rating}
                    />
                )}
            </div>
        )

    } else {
        return (
            <div>
                <label>No se encontraron resultados para la busqueda</label>
            </div>
        )
    }
}
export default React.memo(Cards);