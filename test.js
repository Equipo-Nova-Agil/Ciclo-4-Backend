import { tipos } from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js';
import { gql } from 'apollo-server-express';
import { ApolloServer } from 'apollo-server-express';
import conectarBD from './db/db.js';
import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();
await conectarBD();

const server = new ApolloServer({
  typeDefs: tipos,
  resolvers: resolvers,
});

// PRUEBAS UNITARIAS DE Usuario 

//-----------------------------------------------------------------
//Creación
 /** 
it('Crear usuarios', async () => {
    const result = await server.executeOperation({
      query: gql`
      mutation Mutation(
          $nombre: String!,
          $apellido: String!, 
          $identificacion: String!, 
          $correo: String!, 
          $rol: Enum_Rol!, 
          $password: String!
        ) {
        crearUsuario(
            nombre: $nombre, 
            apellido: $apellido, 
            identificacion: $identificacion, 
            correo: $correo, 
            rol: $rol, 
            password: $password
        ) {
          _id
          correo
        }
      }
      `,
      variables: {
        "nombre": 'pruebassssss',
        "apellido": 'unitariasss',
        "identificacion": '123433',
        "correo": 'testin@test.com',
        "rol": 'ADMINISTRADOR',
        "password": '1234',
      },
    });
  
    assert.equal(result.data.crearUsuario.correo, 'testin@test.com');
  });
*/

//-----------------------------------------------------------------
// Querys 
/** 
it('Buscar usuario por correo', async () => {
  const result = await server.executeOperation({
    query: gql`
      query Usuarios($filtro: FiltroUsuarios) {
        Usuarios(filtro: $filtro) {
          correo
        }
      }
    `,
    variables: {
      filtro: {
        correo: 'estiwa@gmail.com',
      },
    },
  });

  // verifica que no hayan usuarios con correo duplicado
  assert.equal(result.data.Usuarios.length, 1);

  assert.equal(result.data.Usuarios[0].correo, 'estiwa@gmail.com');
});
*/
// ----------------------------------------------------------------
/** 
it('Buscar usuario por rol', async () => {
  const result = await server.executeOperation({
    query: gql`
      query Usuarios($filtro: FiltroUsuarios) {
        Usuarios(filtro: $filtro) {
          rol
        }
      }
    `,
    variables: {
      filtro: {
        rol: 'ESTUDIANTE',
      },
    },
  });

  assert.equal(result.data.Usuarios[0].rol, 'ESTUDIANTE');
});
*/
// ----------------------------------------------------------------
/** 
it('Buscar usuario por correo que ya no exista', async () => {
  const result = await server.executeOperation({
    query: gql`
      query Usuarios($filtro: FiltroUsuarios) {
        Usuarios(filtro: $filtro) {
          correo
        }
      }
    `,
    variables: {
      filtro: {
        correo: 'angela@gmail.com',
      },
    },
  });

  assert.equal(result.data.Usuarios.length, 0);

});

*/
// ----------------------------------------------------------------
// ELIMINACIÓN 
 /** 
it('Eliminar usuarios', async () => {
    const result = await server.executeOperation({
      query: gql`
      mutation Mutation(
          $correo: String
        ) {
        eliminarUsuario(
            correo: $correo
        ) {
          correo
        }
      }
      `,
      variables: {
        "correo": 'testin@test.com',
      },
    });
    assert.equal(result.data.eliminarUsuario.correo, 'testin@test.com');
  });
*/

//-----------------------------------------------------------------

// PRUEBAS UNITARIAS DE Proyectos

//-----------------------------------------------------------------
//Creación
/** 
it('Crear proyectos', async () => {
    const result = await server.executeOperation({
      query: gql`
      mutation Mutation(
          $nombre: String!, 
          $presupuesto: Float!, 
          $fechaInicio: Date!, 
          $fechaFin: Date!, 
          $lider: String!, 

        ) {
        crearProyecto(
          nombre: $nombre, 
          presupuesto: $presupuesto, 
            fechaInicio: $fechaInicio, 
            fechaFin: $fechaFin, 
            lider: $lider, 
            
        ){
          _id
          nombre
        }
      }
      `,
      variables: {
        "nombre": 'Unitaria',
        "fechaInicio": '2020-01-01',  
        "fechaFin": '2022-01-01',
        "lider": '61a558645c59f7c31c2ff656', 
        "presupuesto": 30000000,
      },
    });
    assert.equal(result.data.crearProyecto.nombre, 'Unitaria');
  });
*/

//-----------------------------------------------------------------
// Querys
/** 
it('Buscar proyecto por id', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Proyectos($filtro: FiltroProyectos) {
      Proyectos(filtro: $filtro) {
        _id
      }
    }
    `,
    variables: {
      filtro: {
        _id: '61bc368dc416450568b264da',

      },
    },
  });
  console.log(JSON.stringify(result));
  assert.equal(result.data.Proyectos[0]._id, '61bc368dc416450568b264da');
});
*/
/** 
it('Buscar proyecto por nombre del proyecto', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Proyectos($filtro: FiltroProyectos) {
      Proyectos(filtro: $filtro) {
        nombre
      }
    }
    `,
    variables: {
      filtro: {
        nombre: 'Proyecto Prueba',
      },
    },
  });

  console.log(JSON.stringify(result));
  assert.equal(result.data.Proyectos[0].nombre, 'Proyecto Prueba');
});
*/
/** 
it('Buscar proyecto por fase', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Proyectos($filtro: FiltroProyectos) {
      Proyectos(filtro: $filtro) {
        fase
      }
    }
    `,
    variables: {
      filtro: {
        fase: 'INICIADO',
      },
    },
  });

  console.log(JSON.stringify(result));
  assert.equal(result.data.Proyectos[0].fase, 'INICIADO');
});
*/
/** 
it('Buscar proyecto por lider', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Proyectos($filtro: FiltroProyectos) {
      Proyectos(filtro: $filtro) {
        lider{
          _id
        }
      }
    }
    `,
    variables: {
      filtro: {
        lider: '61ae71744d20f940f07b683b',
      },
    },
  });

  console.log(JSON.stringify(result));
  assert.equal(result.data.Proyectos[0].lider._id, '61ae71744d20f940f07b683b');
});
*/
/** 
it('Buscar proyecto por estado', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Proyectos($filtro: FiltroProyectos) {
      Proyectos(filtro: $filtro) {
        estado
      }
    }
    `,
    variables: {
      filtro: {
        estado: 'INACTIVO',
      },
    },
  });

  console.log(JSON.stringify(result));
  assert.equal(result.data.Proyectos[0].estado, 'INACTIVO');
});
*/
/** 
it('Buscar proyecto por nombre del proyecto que no se encuentre en la bd', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Proyectos($filtro: FiltroProyectos) {
      Proyectos(filtro: $filtro) {
        nombre
      }
    }
    `,
    variables: {
      filtro: {
        nombre: 'Proyecto',
      },
    },
  });

  console.log(JSON.stringify(result));
  assert.equal(result.data.Proyectos.length, 0);
});
*/
//-----------------------------------------------------------------
// ELIMINACIÓN 
/** 
it('Eliminar proyectos', async () => {
    const result = await server.executeOperation({
      query: gql`
      mutation Mutation(
          $nombre: String,
        ) {
        eliminarProyecto(
            nombre: $nombre
        ) {
          nombre
        }
      }
      `,
      variables: {
        "nombre": 'Unitaria',
      },
    });
    console.log(JSON.stringify(result));
    assert.equal(result.data.eliminarProyecto.nombre, 'Unitaria');
  });
*/
//-----------------------------------------------------------------

// PRUEBAS UNITARIAS DE Inscripciones

//-----------------------------------------------------------------
//Creación
/** 
it('Crear inscripciones', async () => {
    const result = await server.executeOperation({
      query: gql`
      mutation Mutation(
          $proyecto: String!, 
          $estudiante: String!, 
          $estado: Enum_EstadoInscripcion!,
        ) {
        crearInscripcion(
            proyecto:$proyecto, 
            estudiante:$estudiante, 
            estado: $estado,
        ) {
          _id
          proyecto{
            _id
            nombre
          }
          estudiante {
            _id
            nombre
          }
        }
      }
      `,
      variables: {
        "proyecto":'61bc3142269fb88dbf5fb85b',
        "estudiante": '61a558645c59f7c31c2ff656',
        "estado": 'PENDIENTE',
      },
    });
    console.log(JSON.stringify(result));
    assert.equal(result.data.crearInscripcion.proyecto._id, '61bc3142269fb88dbf5fb85b');
  });
  
*/
//-----------------------------------------------------------------
// Querys
/** 
it('buscar inscripcion por id', async () => {
    const result = await server.executeOperation({
      query: gql`
      query Query($filtro: FiltroInscripciones) {
        Inscripciones(filtro: $filtro) {
          _id
        }
      }
      `,
      variables: {
        filtro:{
          _id: '61bc31f4269fb88dbf5fb9c7',
        }
      },
    });
    console.log(JSON.stringify(result));
    assert.equal(result.data.Inscripciones[0]._id, '61bc31f4269fb88dbf5fb9c7');
  });
*/
/** 
  it('buscar inscripcion por id proyecto', async () => {
    const result = await server.executeOperation({
      query: gql`
      query Query($filtro: FiltroInscripciones) {
        Inscripciones(filtro: $filtro) {
          proyecto {
            _id
          }
        }
      }
      `,
      variables: {
        filtro:{
         proyecto: '61bc3142269fb88dbf5fb85b',
        }
      },
    });
    console.log(JSON.stringify(result));
    assert.equal(result.data.Inscripciones[0].proyecto._id, '61bc3142269fb88dbf5fb85b');
  });
*/
/** 
  it('buscar inscripcion por id estudiante', async () => {
    const result = await server.executeOperation({
      query: gql`
      query Query($filtro: FiltroInscripciones) {
        Inscripciones(filtro: $filtro) {
          estudiante {
            _id
          }
        }
      }
      `,
      variables: {
        filtro:{
          estudiante: '61a652ebff74b52254a5e23d',
        }
      },
    });
    console.log(JSON.stringify(result));
    assert.equal(result.data.Inscripciones[0].estudiante._id, '61a652ebff74b52254a5e23d');
  });
*/
/** 
  it('buscar inscripcion por estado', async () => {
    const result = await server.executeOperation({
      query: gql`
      query Query($filtro: FiltroInscripciones) {
        Inscripciones(filtro: $filtro) {
          estado
        }
      }
      `,
      variables: {
        filtro:{
          estado: 'ACEPTADO',
        }
      },
    });
    console.log(JSON.stringify(result));
    assert.equal(result.data.Inscripciones[0].estado, 'ACEPTADO');
  });
*/
//-----------------------------------------------------------------

// PRUEBAS UNITARIAS DE Avances

//-----------------------------------------------------------------
//Creación
/** 
  it('Crear avances', async () => {
    const result = await server.executeOperation({
      query: gql`
      mutation Mutation(
          $fecha: Date!, 
          $proyecto: String!, 
          $descripcion: String!, 
          $creadoPor: String!
        ) {
        crearAvance(
            fecha: $fecha, 
            proyecto: $proyecto, 
            descripcion: $descripcion, 
            creadoPor: $creadoPor
        ) {
          _id
          descripcion
        }
      }
      `,
      variables: {
        "fecha": '2021-12-12',
        "proyecto": '61afbdc57687be3364532728',  
        "descripcion": 'Esto es una prueba unitaria',
        "creadoPor": '61a68af636dedfad247179ca',
      },
    });
    assert.equal(result.data.crearAvance.descripcion, 'Esto es una prueba unitaria');
  });
*/
//-----------------------------------------------------------------
// Querys
/** 
it('Buscar avance por descripción', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Avances($filtro: FiltroAvances) {
      Avances(filtro: $filtro) {
        descripcion
      }
    }
    `,
    variables: {
      filtro: {
        descripcion: 'Esto es una prueba unitaria de creación de avance',
      },
    },
  });
  
  assert.equal(result.data.Avances.length, 1);
  assert.equal(result.data.Avances[0].descripcion,'Esto es una prueba unitaria de creación de avance');
});
*/
/** 
it('Buscar avance por proyecto', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Avances($filtro: FiltroAvances) {
      Avances(filtro: $filtro) {
        proyecto {
          _id
        }
      }
    }
    `,
    variables: {
      filtro: {
        proyecto: '61afbdc57687be3364532728',
      },
    },
  });

  assert.equal(result.data.Avances.length, 1);
  assert.equal(result.data.Avances[0].proyecto._id,'61afbdc57687be3364532728');
});
*/
/** 
it('Buscar avance por usuario creador', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Avances($filtro: FiltroAvances) {
      Avances(filtro: $filtro) {
        creadoPor {
          _id
        }
      }
    }
    `,
    variables: {
      filtro: {
        creadoPor: '61a68af636dedfad247179ca',
      },
    },
  });

  assert.equal(result.data.Avances[0].creadoPor._id,'61a68af636dedfad247179ca');
});
*/
/** 
it('Buscar avance por descripción que no exista', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Avances($filtro: FiltroAvances) {
      Avances(filtro: $filtro) {
        descripcion
      }
    }
    `,
    variables: {
      filtro: {
        descripcion: 'Esto es una prueba',
      },
    },
  });
  
  assert.equal(result.data.Avances.length, 0);
});
*/
//-----------------------------------------------------------------
// ELIMINACIÓN 
/** 
 it('Eliminar avances', async () => {
  const result = await server.executeOperation({
    query: gql`
    mutation EliminarAvance(
      $descripcion: String,
      ) {
      eliminarAvance(
        descripcion: $descripcion
      ) {
        descripcion
      }
    }
    `,
    variables: {
      "descripcion": 'Esto es una prueba unitaria',
    },
  });
  console.log(JSON.stringify(result));
  assert.equal(result.data.eliminarAvance.descripcion, 'Esto es una prueba unitaria');
});
*/
// ----------------------------------------------------------------
