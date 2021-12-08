import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const objetivoSchema = new Schema({
  tipo: {
    type: String,
    enum: ['GENERAL', 'ESPECIFICO'],
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  
});

const ModeloObjetivos = model('Objetivos', objetivoSchema);

export { ModeloObjetivos };
