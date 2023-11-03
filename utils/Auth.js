import jwt from 'jsonwebtoken';

const signToken = (user) => {
  return jwt.sign(user, "somethingsecretindeed", {
    expiresIn: '30d',
  });
};
console.log("I." + "signToken:" + signToken);

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // BEARER XXX
    jwt.verify(token, "somethingsecretindeed", (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not suppiled' });
  }
};
export { signToken, isAuth };