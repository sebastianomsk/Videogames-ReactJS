import React, { useState } from 'react';
import './CheckBoxSelect.css';
import Checkboxs from '../Checkboxs/Checkboxs';
import { useSelector, useDispatch } from 'react-redux';
import MiniCard from '../MiniCard/MiniCard';

 function CheckBoxSelect({ items, itemsElegidos, setItemsElegidos }) {

    function removeAllSelected() {
        return 'borrar'
    }

    function changeVisibility(e) {
        let checkboxes = document.querySelector('#checkboxes');
        checkboxes.classList.toggle('active');
    }


    return (
        <div>
            <div className={'contenedor-star-checkbox'} >
                <div className='selected-checkbox' onClick={changeVisibility}>
                   
                    {!itemsElegidos.length?<label> --Elija las plataformas--</label>
                    :itemsElegidos.map((plataforma, index) =>
                    <div  style={{display:'inline-block', backgroundColor:'rgba( 103, 193, 245, 0.2 )', marginLeft:'3px', padding:'0 7px' , color:'#0070ff', fontWeight:'bold'}}>
                        <label id={index}>
                            {plataforma}
                        </label>

                    </div>

                    )}
                </div>
                <div className='selected-checkbox-botones' >
                    <button className={itemsElegidos.length ? 'MuiAutocomplete-clearIndicator' : 'MuiAutocomplete-clearIndicator-oculto'} tabIndex="-1" type="button" aria-label="Limpiar" title="Limpiar" id='limpiar' onClick={removeAllSelected}>
                        <span className="MuiIconButton-label">
                            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            </svg></span><span className="MuiTouchRipple-root">
                        </span>
                    </button>

                    <button className="MuiButtonBase-root MuiIconButton-root MuiAutocomplete-popupIndicator" tabIndex="-1" type="button" aria-label="Abierto" title="Abierto" onClick={changeVisibility}>
                        <span className="MuiIconButton-label">
                            <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M7 10l5 5 5-5z"></path>
                            </svg>
                        </span>
                        <span className="MuiTouchRipple-root"></span>
                    </button>
                </div>
            </div>

            <div id='checkboxes' >
                <Checkboxs items={items}
                    setItemsElegidos={setItemsElegidos}
                />
            </div>
        </div>
    )
}
export default React.memo(CheckBoxSelect);