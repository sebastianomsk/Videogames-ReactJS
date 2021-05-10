import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNextOrPreviousPage } from '../../redux/actions';
import './Paginacion.css';

 function Paginacion({ count, paginaActual, limit }) {
    const { selfEndpoint } = useSelector(state => state);
    const dispatch = useDispatch();
    const ultimaPagina = Math.ceil(count / limit);
    const [listaDePaginas, setListaDePaginas] = useState(range(ultimaPagina));
    const primeraPagina = 1;

    // endpoint = `http://localhost:3001/videogames?offset=45`;
    useEffect(() => {
        // console.log("object 3")
        setListaDePaginas(range(ultimaPagina));//[1,2,3,4,...,100]
    }, [count])

    // console.log("componente paginacion")
    function paginate(numero) {
        let offset = (numero * limit) - limit;

        if (selfEndpoint.indexOf('&')!==-1) {
            // console.log("link: ", selfEndpoint.slice(0, selfEndpoint.indexOf('=') + 1) + offset +  selfEndpoint.slice(selfEndpoint.indexOf('&')));
            dispatch(getNextOrPreviousPage(selfEndpoint.slice(0, selfEndpoint.indexOf('=') + 1) + offset + selfEndpoint.slice(selfEndpoint.indexOf('&'))));
        }else{
            // console.log("link sin &: ", selfEndpoint.slice(0, selfEndpoint.indexOf('=') + 1) + offset );
            dispatch(getNextOrPreviousPage(selfEndpoint.slice(0, selfEndpoint.indexOf('=') + 1) + offset ));

        }
    }

    //intentar mejorarlo
    //intentar usar use memo
    function updateNumeroDePaginas(numero) {
        console.log("updateNumeroDePaginas")
        if (numero === 1 || numero === 2) {
            return listaDePaginas.slice(0, 5);
        }

        if (numero > 2 && numero !== ultimaPagina) {
            return listaDePaginas.slice(numero - 3, numero + 2)
        }

        if (numero === ultimaPagina) {
            //si no es mayor que 0 devuelvo 0
            let pagina = (ultimaPagina - 4) >= 0 ? ultimaPagina - 4 : 0;
            return listaDePaginas.slice(pagina, ultimaPagina)
        }
    }

    return (
        <div>
            <b style={{ color:'#b4c2cd', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: '6px 0 0 0'}}>Page: {paginaActual} from {ultimaPagina} </b>
            {ultimaPagina > 1 &&
                <ul className='paginacion' >

                    <strong style={{color:'#b4c2cd'}}> Pages:</strong>
                    {paginaActual > primeraPagina &&
                        <Fragment>
                            <li id='li-first' >
                                <a onClick={() => paginate(primeraPagina)} className='page-link'> <strong>First</strong>   </a>
                            </li>
                            <li id='li-previous' >
                                <a onClick={() => paginate(paginaActual - 1)} className='page-link'> <strong>{`Previuos`}</strong>  </a>
                            </li>
                        </Fragment>
                    }

                    {updateNumeroDePaginas(paginaActual) ?.map(numero => (
                        numero === paginaActual ?

                            <li key={numero} className='number-page' >
                                <strong style={{color:'#b4c2cd'}}>{numero}</strong>
                            </li>
                            :
                            <li key={numero} className='number-page-selected' >
                                <a onClick={() => paginate(numero)} className='page-link'>
                                    <strong>{numero}</strong>
                                </a>
                            </li>
                    ))}

                    {paginaActual < ultimaPagina &&
                        <Fragment>
                            <li id='li-next' >
                                <a onClick={() => paginate(paginaActual + 1)} className='page-link' >
                                    <strong>{`Next`} </strong>
                                </a>
                            </li>
                            <li id='li-Last' >
                                <a onClick={() => paginate(ultimaPagina)} className='page-link'>
                                    <strong>Last</strong>
                                </a>
                            </li>
                        </Fragment>
                    }
                </ul>
            }
        </div>
    )
}

export default React.memo(Paginacion);

function range(ultimaPagina) {
    const listaDePaginas = []
    for (let i = 1; i <= ultimaPagina; i++) {
        listaDePaginas.push(i);
    }
    return listaDePaginas;//[1,2,3,4,...,100]
}
