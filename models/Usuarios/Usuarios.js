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

  password: {
    type: String,
    required: true,
  },

  estado: {
    type: String,
    enum: ['PENDIENTE', 'AUTORIZADO', 'NO_AUTORIZADO'],
    default: 'PENDIENTE',
  },
},
  {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);
usuarioSchema.virtual('avancesCreados',{
  ref:'Avances', 
  localField: '_id',
  foreignField: 'creadoPor'
});
usuarioSchema.virtual('inscripciones', {
  ref: 'Inscripciones',
  localField: '_id',
  foreignField: 'estudiante',
});

usuarioSchema.virtual('proyectosLiderados', {
  ref: 'Proyectos',
  localField: '_id',
  foreignField: 'lider',
});
const ModeloUsuarios = model('Usuarios', usuarioSchema);

export { ModeloUsuarios };
