import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Inicial from '../src/pages/Inicial/Inicial';
import Home from '../src/pages/Home/Home';
import AddVideogame from '../src/pages/AddVideogame/AddVideogame';
import Videogame from '../src/pages/Videogame/Videogame';
import NavBar from '../src/components/NavBar/Navbar';
import Footer from './components/Footer/Footer';


export default function VideogameRoutes() {

    return <Router>
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Inicial} />
                <Route path="/home" component={Home} />
                <Route path="/addVideogame" component={AddVideogame} />
                <Route path="/videogame/:id" render={({ match }) => <Videogame match={match} />} />
            </Switch>
            <Footer/>
        </div>
    </Router>
}
