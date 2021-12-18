import { gql } from 'apollo-server-express';

const tiposAvance = gql`

type Observacion {
  _id: ID!
  descripcion: String!
  tipo: String!
}

input crearObservacion {
  tipo: Enum_TipoObservacion!
  descripcion: String!
}

input camposObservacion {
    tipo: Enum_TipoObservacion!
    descripcion: String!
  }

  input camposAvance {
    fecha: Date
    preyecto: String
    descripcion: String
    creadoPor: String
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
    descripcion: String
    
  }

  type Query {
    Avances(filtro: FiltroAvances): [Avance]
    filtrarAvance(proyecto: String!): [Avance]
  }

  type Mutation {
    crearAvance(
      fecha: Date!,
      proyecto: String!,
      descripcion: String!,
      creadoPor: String!
      observacion:[crearObservacion],
    ): Avance

    editarAvance(
      _id: String!
      campos: camposAvance!
      # fecha: Date!
      # proyecto: String!
      # descripcion: String!
      # creadoPor: String!
    ):Avance
    
    eliminarAvance(
      _id: String,
      descripcion: String
    ):Avance

    crearObservacion(
      idProyecto: String!, 
      campos: camposObservacion!
      ): Avance
    
    editarObservacion(
      idProyecto: String!, 
      indexObservacion: Int!, 
      campos: camposObservacion!): Avance
    
    eliminarObservacion(
      idProyecto: String!, 
      idObservacion: String!
      ): Avance

  }
`;

export { tiposAvance };
