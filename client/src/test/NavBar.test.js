import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import NavBar from '../components/NavBar/Navbar';

describe('<Nav />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NavBar />)
  })

  it('Deberia renderizar Dos <NavLink />', () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });
  it('El primer NavLink debe tener el texto "HOME" y cambiar la ruta hacia "/".', () => {
    //el orden donde declaran los NavLinks es importante
    expect(wrapper.find(NavLink).at(0).prop('to')).toEqual('/home');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(0).text()).toEqual('Home');
  });
  it('El segundo NavLink debe tener el texto "Nueva actividad" y cambiar la ruta hacia "/add"', () => {
    expect(wrapper.find(NavLink).at(1).prop('to')).toEqual('/addVideogame');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(NavLink).at(1).text()).toEqual('Create videogame');
  });

  it('Deberia renderizar un <Link />', () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('El Link debe tener el texto "Game World" y cambiar la ruta hacia "/".', () => {
    //el orden donde declaran los NavLinks es importante
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(0).text()).toEqual('Game World');
  });
})