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
        "correo": 'angela@gmail.com',
      },
    });
    assert.equal(result.data.eliminarUsuario.correo, 'angela@gmail.com');
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
          $fechaInicio: Date!, 
          $fechaFin: Date!, 
          $lider: String!, 
          $presupuesto: Float!, 
          $fase: Enum_FaseProyecto!, 
          $estado: Enum_EstadoProyecto!
        ) {
        crearProyecto(
            nombre: $nombre, 
            fechaInicio: $fechaInicio, 
            fechaFin: $fechaFin, 
            lider: $lider, 
            presupuesto: $presupuesto, 
            fase: $fase, 
            estado: $estado
        ){
          _id
          nombre
        }
      }
      `,
      variables: {
        "nombre": 'unitaria',
        "fechaInicio": '2020-01-01',  
        "fechaFin": '2022-01-01',
        "lider": '61a558645c59f7c31c2ff656', 
        "presupuesto": 30000000,
        "fase": 'INICIADO',
        "estado": 'ACTIVO',
      },
    });
    assert.equal(result.data.crearProyecto.nombre, 'unitaria');
  });

*/
//-----------------------------------------------------------------
// Querys

// NO ESTA FUNCIONANDO BIEN Y FALTAN OTRAS
/** 
it('Buscar proyecto por id', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Query($id: String!) {
      Proyecto(_id: $id) {
        _id
      }
    }
    `,
    variables: {
      id: '61afbdc57687be3364532728',
    },
  });
  console.log(JSON.stringify(result));
  assert.equal(result.data.Proyecto.id, '61afbdc57687be3364532728');
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
        "nombre": 'unitaria',
      },
    });
    console.log(JSON.stringify(result));
    assert.equal(result.data.eliminarProyecto.nombre, 'unitaria');
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

// Funciona a medias 

/** 
it('Buscar inscripcion por proyecto', async () => {
  const result = await server.executeOperation({
    query: gql`
      query InscripcionesPorProyecto(
        $proyecto: String!
      ) {
        InscripcionesPorProyecto(
          proyecto: $proyecto
        ) {
          _id
        }
      }
      
    `,
    variables: {
      "proyecto": '61bc3142269fb88dbf5fb85b',
    },
  });

  console.log(JSON.stringify(result));
  assert.equal(result.data.InscripcionesPorProyecto.proyecto, '61bc3142269fb88dbf5fb85b');
});

*/

//-----------------------------------------------------------------
// Aprobar
// FUNCIONA A MEDIAS MANDA ERROR PERO SI CAMBIA EL ESTADO, ES POR EL NOMBRE DEL CAMPO
//-----------------------------------------------------------------
/** 
it('aprobar inscripcion', async () => {
    const result = await server.executeOperation({
      query: gql`
      mutation Mutation(
          $aprobarInscripcionId: String!
        ) {
        aprobarInscripcion(
            id: $aprobarInscripcionId
        ) {
          _id
        }
      }
      `,
      variables: {
        "aprobarInscripcionId": '61aeaac7b5fbc55eee51e226',
      },
    });
    console.log(JSON.stringify(result));
    assert.equal(result.data.aprobarInscripcion.aprobarInscripcionId, '61aeaac7b5fbc55eee51e226');
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
        "descripcion": 'Esto es una prueba unitaria de creación de avance',
        "creadoPor": '61a68af636dedfad247179ca',
      },
    });
    assert.equal(result.data.crearAvance.descripcion, 'Esto es una prueba unitaria de creación de avance');
  });
*/
//-----------------------------------------------------------------
// Querys
/** */
it('Buscar avance por proyecto', async () => {
  const result = await server.executeOperation({
    query: gql`
    query Query($proyecto: String!) {
      filtrarAvance(proyecto: $proyecto) {
        _id
      }
    }
    `,
    variables: {
      filtro: {
        proyecto: '61afbdc57687be3364532728',
      },
    },
  });
  // verifica que no hayan usuarios con correo duplicado
  

  assert.equal(result.data.filtrarAvance.proyecto._id, '61afbdc57687be3364532728');
});

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
      "descripcion": 'Esto es una prueba unitaria de creación de avance',
    },
  });
  console.log(JSON.stringify(result));
  assert.equal(result.data.eliminarAvance.descripcion, 'Esto es una prueba unitaria de creación de avance');
});
*/
// ----------------------------------------------------------------
