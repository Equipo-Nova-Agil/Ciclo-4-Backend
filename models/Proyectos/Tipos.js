import { gql } from 'apollo-server-express';

const tiposProyecto = gql`

  type Objetivo {
    _id: ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  input crearObjetivo {
    tipo: Enum_TipoObjetivo!
    descripcion: String!
  }

  # input camposObjetivo {
  #   tipo: Enum_TipoObjetivo!
  #   descripcion: String!
  # }

  # input camposProyecto {
  #   nombre: String
  #   presupuesto: Float
  #   fechaInicio: Date
  #   fechaFin: Date
  #   lider: String
  #   fase: Enum_FaseProyecto
  #   estado: Enum_EstadoProyecto
  # }
  
  type Proyecto {
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
    lider: Usuario!
    objetivos: [Objetivo]
    avances: [Avance]
    inscripciones: [Inscripcion]
    
  }

  type Query {
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
  }

  type Mutation {
    crearProyecto(
      nombre: String!
      fechaInicio: Date!
      fechaFin: Date!
      objetivos: [crearObjetivo]
      lider: String!
      presupuesto: Float!
      fase: Enum_FaseProyecto!
      estado: Enum_EstadoProyecto! 
    ): Proyecto

    editarProyecto(
      _id: String!
      nombre: String!
      fechaInicio: Date!
      fechaFin: Date!
      objetivos: [crearObjetivo]
      lider: String!
      presupuesto: Float!
      fase: Enum_FaseProyecto!
      estado: Enum_EstadoProyecto! 
    ): Proyecto

    eliminarProyecto(_id: String, nombre: String): Proyecto

  }
`;

export { tiposProyecto };
