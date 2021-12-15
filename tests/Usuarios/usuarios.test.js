import {ModeloUsuarios} from '../Usuarios/Usuarios';

describe('Pruebas en Usuarios.js', () => {
    test('deben ser iguales los strings', () => {
        //1. Inicialización
        const usuario = ModeloUsuarios.findOne({_id: '61a558645c59f7c31c2ff656'});

        //2. Estímulo
        const usuario2 = ModeloUsuarios.findOne({_id: '61a558645c59f7c31c2ff656'});

        //3. Resultado
        expect(usuario).toBe(usuario2);
    })
});