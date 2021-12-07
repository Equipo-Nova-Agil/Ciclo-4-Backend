import mongoose from 'mongoose';

const conectarBD = async () => {
  return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('Conexión Exitosa');
    })
    .catch((e) => {
      console.error('Error de Conexión', e);
    });
};

export default conectarBD;
