import jwt from 'jsonwebtoken';

const validarToken = (token) => {
  if (token) {
    const verification = jwt.verify(token, 'secret', (err, data) => {
      if (data) {
        return {
          data: data,
        };
      }
      if (err) {
        return {
          error: err,
        };
      }
    });
    console.log(verification, token);
    return verification;
  }
};

const generarToken = (payload) =>{
    return jwt.sign(payload, 'secret', 
    {expiresIn: '12h'}
      );
    };


export { generarToken, validarToken };
// export { generarToken};
