import { ModeloProyectos } from "./Proyectos.js";
import { ModeloUsuarios} from '../Usuarios/Usuarios.js';
import {ModeloInscripciones} from '../Inscripciones/Inscripciones.js';

const resolversProyecto = {

  Proyecto: {
    lider: async (parent, args, context) => {
      const user = await ModeloUsuarios.findOne({
        _id: parent.lider,
      });
      return user;
    },
    inscripciones: async (parent, args, context) => {
      const inscripciones = await ModeloInscripciones.find({
        proyecto: parent._id,
      });
      return inscripciones;
    },
  },

  Query: {
    Proyectos: async (parent, args, context) => {
      // if (context.userData){
      //   if (context.userData.rol === 'LIDER'){
      //     const proyectos = await ModeloProyectos.find({ lider: context.userData._id });
      //     return proyectos;
      //   }
      //   else{
      //     const proyectos = await ModeloProyectos.find()
      //     .populate("avances")
      //     .populate("inscripciones")
      //     .populate("lider");
      //   return proyectos;
      //   }
      // }
      const proyectos = await ModeloProyectos.find({...args.filtro})
      .populate("avances")
      .populate("inscripciones")
      .populate("lider");
    return proyectos; 
    },
    Proyecto: async (parent, args) => {
      const proyecto = await ModeloProyectos.findOne({ _id: args._id })
        .populate("avances")
        .populate("inscripciones")
        .populate("lider");
      return proyecto;
    },
  },

  Mutation: {
    crearProyecto: async (parent, args, context) => {
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
        { new: true }
      );
      return proyectoEditado;
    },

    eliminarProyecto: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const proyectoEliminado = await ModeloProyectos.findOneAndDelete({ _id: args._id });
        return proyectoEliminado;
      } else if (Object.keys(args).includes('nombre')) {
        const proyectoEliminado = await ModeloProyectos.findOneAndDelete({ correo: args.nombre });
        return proyectoEliminado;
      }
    },

    crearObjetivo: async (parent, args) => {
      const proyectoConObjetivo = await ModeloProyectos.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: { ...args.campos },
          },
        },
        { new: true }
      );

      return proyectoConObjetivo;
    },
    editarObjetivo: async (parent, args) => {
      const proyectoEditado = await ModeloProyectos.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
    },
    eliminarObjetivo: async (parent, args) => {
      const proyectoObjetivo = await ModeloProyectos.findByIdAndUpdate(
        { _id: args.idProyecto },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return proyectoObjetivo;
    },

  },

};

export { resolversProyecto };
