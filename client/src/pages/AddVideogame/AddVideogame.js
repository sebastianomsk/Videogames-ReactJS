import React from 'react'
import './AddVideogame.css'
import SelectBox from '../../components/SelectBox/SelectBox';
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import MiniCard from '../../components/MiniCard/MiniCard';
import { useHistory } from "react-router-dom";
import CheckBoxSelect from '../../components/CheckBoxSelect/CheckBoxSelect';
import { setPlataformasElegidas, getGeneros, setGenerosElegidos } from '../../redux/actions';
import { crearVideojuegoService, getPlataformasService } from '../../services/videogame.service';

 function AddVideogame() {
  const { generos, plataformasElegidas, generosElegidosUsar } = useSelector(store => store);
  const [generosElegidos, setGenerosElegidos] = React.useState([])//[generos elegidos]
  const [generosDisponibles, setGenerosDisponibles] = useState([])//[Todos los generos disponible]
  const [plataformas, setPlataformas] = useState([])//[todas las plataformas disponibles]

  const dispatch = useDispatch();
  let history = useHistory();
  const [errors, setErrors] = useState({});//[errores]
  const [videogame, setVideogame] = React.useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    idGeneros: [],
    platforms: [],
    background_image: ''
  })


  useEffect(() => {
    console.log("use effect add get generos")
    if (!generos.length) {
      dispatch(getGeneros());
    }
    setGenerosDisponibles(generos);
  }, [generos.length])

  useEffect(() => {
    // axios.get('http://localhost:3001/videogames/plataformas')
    getPlataformasService()
      .then(res => {
        setPlataformas(res.data);
      })
      .catch(e => alert(e));
    dispatch(setPlataformasElegidas([]));
  }, []);

  useEffect(() => {
    setVideogame(
      {
        ...videogame,
        platforms: plataformasElegidas
      }
    )
  }, [plataformasElegidas])

  function handleInputChange(evento) {
    setVideogame(
      {
        ...videogame,
        [evento.target.name]: evento.target.value
      }
    )
    // validacion
    setErrors(validate(
      {
        ...videogame,
        [evento.target.name]: evento.target.value
      }
    ))
  }

  function sendForm(evento) {
    evento.preventDefault();
    console.log("Values videogame", Object.values(videogame));
    if (Object.values(videogame).some(val => val === '')) {
      // validacion
      setErrors(validate(
        {
          ...videogame
        }
      ))
      return alert('Faltan completar campos')
    }
    if (Object.keys(errors).length) return alert('Faltan completar campos')
    if (!videogame.idGeneros.length) return alert('Debe elegir al menos un genero')
    if (!videogame.platforms.length) return alert('Debe elegir al menos una plataforma')

    createVideoGame(videogame);
    // history.push('/home');
    // console.log("video juego: ",videogame)
    // confirm("estas seguro?")
    // prompt("¿Qué edad tenés? ")
  }


  function setGenerosSeleccionados(genero) {
    if (getGenero(generosElegidos, genero.id)) return alert(`"${genero.name} ya fue seleccionado!"`);

    setGenerosElegidos([...generosElegidos, genero])//agrego a la lista elegidos
    setVideogame(
      {
        ...videogame,
        idGeneros: [...videogame.idGeneros, genero.id]
      }
    )
    setGenerosDisponibles(filtroExcluyente(generosDisponibles, genero.id))//quito de la lista local**
  }

  function onClose(id) {//id='ARG'
    let lista;
    if (getGenero(generosDisponibles, id)) {
      lista = generosDisponibles;
    } else {
      lista = [...generosDisponibles, getGenero(generosElegidos, id)];
    }

    setGenerosDisponibles(lista);//agrego en la lista local
    setGenerosElegidos(filtroExcluyente(generosElegidos, id));//quito de la lista elegidos**
    setVideogame(
      {
        ...videogame,
        idGeneros: videogame.idGeneros.filter(generoId => generoId !== id)
      }
    )
  }


  function createVideoGame(objeto) {
    crearVideojuegoService(objeto)
      .then(res => {
        console.log("ok: ", res)
        // analizar
        if (res.status === 201) {
          alert("Creado con exito");
          history.push('/home');
        }
      })
      .catch(e => alert("Error al crear ", e))
  }

  function getGenero(lista, id) {
    return lista.find(item => item.id === id)
  }

  function filtroExcluyente(lista, id) {
    return lista.filter(item => item.id !== id);
  }


  function changeVisibility(e) {
    let generosList = document.querySelector('#generos-list');
    generosList.classList.toggle('active');
  }

  return (
    <div className='videogame'>
      <div className='formulario'>
        <h2 style={{ margin: '1rem 0' }}>Crear videogame</h2>

        <form>
          <label>Nombre*</label>
          <input className={`${errors.name && 'danger'}`}
            type='text'
            name='name'
            placeholder='El gran juego'
            value={videogame.name}
            onChange={handleInputChange} />
          {errors.name && (<p className="danger">{errors.name}</p>)}

          <label>Descripción*</label>
          <textarea className={`${errors.description && 'danger'}`}
            type='text'
            name='description'
            placeholder='Es un juego muy bueno..'
            value={videogame.description}
            onChange={handleInputChange} />
          {errors.description && (<p className="danger">{errors.description}</p>)}

          <label>Rating* del 0 al 5</label>
            <input className={`${errors.rating && 'danger'}`}
              type='number'
              name="rating"
              placeholder='3.7'
              value={videogame.rating}
              onChange={handleInputChange}
              step="0.1"
              min='0'
              // max='5'
            />
          {errors.rating && (<p className="danger">{errors.rating}</p>)}


          <label>Fecha de lanzamiento*</label>
          <input className={`${errors.released && 'danger'}`}
            type='date'
            name='released'
            max={new Date().toISOString().split("T")[0]}
            value={videogame.released}
            onChange={handleInputChange} />
          {errors.released && (<p className="danger">{errors.released}</p>)}

          <label>Imagen del juego*</label>
          <input className={`${errors.background_image && 'danger'}`}
            placeholder='Ingrese el enlace de una imagen'
            type='text'
            name='background_image'
            value={videogame.background_image}
            onChange={handleInputChange} />
          {errors.background_image && (<p className="danger">{errors.background_image}</p>)}

          <label>Plataformas*</label>
          <CheckBoxSelect
            items={plataformas}
            itemsElegidos={plataformasElegidas}
            setItemsElegidos={setPlataformasElegidas}
          />
          {errors.platforms && (<p className="danger">{errors.platforms}</p>)}


          <h2>Generos seleccionados</h2>
          <div className='box-item-selected'>

            {generosElegidos.map(genero =>
              <MiniCard
                key={genero.id}
                id={genero.id}
                name={genero.name}
                onClose={() => onClose(genero.id)} />
            )}
          </div>

          <button id='form-button' type="submit" onClick={sendForm}> Enviar </button>
        </form>
      </div>

      <div className='area-busqueda-seleccion'>
        <div className='videogame-search' onClick={changeVisibility}>
          <strong style={{fontSize:'1.5rem'}}>Seleccione un genero</strong>
          <div className='triangulo-equilatero-top'></div>
          <svg style={{ fontSize: '3rem' }} class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </div>

        <div id='generos-list' >
          <SelectBox
            generos={quickSort([...generosDisponibles])}
            setGenerosSeleccionados={setGenerosSeleccionados}
          />
        </div>

        {(videogame.background_image && !errors.background_image) &&
          <div className='videogame-imagen' >
            <img src={videogame.background_image} alt='Imagen no encontrada' width='100%' id='background_image' />
          </div>
        }
      </div>



    </div>
  )
};
export default React.memo(AddVideogame);

// Funciones auxiliares
function validate(videogame) {
  let errors = {};

  if (!videogame.name) {
    errors.name = 'El nombre es requerido';
  } else if (!/^[a-zA-Z0-9]/.test(videogame.name)) {
    errors.name = 'El nombre es invalido';
  }
  if (!videogame.description) {
    errors.description = 'La description es requerida';
  } else if (!/^[a-zA-Z0-9]/.test(videogame.description)) {
    errors.description = 'La description es invalida';
  }

  if (!videogame.rating) {
    errors.rating = 'El rating es requerido';
  } else if (!/^\d*(\.\d{0,2})?$/.test(videogame.rating) || videogame.rating>5) {
    errors.rating = 'El rating es invalida';
  } 


  if (!videogame.released) {
    errors.released = 'La fecha de lanzamiento es requerida';
  } else if (!/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(videogame.released)) {
    errors.released = 'La fecha de lanzamiento es invalida';
  }

  if (!videogame.background_image) {
    errors.background_image = 'El enlace de la imagen es requerido';
  } else if (!/^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/.test(videogame.background_image) &&
    (!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(videogame.background_image))
  ) {
    errors.background_image = 'El enlace es invalido';
  }

  if (!videogame.platforms || videogame.platforms === '') {
    errors.platforms = 'La plataforma es requerida';
  }

  return errors;
}
// ^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png)$
//           |-------- domain -----------|--- path ---|-- extension ---|
function quickSort(array) {
  if (array.length < 1) return [];
  var izq = [];
  var der = [];
  var pivote = array.shift();

  for (let i = 0; i < array.length; i++) {
    array[i].name < pivote.name ? izq.push(array[i]) : der.push(array[i])
  }
  var lista = [].concat(quickSort(izq), pivote, quickSort(der));
  return lista;
}