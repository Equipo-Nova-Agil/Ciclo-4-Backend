import { ModeloProyectos } from './Proyectos.js';

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await ModeloProyectos.find().populate('avances').populate('inscripciones');
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
        objetivosGenerales: args.objetivosGenerales,
        objetivosEspecificos: args.objetivosEspecificos,
      });
      return proyectoCreado;
    },
  },
};

export { resolversProyecto };
