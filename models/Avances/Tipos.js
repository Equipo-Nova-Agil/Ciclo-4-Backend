import { gql } from 'apollo-server-express';

const tiposAvance = gql`

type Observacion {
  descripcion: String!
}

input crearObservacion {
  descripcion: String!
  tipo: Enum_TipoObjetivo!
}

type Avance {
    _id: ID!
    fecha: Date!
    proyecto: Proyecto!
    descripcion: String!
    observaciones: [Observacion]
    creadoPor: Usuario!
  }

  input FiltroAvances {
    _id: ID
    fecha: Date
    proyecto: String
    creadoPor: String
    
  }

  type Query {
    Avances(filtro: FiltroAvances): [Avance]
    filtrarAvance(_id: String!): Avance
  }

  # type Query {
  #   Avances: [Avance]
  #   # filtrarAvance(proyecto: String!): [Avance]
  #   filtrarAvance(_id: String!): Avance
  # }

  
  type Mutation {
    crearAvance(
      fecha: Date!,
      proyecto: String!,
      descripcion: String!,
      observacion:[crearObservacion],
      creadoPor: String!
    ): Avance

    editarAvance(
      _id: String!
      fecha: Date!
      proyecto: String!
      descripcion: String!
      creadoPor: String!
    ):Avance
    
    eliminarAvance(
      _id: String!
      # , descripcion: String!
    ):Avance

  }
`;

export { tiposAvance };
