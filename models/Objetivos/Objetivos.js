import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const objetivoSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['GENERAL', 'ESPECIFICO'],
    required: true,
  },
});

const ModeloObjetivos = model('Objetivos', objetivoSchema);

export { ModeloObjetivos };
