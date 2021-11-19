import { gql } from 'apollo-server-express';

const tiposEnums = gql`
  enum Enum_EstadoUsuario {
    Pendiente
    Autorizado
    No_Autorizado
  }

  enum Enum_Rol {
    Estudiante
    Lider
    Administrador
  }

  enum Enum_EstadoProyecto {
    Activo
    Inactivo
  }

  enum Enum_FaseProyecto {
    Iniciado
    Desarrollo
    Terminado
    Nulo
  }

  enum Enum_TipoObjetivo {
    General
    Especifico
  }

  enum Enum_EstadoInscripcion {
    Aceptado
    Rechazado
    Pendiente
  }
`;

export { tiposEnums };
