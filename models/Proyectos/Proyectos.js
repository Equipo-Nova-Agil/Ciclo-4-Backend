import mongoose from 'mongoose';
import { ModeloUsuarios } from '../Usuarios/Usuarios.js';
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
      enum: ['ACTIVO', 'INACTIVO'],
      default: 'INACTIVO',
    },

    fase: {
      type: String,
      enum: ['INICIADO', 'DESARROLLO', 'TERMINADO', 'NULO'],
      default: 'NULO',
    },

    lider: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModeloUsuarios,
    },

    objetivos: [
       {
        tipo: {
          type: String,
          enum: ['GENERAL', 'ESPECIFICO'],
          required: true,
        },
        descripcion: {
           type: String,
           required: true,
         },
         
       },
     ],
  },
  {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);

proyectoSchema.virtual('avances', {
  ref: 'Avances',
  localField: '_id',
  foreignField: 'proyecto',
});

proyectoSchema.virtual('inscripciones', {
  ref: 'Inscripciones',
  localField: '_id',
  foreignField: 'proyecto',
});



const ModeloProyectos = model('Proyectos', proyectoSchema);

export { ModeloProyectos };
