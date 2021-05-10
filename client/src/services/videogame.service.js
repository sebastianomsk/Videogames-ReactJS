import axios from 'axios';

export async function getVideogameByIdService(id) {
    return await axios.get('http://localhost:3001/videogame/' + id)
}

export async function crearVideojuegoService(juego) {
    return await axios({
        method: 'post',
        url: 'http://localhost:3001/videogame',
        data: juego
      })
}

export async function getPlataformasService() {
    return await axios.get('http://localhost:3001/videogames/plataformas')
}
