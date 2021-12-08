import { gql } from 'apollo-server-express';

const tiposInscripcion = gql`
  type Inscripcion {
    _id: ID!
    proyecto: Proyecto!
    estudiante: Usuario!
    fechaIngreso: Date
    fechaEgreso: Date
    estado: Enum_EstadoInscripcion!
  }

  type Query {
    Inscripciones: [Inscripcion]
    InscripcionesPorProyecto(proyecto: String!): [Inscripcion]
  }

  type Mutation {
    crearInscripcion(
      proyecto: String!
      estudiante: String!
      estado: Enum_EstadoInscripcion!
    ): Inscripcion

    aprobarInscripcion(id: String!): Inscripcion
    rechazarInscripcion(id: String!): Inscripcion
  }
`;

export { tiposInscripcion };