import mongoose from 'mongoose';
import { ModeloProyectos } from '../Proyectos/Proyectos.js';
import { ModeloUsuarios } from '../Usuarios/Usuarios.js';

const { Schema, model } = mongoose;

const inscripcionSchema = new Schema({
  
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ModeloProyectos,
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
  
  estudiante: {
    type: Schema.Types.ObjectId,
    ref: ModeloUsuarios,
    required: true,
  },
  
  estado: {
    type: String,
    enum: ['ACEPTADO', 'RECHAZADO', 'PENDIENTE'],
    default: 'PENDIENTE',
    required: true,
  },
},
{
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);
inscripcionSchema.virtual('proyectos', {
  ref: 'Proyectos',
  localField: '_id',
  foreignField: 'inscripcion',
});

inscripcionSchema.virtual('usuarios', {
  ref: 'Usuarios',
  localField: '_id',
  foreignField: 'inscripcion',
});


const ModeloInscripciones = model('Inscripciones', inscripcionSchema);

export { ModeloInscripciones };
