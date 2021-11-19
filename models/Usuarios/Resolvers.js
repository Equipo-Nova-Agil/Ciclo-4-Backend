import { UsuariosModel } from './Usuarios.js';

const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args) => {
      console.log('parent usuario', parent);
      const usuarios = await UsuariosModel.find();
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await UsuariosModel.findOne({ _id: args._id });
      return usuario;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const usuarioCreado = await UsuariosModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        documento: args.documento,
        correo: args.correo,
        rol: args.rol,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UsuariosModel.findByIdAndUpdate(args._id, {
        nombre: args.nombre,
        apellido: args.apellido,
        documento: args.documento,
        correo: args.correo,
        rol: args.rol,
        estado: args.estado,
      });

      return usuarioEditado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UsuariosModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await UsuariosModel.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };
