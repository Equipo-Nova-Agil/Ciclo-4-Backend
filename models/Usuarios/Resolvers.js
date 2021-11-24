import { ModeloUsuarios } from './Usuarios.js';

const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args) => {
      console.log('parent usuario', parent);
      const usuarios = await ModeloUsuarios.find().populate('inscripciones').populate('proyectos');
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await ModeloUsuarios.findOne({ _id: args._id });
      return usuario;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const usuarioCreado = await ModeloUsuarios.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
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
          rol: args.rol,
          estado: args.estado,
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
