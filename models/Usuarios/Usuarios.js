import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const usuarioSchema = new Schema({

  nombre: {
    type: String,
    required: true,
  },

  apellido: {
    type: String,
    required: true,
  },

  identificacion: {
    type: String,
    required: true,
    unique: true,
  },

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
  
  rol: {
    type: String,
    required: true,
    enum: ['ESTUDIANTE', 'LIDER', 'ADMINISTRADOR'],
  },
  estado: {
    type: String,
    enum: ['PENDIENTE', 'AUTORIZADO', 'NO_AUTORIZADO'],
    default: 'PENDIENTE',
  },
});

const ModeloUsuarios = model('Usuarios', usuarioSchema);

export { ModeloUsuarios };
