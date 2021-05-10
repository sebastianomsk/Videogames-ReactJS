import React from 'react';
import SelectBox from '../components/SelectBox/SelectBox';
import { mount } from 'enzyme';


describe("<SelectBox/>", () => {
    let wrapper;
    // let store;
    const genero1 = {
        id: '14111992',
        name: 'Aventura'
    }
    const genero2 = {
        id: '14111991',
        name: "Drama"
    }
    const generos = [
        {
            id: 'gen1',
            name: 'Aventura'
        },
        {
            id: 'gen2',
            name: "Drama"
        }
    ]

    beforeEach(() => {

        const setGenerosSeleccionados = jest.fn();
        wrapper = mount(<SelectBox generos={generos} setGenerosSeleccionados={setGenerosSeleccionados} />)

    })

    it('deberia recibir por props el objeto ´generos´, y renderizar nombre e imagen de esos generos ', () => {

        expect(wrapper.contains(generos[0].name)).toEqual(true)//son las lecturas de un span
        // expect(wrapper.contains(<img className='img-selectBox' src={generos[0].imagen} alt="flag" />)).toEqual(true)
        expect(wrapper.contains(generos[1].name)).toEqual(true)//son las lecturas de un span
        // expect(wrapper.contains(<img className='img-selectBox' src={generos[1].imagen} alt="flag" />)).toEqual(true)
    })

    it('deberia renderizar 2 "h1" que contenga el texto "Argentina" y "Rusia" ', () => {

        // expect(wrapper.find('img')).toHaveLength(2);
        expect(wrapper.find('h1')).toHaveLength(2);
        expect(wrapper.find('h1').at(0).text()).toEqual("Aventura");
        expect(wrapper.find('h1').at(1).text()).toEqual('Drama');
    });

    it('deberia renderizar primero un `div` con el id genero1 y genero2 con la className`contenido-opcion`', () => {
        expect(wrapper.find('#gen1').at(0).prop('className')).toEqual('contenido-opcion');
    })
    it('deberia renderizar primero un `div` con el id #RUS con la className`contenido-opcion`', () => {
        expect(wrapper.find('#gen2').at(0).prop('className')).toEqual('contenido-opcion');
    })
})