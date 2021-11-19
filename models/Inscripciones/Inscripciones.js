import mongoose from 'mongoose';
// import { Enum_EstadoInscripcion } from '../enums/enums.js';
import { ProyectosModel } from '../Proyectos/Proyectos.js';
import { UsuariosModel } from '../Usuarios/Usuarios.js';

const { Schema, model } = mongoose;

const inscripcionSchema = new Schema({
  estado: {
    type: String,
    enum: ['Aceptado', 'Rechazado', 'Pendiente'],
    default: 'Pendiente',
    required: true,
  },
  fechaIngreso: {
    type: Date,
    required: false,
  },
  fechaEgreso: {
    type: Date,
    required: false,
  },
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProyectosModel,
    required: true,
  },
  estudiante: {
    type: Schema.Types.ObjectId,
    ref: UsuariosModel,
    required: true,
  },
});

const InscripcionesModel = model('Inscripciones', inscripcionSchema);

export { InscripcionesModel };
