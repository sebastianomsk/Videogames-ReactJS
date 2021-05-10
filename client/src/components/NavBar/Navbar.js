import React from 'react'
import './NavBar.css';
import { Link, NavLink } from 'react-router-dom';

 function NavBar() {
    console.log("Rendering NavBar")
    return (
        <header data-testid = "navBar-1">
            <div className="container">
                <div className="navbar">
                    <div >
                        <Link to='/'>
                            <span className="" >
                                <h2>Game World</h2>
                            </span>
                        </Link>
                    </div>
                    <div>
                        <NavLink exact activeClassName='current' to='/home' className='navLink' >
                            <h2>Home</h2>
                        </NavLink>
                        <NavLink exact activeClassName='current' to='/addVideogame' className='navLink' >
                            <h2>Create videogame</h2>
                        </NavLink>
                    </div>
                </div>

            </div>
        </header>
    )
}
export default React.memo(NavBar);
