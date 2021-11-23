import { gql } from 'apollo-server-express';

const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    proyecto: Proyecto!
    descripcion: String!
    observaciones: String!
    creadoPor: Usuario!
  }

  type Query {
    Avances: [Avance]
    filtrarAvance(idProyecto: String!): [Avance]
  }
  type Mutation {
    crearAvance(fecha: Date!, proyecto: String!, descripcion: String!, creadoPor: String!): Avance
  }
`;

export { tiposAvance };
