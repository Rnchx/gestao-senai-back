import jwt from 'jsonwebtoken';

const authConfig = process.env.JWT_SECRET

export const errorMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) 
    return res.status(401).send({ error: "O token não foi informado" })
  

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token errado' })

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token mal formatado' });

  jwt.verify(token, authConfig, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });

    req.searchAdministratorsId = decoded.id;

    return next();
})

}

export default errorMiddleware;
