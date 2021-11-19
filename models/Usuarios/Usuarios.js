import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const usuarioSchema = new Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      
      message: 'Formato de Correo Electrónico Incorrecto.',
    },
  },
  documento: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: ['Estudiante', 'Lider', 'Administrador'],
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Autorizado', 'No_Autorizado'],
    default: 'Pendiente',
  },
});

const UsuariosModel = model('Usuarios', usuarioSchema);

export { UsuariosModel };
