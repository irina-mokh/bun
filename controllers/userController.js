import { ApiError } from '../error/apiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from'../db/models.js';

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {

          return next(ApiError.badRequest('Wrong email or password'));
        }
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('User already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword});
        const token = generateJwt(user.id, user.email);
        return res.json({
            token: token, 
            user: user,
        })
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('No user found'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Wrong password'));
        }
        const token = generateJwt(user.id, user.email)
        return res.json({
            token: token, 
            user: user,
        })
    }

    async check(req, res, next) {
      const {id} = req.query;
      if (!id) {
        return next(ApiError.badRequest('ID is required'));
      }
      res.json(id);
      const token = generateJwt(req.user.id, req.user.email);
      return res.json({token});
    }
}

export const userController = new UserController();