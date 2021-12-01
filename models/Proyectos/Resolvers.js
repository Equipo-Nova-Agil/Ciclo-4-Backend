import { ModeloProyectos } from './Proyectos.js';

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await ModeloProyectos.find().populate('avances').populate('inscripciones').populate('lider');
      return proyectos;
    },
  },
  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ModeloProyectos.create({
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },

    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ModeloProyectos.findByIdAndUpdate(
        args._id,
        { 
          nombre: args.nombre,
          estado: args.estado,
          fase: args.fase,
          fechaInicio: args.fechaInicio,
          fechaFin: args.fechaFin,
          presupuesto: args.presupuesto,
          lider: args.lider,
          objetivos: args.objetivos,
        },
        { new: true}
      );
      return proyectoEditado;
    }
  },
};

export { resolversProyecto };
