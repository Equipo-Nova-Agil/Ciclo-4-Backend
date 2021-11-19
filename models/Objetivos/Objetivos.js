import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const objetivoSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['General', 'Especifico'],
    required: true,
  },
});

const ObjetivosModel = model('Objetivos', objetivoSchema);

export { ObjetivosModel };
