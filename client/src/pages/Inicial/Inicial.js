import React from 'react'
import { Link } from 'react-router-dom';
import './Inicial.css'

export default function Inicial() {

    return (
        <div className='principal image-fondo'>
            <Link to='/home' style={{position: 'relative',top: '-10rem'}}>
                <h1 className='titulo-principal' style={{  color: 'white', fontSize: '70px' }}>Henry Videogame</h1>
            </Link>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to='/home' className='btn-principal'>
                    <span id='span-principal-1'></span>
                    <span id='span-principal-2'></span>
                    <span id='span-principal-3'></span>
                    <span id='span-principal-4'></span>
                    Home
                </Link>
            </div>
        </div>
    )
}
