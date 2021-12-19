import { ModeloUsuarios } from "../../models/Usuarios/Usuarios.js";
import bcrypt from "bcrypt";
import { generarToken } from "../../utils/tokenUtils.js";

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
      console.log("Usuario Creado", usuarioCreado);

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

    //REALIZADA POR DUHAN
    cambiarPassword: async (parent, args) => {
      const usuarioEncontrado = await ModeloUsuarios.findById({ _id: args._id });
      console.log("Estamos en cambiar password, Usuario Encontrado", usuarioEncontrado);
      if (usuarioEncontrado) {
        //si se encontro informacion, verificar password actual
        if (
          await bcrypt.compare(args.passwordActual, usuarioEncontrado.password)
        ) {
          const salt = await bcrypt.genSalt(10);
          const hashedPasswordNuevo = await bcrypt.hash(args.passwordNuevo, salt);
          //verificar password nuevo contenga almenos un dato, aqui deberia existir una regla de contraseñas
          if (args.passwordNuevo.length >= 1) {
            //realizar la actualizacion
            const passwordEditado = await ModeloUsuarios.findByIdAndUpdate(
                  args._id,
                  {
                    password: hashedPasswordNuevo,
                  },
                  { new: true }
                );
            console.log("password nuevo (", args.passwordNuevo, ") = ",hashedPasswordNuevo," ==> ",passwordEditado);    
            return {
              token: generarToken({
                _id: usuarioEncontrado._id,
                nombre: usuarioEncontrado.nombre,
                apellido: usuarioEncontrado.apellido,
                identificacion: usuarioEncontrado.identificacion,
                correo: usuarioEncontrado.correo,
                rol: usuarioEncontrado.rol,
                estado: usuarioEncontrado.estado,
              }),
            };
          } else {
            return {
              token: null,
              error: "Contraseña nueva no cumple con las espcificaciones de creación.",
            };
          }
        }
        //password no coincide
        else {
          return {
            token: null,
            error: "Token Invalido",
          };
        }
      }
      //no se encontro usuario
      else {
        return {
          token: null,
          error: "Usuario o contraseña no coinciden",
        };
      }
    },
    //---------------------------------------------------------------------------------

    //REALIZADA POR DUHAN
    resetPassword: async (parent, args) => {
      const usuarioEncontrado = await ModeloUsuarios.findOne({ correo: args.correo });
      console.log("Estamos en reset password, Usuario Encontrado", usuarioEncontrado);
      if (usuarioEncontrado) {
        //si se encontro informacion, generar password
        const  generateRandomString = (num) => {
          const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let result1= Math.random().toString(36).substring(0,num);       
          return result1;
        }
        const laClave=generateRandomString(7);
          const salt = await bcrypt.genSalt(10);
          const hashedPasswordReset = await bcrypt.hash(laClave, salt);
          //verificar password reset, aquí deberia existir una regla de contraseñas
          if (laClave.length >= 5) {
            //realizar la actualizacion
            const passwordReset = await ModeloUsuarios.findByIdAndUpdate(
                  usuarioEncontrado._id,
                  {
                    password: hashedPasswordReset,
                  },
                  { new: true }
                );
            console.log("Password nuevo ",laClave," ==> ",passwordReset);    
            return {
              token: generarToken({
                // _id: usuarioEncontrado._id,
                // nombre: usuarioEncontrado.nombre,
                // apellido: usuarioEncontrado.apellido,
                // identificacion: usuarioEncontrado.identificacion,
                // correo: usuarioEncontrado.correo,
                // rol: usuarioEncontrado.rol,
                lares: laClave,
              }),
            };
          } else {
            return {
              token: null,
              error: "Contraseña no se pudo reset.",
            };
          }
      }
      //no se encontro usuario
      else {
        return {
          token: null,
          error: "Usuario no encontrado",
        };
      }
    },
    //---------------------------------------------------------------------------------

    login: async (parent, args) => {
      const usuarioEcontrado = await ModeloUsuarios.findOne({
        correo: args.correo,
      });
      console.log("Usuario Encontrado", usuarioEcontrado);
      //se encontro informacion
      if (usuarioEcontrado) {
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
        } else {
          return {
            token: null,
            error: "Token Invalido",
          };
        }
      } else {
        return {
          token: null,
          error: "Usuario o contraseña errada",
        };
      }
    },

    refreshToken: async (parent, args, context) => {
      console.log("Contexto", context);
      if (!context.userData) {
        return {
          error: "Token Invalido",
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
