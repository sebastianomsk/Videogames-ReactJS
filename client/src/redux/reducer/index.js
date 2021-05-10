import { GET_VIDEOGAMES, GET_GENEROS } from '../actions';
import { GET_NEXT_OR_PREVIOUS_PAGE, GET_VIDEOGAME_BY_RATING } from '../actions';
import { SET_GENEROS_ELEGIDOS, SET_PLATAFORMAS_ELEGIDAS, SET_LOADING_HOME } from '../actions';

const initialState = {
    videogames: [],
    count: '',
    page: '',
    selfEndpoint: '',
    generos: [],
    generosElegidos:[],
    plataformasElegidas:[],
    loadingHome:true
};

const videogames = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload.videogames,//state.videogames.concat(action.payload)
                count: action.payload.cantidad,
                page: action.payload.pagina,
                selfEndpoint: action.payload.selfEndpoint
            }

        case GET_GENEROS:
            return {
                ...state,
                generos: action.payload
            }

        case GET_NEXT_OR_PREVIOUS_PAGE:
            return {
                ...state,
                videogames: action.payload.videogames,
                count: action.payload.cantidad,
                page: action.payload.pagina,
                selfEndpoint: action.payload.selfEndpoint
            }

        case GET_VIDEOGAME_BY_RATING:
            return {
                ...state,
                videogames: action.payload.videogames,
                count: action.payload.cantidad,
                page: action.payload.pagina,
                selfEndpoint: action.payload.selfEndpoint
            }

        case SET_GENEROS_ELEGIDOS:
            return{
                ...state,
                generosElegidos:action.payload
            }
        case SET_PLATAFORMAS_ELEGIDAS:
            return{
                ...state,
                plataformasElegidas:action.payload
            }
        case SET_LOADING_HOME:
            return{
                ...state,
                loadingHome:action.payload
            }
        default:
            return state;
    }
}

export default videogames;