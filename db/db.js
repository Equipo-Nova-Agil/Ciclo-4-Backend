import mongoose from 'mongoose';

const conectarBD = async () => {
  return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('Conexion Exitosa a la BD');
    })
    .catch((e) => {
      console.error('Error Conectando a la BD', e);
    });
};

export default conectarBD;
