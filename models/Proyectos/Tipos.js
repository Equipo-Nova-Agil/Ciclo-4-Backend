import { gql } from 'apollo-server-express';

const tiposProyecto = gql`

  type Objetivo {
    _id: ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  input crearObjetivo {
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }
  
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
  }
`;

export { tiposProyecto };
