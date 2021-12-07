import mongoose from 'mongoose';
import { ModeloProyectos } from '../Proyectos/Proyectos.js';
import { ModeloUsuarios } from '../Usuarios/Usuarios.js';

const { Schema, model } = mongoose;

const avanceSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ModeloProyectos,
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

  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: ModeloUsuarios,
    required: true,
  },
});

const ModeloAvances = model('Avances', avanceSchema);

export { ModeloAvances };
