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
    observaciones: [crearObservacion]
  }

type Avance {
    _id: ID!
    fecha: Date!
    proyecto: Proyecto!
    descripcion: String!
    creadoPor: Usuario!
    observaciones: [Observacion]
    # proyectos: [Proyecto]
    inscripciones: [Inscripcion]
  }

  input FiltroAvances {
    _id: ID
    fecha: Date
    proyecto: String
    creadoPor: String
    
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
      observaciones:[crearObservacion],
    ): Avance

    editarAvance(
      _id: String!
      campos: camposAvance!
    ):Avance
    
    eliminarAvance(
      _id: String!
      # , descripcion: String!
    ):Avance

    crearObservacion(
      idAvance: String!, 
      campos: camposObservacion!
      ): Avance
    
    editarObservacion(
      idAvance: String!, 
      indexObservacion: Int!, 
      campos: camposObservacion!): Avance
    
    eliminarObservacion(
      idAvance: String!, 
      idObservacion: String!
      ): Avance

  }
`;

export { tiposAvance };
