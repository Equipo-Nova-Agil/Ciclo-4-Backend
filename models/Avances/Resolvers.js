import { ModeloAvances } from './Avances.js';
import {ModeloProyectos} from '../Proyectos/Proyectos.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args, context) => {
      // if (context.userData){
      //   if (context.userData.rol === 'ESTUDIANTE'){
      //     const avances = await ModeloAvances.find({ estudiante: context.userData._id }).populate('proyecto').populate('creadoPor');
      //     return avances;
      //   }
      //   else{
      //     if (context.userData.rol === 'LIDER'){
      //       const avances = await ModeloAvances.find({ lider: context.userData._id }).populate('proyecto').populate('creadoPor');
      //       return avances;
      //     }
      //     else{
      //       const avances = await ModeloAvances.find().populate('proyecto').populate('creadoPor');
      //       return avances;
      //     }
      //   }
      // }
      const avances = await ModeloAvances.find({...args.filtro}).populate('proyecto').populate('creadoPor');
            return avances;  
    },

    filtrarAvance: async (parents, args, context) => {
      const avanceFiltrado = await ModeloAvances.findOne({ _id: args._id })
      // ({ proyecto: args._id })
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
