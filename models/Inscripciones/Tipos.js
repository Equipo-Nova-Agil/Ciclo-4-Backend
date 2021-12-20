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

  type Cuenta {
    total: Int
    pendientes: Int
    abiertas: Int
    cerradas: Int
  }

  input FiltroInscripciones {
    _id: ID
    proyecto: String
    estudiante: String
    estado: String
    
  }

  type Query {
    Inscripciones (filtro: FiltroInscripciones): [Inscripcion]
    InscripcionesPorProyecto(proyecto: String!): [Inscripcion]
    CountInscripcionesPorProyecto(proyecto: String!, estudiante: String!) : Cuenta
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