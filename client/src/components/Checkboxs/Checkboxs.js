import React, { useState, useEffect } from 'react'
import Checkbox2 from '../Checkbox2/Checkbox2'
import { useSelector, useDispatch } from 'react-redux';

 function Checkboxs({ items, setItemsElegidos }) {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const [plataformas, setPlataformas] = useState([]);

    useEffect(() => {
        console.log("use effect 2")
        setPlataformas(arrayBooleano(items, checked));
    }, [checked])

    function seleccionado(i, bool) {
        plataformas[i] = bool;
        setPlataformas(old => [...old]);
    }

    useEffect(() => {
        console.log("Arreglar: me ejecuto cuando cambia plataformas en Chackboxs")
        if (plataformas.length) {
            dispatch(setItemsElegidos(items.filter((_item, index) => plataformas[index] === true)));
        }

    }, [plataformas])


    useEffect(() => {
        let botonLimpiar = document.querySelector('#limpiar')
        botonLimpiar.addEventListener('click', ()=>{ 
            setPlataformas(arrayBooleano(items, checked));
            dispatch(setItemsElegidos([]));
            setChecked(false)
        })
        return () => {
            botonLimpiar.removeEventListener('click', ()=>{
                setPlataformas(arrayBooleano(items, checked));
                dispatch(setItemsElegidos([]));
                setChecked(false)
            })
        }
    }, [])

    return (
        <div>
            <Checkbox2
                key={'seleccionar-todo'}
                checked={checked}
                onChange={(bool) => setChecked(bool)}
                label={"SELECCIONAR TODO:"}
            />

            {items.map((item, index) =>
                    <Checkbox2
                        key={index}
                        checked={plataformas[index]}
                        onChange={(val) => seleccionado(index, val)}
                        label={item}
                    />
                
            )}
        </div>
    )

}
export default React.memo(Checkboxs);

function arrayBooleano(items, checked = false) {
    const array = [];
    for (let i = 0; i < items.length; i++) {
        array.push(checked);
    }
    console.log("arrayBooleano: ", array)
    return array;
}