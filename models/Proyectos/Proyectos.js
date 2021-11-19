import mongoose from 'mongoose';
import { ObjetivosModel } from '../Objetivos/Objetivos.js';
import { UsuariosModel } from '../Usuarios/Usuarios.js';
const { Schema, model } = mongoose;


const proyectoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    presupuesto: {
      type: Number,
      required: true,
    },
    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      enum: ['Activo', 'Inactivo'],
      default: 'Inactivo',
    },
    fase: {
      type: String,
      enum: ['Iniciado', 'Desarrollo', 'Terminado', 'Nulo'],
      default: 'Nulo',
    },
    lider: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UsuariosModel,
    },
    objetivos: [
      {
        descripcion: {
          type: String,
          required: true,
        },
        tipo: {
          type: String,
          enum: ['General', 'Especifico'],
          required: true,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

proyectoSchema.virtual('avances', {
  ref: 'Avance',
  localField: '_id',
  foreignField: 'proyecto',
});

proyectoSchema.virtual('inscripciones', {
  ref: 'Inscripcion',
  localField: '_id',
  foreignField: 'proyecto',
});

const ProyectosModel = model('Proyectos', proyectoSchema);

export { ProyectosModel };
