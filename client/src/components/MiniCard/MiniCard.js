import React from 'react'
import './MiniCard.css'

export default function MiniCard({ onClose, id, name }) {
    if ( onClose && id && name) {
        return (
            <div className='mini-card' >
                <h2>{name}</h2>
                <div style={{ margin: '10px 10px 10px 4px' }}>
                    <button id="closeIcon" onClick={onClose} >
                        <strong>X</strong>
                    </button>
                </div>
            </div>
        );

    } else {
        return (<span>No se recibieron las 3 props</span>)
    }
}
