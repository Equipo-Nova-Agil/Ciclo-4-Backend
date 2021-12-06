import { ModeloUsuarios } from '../../models/Usuarios/Usuarios.js';
import bcrypt from 'bcrypt';
import { generarToken} from '../../utils/tokenUtils.js';

const resolversAutenticacion = {
  Mutation: {
    registro: async (parent, args) => {
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
      console.log('Usuario Creado', usuarioCreado);

      return {
        token: generarToken({
           _id: usuarioCreado._id,
           nombre: usuarioCreado.nombre,
           apellido: usuarioCreado.apellido,
           identificacion: usuarioCreado.identificacion,
           correo: usuarioCreado.correo,
           rol: usuarioCreado.rol,
           estado: usuarioCreado.estado,
          }),
        };
      },
  

    login: async (parent, args) => {
      const usuarioEcontrado = await ModeloUsuarios.findOne({ correo: args.correo });
      console.log('Usuario Encontrado', usuarioEcontrado);
      if (await bcrypt.compare(args.password, usuarioEcontrado.password)) {
        return {
          token: generarToken({
            _id: usuarioEcontrado._id,
            nombre: usuarioEcontrado.nombre,
            apellido: usuarioEcontrado.apellido,
            identificacion: usuarioEcontrado.identificacion,
            correo: usuarioEcontrado.correo,
            rol: usuarioEcontrado.rol,
            estado: usuarioEcontrado.estado,
          }), 
        };
      }
      else{
        return{
          error: 'Token Invalido',
        }
      }
    },
  

    refreshToken: async (parent, args, context) => {
      console.log('Contexto', context);
      if (!context.userData) {
        return {
          error: 'Token Invalido',
        };
      } else {
        return {
          token: generarToken({
            _id: context.userData._id,
            nombre: context.userData.nombre,
            apellido: context.userData.apellido,
            identificacion: context.userData.identificacion,
            correo: context.userData.correo,
            rol: context.userData.rol,
            estado: context.userData.estado,
          }),
        };
      }
       // valdiar que el contexto tenga info del usuario. si si, refrescar el token
       // si no devolver null para que en el front redirija al login.
    },
  },
};

export { resolversAutenticacion };
