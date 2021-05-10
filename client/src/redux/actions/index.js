import axios from 'axios'
export const LOCALHOST = 'http://localhost:3001';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENEROS = 'GET_GENEROS';
export const GET_NEXT_OR_PREVIOUS_PAGE = 'GET_NEXT_OR_PREVIOUS_PAGE';
export const GET_VIDEOGAME_BY_RATING = 'GET_VIDEOGAME_BY_RATING';
export const SET_PLATAFORMAS_ELEGIDAS = 'SET_PLATAFORMAS_ELEGIDAS';
export const SET_GENEROS_ELEGIDOS = 'SET_GENEROS_ELEGIDOS';
export const SET_LOADING_HOME = 'SET_LOADING_HOME';

export function getVideogames(name, order, genero) {
    let link = `${LOCALHOST}/videogames`;
    if (name || name === '') link += `?name=${name}`;
    if (genero) link += `?genero=${genero}`;
    if (order) link += `&orden=${order}`;

    return async function (dispatch) {
        return axios.get(link)
            .then(res => {
                dispatch(
                    {
                        type: GET_VIDEOGAMES,
                        payload: res.data
                    }
                )
            })
            .catch(e=> console.log("Error getVideogames: ", e))
    }
}

export function getGeneros() {
    return async function (dispatch) {
        return axios.get(LOCALHOST+'/genres')
            .then(res=>{
                dispatch({
                    type:GET_GENEROS,
                    payload: res.data
                })
            })
            .catch(e=> console.log("Error getGeneros: ", e))
    }
}




export function getNextOrPreviousPage(link) {

    return async function (dispatch) {
        return axios.get(`${link}`)
            .then(res => {
                dispatch(
                    {
                        type: GET_NEXT_OR_PREVIOUS_PAGE,
                        payload: res.data
                    }
                )
            })
            .catch((e) => console.log("Pagina, error del pedido: ", e))
    }
}

export function getVideogamesByRating(rating, order, name) {
    let link = `${LOCALHOST}/videogames?rating=${rating}`;
    if (order) link += `&orden=${order}`;//si o si tiene que tener un orden
    if (name || name === '') link += `&name=${name}`;
    
        return async function (dispatch) {
            return axios.get(link)
                .then(res => {
                    dispatch(
                        {
                            type: GET_VIDEOGAME_BY_RATING,
                            payload: res.data
                        }
                    )
                })
                .catch((e) => console.log("rating, error del pedido: ", e))
        }
}

export function setGenerosElegidos(items) {
    return function (dispatch) {
        return dispatch(
            {
                type: SET_GENEROS_ELEGIDOS,
                payload: items
            }
        )
    }
}


export function setPlataformasElegidas(items) {
    return function (dispatch) {
        return dispatch(
            {
                type: SET_PLATAFORMAS_ELEGIDAS,
                payload: items
            }
        )
    }
}

export function setLoadingHome(bool) {
    return function (dispatch) {
        return dispatch(
            {
                type: SET_LOADING_HOME,
                payload: bool
            }
        )
    }
}