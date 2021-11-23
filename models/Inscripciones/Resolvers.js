import { ModeloInscripciones } from './Inscripciones.js';

const resolverInscripciones = {
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await ModeloInscripciones.find();
      return inscripciones;
    },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await ModeloInscripciones.create({
        proyecto: args.proyecto,
        estudiante: args.estudiante,
        estado: args.estado,
      });
      return inscripcionCreada;
    },
    aprobarInscripcion: async (parent, args) => {
      const inscripcionAprobada = await ModeloInscripciones.findByIdAndUpdate(
        args.id,
        {
          fechaIngreso: Date.now(),
          estado: 'ACEPTADO',
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
  },
};

export { resolverInscripciones };
