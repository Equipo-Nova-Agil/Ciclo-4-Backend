import mongoose from 'mongoose';
import { ProyectosModel } from '../Proyectos/Proyectos.js';
import { UsuariosModel } from '../Usuarios/Usuarios.js';

const { Schema, model } = mongoose;

const avanceSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  observaciones: [
    {
      type: String,
    },
  ],
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProyectosModel,
    required: true,
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: UsuariosModel,
    required: true,
  },
});

const AvancesModel = model('Avances', avanceSchema);

export { AvancesModel };
