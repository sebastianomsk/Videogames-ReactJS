import React from 'react';
import { shallow } from 'enzyme';
import Card from '../components/Card/Card';


describe('<Card />', () => {
  let wrapper
  beforeEach(() => {
    // { id, img, nombre, generos,rating }
    wrapper = shallow(<Card id={'Vid1'} nombre={'El gran juego'} rating={'3.8'} img={'https://argentina.jpg'} generos={[{id:'gen1',name:'Drama'}, {id:'gen2', name:'Aventura'}]}/>)
  })

  it('El primer span debe tener el texto "El gran juego" ', () => {
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find('span').at(0).text()).toEqual('El gran juego');
  });
  it('El primer label debe tener el texto "Drama"', () => {
    // Tiene que ser literal! el toEqual
    expect(wrapper.find('label').at(0).text()).toEqual('Drama');
  });
  it('El segundo label debe tener el texto "America" ', () => {
    // Tiene que ser literal! el toEqual
    expect(wrapper.find('label').at(1).text()).toEqual('Aventura');
  });

  it('Deberia renderizar 1 <span />', () => {
    expect(wrapper.find('span')).toHaveLength(1);
  });
  it('Deberia renderizar 5 <label />', () => {
    expect(wrapper.find('label')).toHaveLength(5);
  });

  it('Debe renderizar un <img/>', () => {
    const img='https://argentina.jpg'
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.contains(<img src={img} width='100%' alt='img videogame' />)).toEqual(true)
    });
})