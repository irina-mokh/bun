import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
    if (!token) {
      return res.status(401).json({message: "Not logged id"})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({message: "Not logged id"})
  }
};