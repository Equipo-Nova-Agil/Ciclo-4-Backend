import { ModeloUsuarios } from './Usuarios.js';
import {ModeloInscripciones} from '../Inscripciones/Inscripciones.js';
import bcrypt from 'bcrypt';

const resolversUsuario = {
  Usuario: {
    inscripciones: async (parent, args, context) => {
      return InscriptionModel.find({ estudiante: parent._id });
    },
  },
  
  Query: {
    Usuarios: async (parent, args, context) => {
      console.log(args);
      const usuarios = await ModeloUsuarios.find({ ...args.filtro }).populate([
              {
                path: 'inscripciones',
                populate: {
                  path: 'proyecto',
                  populate: [{ path: 'lider' }, { path: 'avances' }],
                },
              },
              {
                path: 'proyectosLiderados',
              },
            ]);
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await ModeloUsuarios.findOne({ _id: args._id }).populate([
            {
              path: 'inscripciones',
              populate: {
                path: 'proyecto',
                populate: [{ path: 'lider' }, { path: 'avances' }],
              },
            },
            {
              path: 'proyectosLiderados',
            },
          ]).exec();
      return usuario;
    },
  },
  Usuario: {
    inscripciones: async (parent, args, context) => {
      return ModeloInscripciones.find({ estudiante: parent._id });
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await ModeloUsuarios.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await ModeloUsuarios.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          estado: args.estado,
          rol: args.rol,
        },
        { new: true }
      );

      return usuarioEditado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await ModeloUsuarios.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await ModeloUsuarios.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };
