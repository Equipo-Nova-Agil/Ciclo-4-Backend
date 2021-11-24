import jwt from 'jsonwebtoken';

const generarToken = (payload) =>{
    return jwt.sign(payload, 'secret', {
        expiresIn: '12h',
      });
    };
    export { generarToken };
