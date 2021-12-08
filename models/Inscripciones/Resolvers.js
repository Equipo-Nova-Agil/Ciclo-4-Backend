import { ModeloInscripciones } from './Inscripciones.js';
import {ModeloUsuarios} from '../Usuarios/Usuarios.js';
import {ModeloProyectos} from '../Proyectos/Proyectos.js';

const resolverInscripciones = {

  Inscripcion: {
    proyecto: async (parent, args, context) => {
      return await ModeloProyectos.findOne({ _id: parent.proyecto });
    },
    estudiante: async (parent, args, context) => {
      return await ModeloUsuarios.findOne({ _id: parent.estudiante });
    },
  },
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await ModeloInscripciones.find().populate('proyecto').populate('estudiante');
      return inscripciones;
    },
    InscripcionesPorProyecto: async (parent, args) => {
      const inscripcionesPorProyecto = await ModeloInscripciones.find({ proyecto: args.proyecto }).populate('proyecto').populate('estudiante');
      return inscripcionesPorProyecto;
    },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await ModeloInscripciones.create({
        proyecto: args.proyecto,
        estudiante: args.estudiante,
        fechaIngreso: args.fechaIngreso,
        fechaEgreso: args.fechaEgreso,
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
    // MUTACIÓN HECHA POR ESTIWAR ------------------------
    rechazarInscripcion: async (parent, args) => {
      const inscripcionRechazada = await ModeloInscripciones.findByIdAndUpdate(
        args.id,
        {
          fechaIngreso: Date.now(),
          estado: 'RECHAZADO',
        },
        { new: true }
      );
      return inscripcionRechazada;
    },
    // -----------------------------------------------------------
  },
};

export { resolverInscripciones };




// import { ModeloInscripciones } from './Inscripciones.js';

// const resolverInscripciones = {
//   Query: {
//     Inscripciones: async (parent, args) => {
//       const inscripciones = await ModeloInscripciones.find().populate('proyecto').populate('estudiante');
//       return inscripciones;
//     },
//   },
//   Mutation: {
//     crearInscripcion: async (parent, args) => {
//       const inscripcionCreada = await ModeloInscripciones.create({
//         proyecto: args.proyecto,
//         estudiante: args.estudiante,
//         fechaIngreso: args.fechaIngreso,
//         fechaEgreso: args.fechaEgreso,
//         estado: args.estado,
//       });
//       return inscripcionCreada;
//     },
//     aprobarInscripcion: async (parent, args) => {
//       const inscripcionAprobada = await ModeloInscripciones.findByIdAndUpdate(
//         args.id,
//         {
//           fechaIngreso: Date.now(),
//           estado: 'ACEPTADO',
//         },
//         { new: true }
//       );
//       return inscripcionAprobada;
//     },
    
//   },
// };

// export { resolverInscripciones };
