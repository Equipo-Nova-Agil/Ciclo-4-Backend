import { ModeloAvances } from './Avances.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await ModeloAvances.find().populate('proyecto').populate('creadoPor');
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvances.find({ proyecto: args._id })
        .populate('proyecto')
        .populate('creadoPor');
      return avanceFiltrado;
    },
  },
  Mutation: {
    crearAvance: async (parents, args) => {
      const avanceCreado = ModeloAvances.create({
        fecha: args.fecha,
        proyecto: args.proyecto,
        descripcion: args.descripcion,
        // observaciones: args.observaciones,
        creadoPor: args.creadoPor,
      });
      return avanceCreado;
    },
    editarAvance: async (parents, args) => {
      const avanceEditado = await ModeloAvances.findByIdAndUpdate(
        args._id,
        {
          fecha: args.fecha,
          proyecto: args.proyecto,
          descripcion: args.descripcion,
          creadoPor: args.creadoPor,
        },
        { new: true}
      );
      return avanceEditado;
    },
    eliminarAvance: async (parents, args) => {
      if(Object.keys(args).includes('_id')){
        const avanceEliminado = await ModeloAvances.findOneAndDelete({ _id: args._id});
        return avanceEliminado;
      }else if(Object.keys(args).includes('descripcion')){
        const usuarioEliminado = await ModeloUsuarios.findOneAndDelete({descripcion: args.descripcion});
        return usuarioEliminado;
      }
    },
  },
};

export { resolversAvance };
