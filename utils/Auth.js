import jwt from 'jsonwebtoken';
const tokenValue = "somethingsecretindeed";

const signToken = (user) => {
  return jwt.sign(user, tokenValue, {
    expiresIn: '3500s',
  });
};
console.log("I." + "signToken:" + signToken());

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // BEARER XXX
    jwt.verify(token, tokenValue, (err, decode) => {
      if (err) {
        console.error("error in the token is: " + err);
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    console.log(1 + "There is no authorization");
    res.status(401).send({ message: 'Token is not suppiled' });
  }
};
export { signToken, isAuth };