import { gql } from 'apollo-server-express';

const tiposAutenticacion = gql`
  type Token {
    token: String
    error: String
  }

  type Mutation {
    registro(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
      password: String!
    ):Token!

    login(correo: String!, password: String!): Token

    cambiarPassword(_id: String!, passwordActual: String!, passwordNuevo: String!): Token

    resetPassword(correo: String!): Token

    refreshToken: Token
  }
`;

export { tiposAutenticacion };
