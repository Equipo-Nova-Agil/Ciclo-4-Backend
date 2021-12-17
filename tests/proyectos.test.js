import { tipos } from './models/Proyectos/Tipos.js';
import { resolvers } from './models/Proyectos/Resolvers.js';
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

it('creates Projects', async () => {
  const result = await server.executeOperation({
    query: gql`
      mutation Mutation(
        $nombre: String!
        $estado: Enum_EstadoProyecto!
        $fase: Enum_FaseProyecto!
        $fechaInicio: Date!
        $fechaFin: Date!
        $presupuesto: Number!
        $lider: Usuario!
        $objetivos: [Objetivo]
      ) {
        crearProyecto(
            nombre: $nombre
            estado: $estado
            fase: $fase
            fechaInicio: $fechaInicio
            fechaFin: $fechaFin
            presupuesto: $presupuesto
            lider: $lider
            objetivos: $objetivos
        ) {
          nombre
        }
      }
    `,
    variables: {
        nombre: "P_pruba",
        estado: "ACTIVO",
        fase: "INICIADO",
        fechaInicio: "2021/12/16",
        fechaFin: "2022/12/17",
        presupuesto: 1000000000,
        lider: "PEp",
        objetivos: "No sé que poner aquí"    },
  });

  assert.equal(result.data.crearProyecto.nombre, 'P_pruba');
});

it('fetches Project', async () => {
  const result = await server.executeOperation({
    query: gql`
      query Proyectos() {
        Proyectos() {
          nombre
        }
      }
    `,
    variables: {
      filtro: {
        nombre: 'P_pruba',
      },
    },
  });

  assert.equal(result.data.Usuarios[0].length, 1);

  assert.equal(result.data.Usuarios[0].nombre, 'P_pruba');
});

it('deletes Project', async () => {
  const result = await server.executeOperation({
    query: gql`
      mutation eliminarProyecto($nombre: String) {
        eliminarProyecto(nombre: $nombre) {
          nombre
        }
      }
    `,
    });
  assert.equal(result.data.eliminarProyecto.nombre, 'P_pruba');
});

it('fetches user after deletion', async () => {
  const result = await server.executeOperation({
    query: gql`
      query Proyectos() {
        Proyectos() {
          nombre
        }
      }
    `,
  });

  assert.equal(result.data.Usuarios.length, 0);
});