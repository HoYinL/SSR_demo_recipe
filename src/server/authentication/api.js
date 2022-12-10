import Express from "express";
import passport from "passport";
import passportJwt, { ExtractJwt } from "passport-jwt"
import passportLocal from "passport-local"
import User from "../../common/models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import config from "../config";

dotenv.config();

const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJwt.Strategy

const app = Express();
app.set("superSecret", process.env.SECRET);

const checkPassword = (user, password) => 
    bcrypt.compare(password, user.password)
        .then(result => {
            return result ? Promise.resolve(user) : Promise.resolve(result)
        })



passport.use('login', new LocalStrategy(
    (username, password, done) => {

    User.findOne({
        email: username
      }, function(err, user){
        if(err){
            done(err, false)
        }

        if(!user){
            ('ali')
            done(null, 'username')
        } else {
            checkPassword(user, password)
                .then((message) => {
                    (message)
                    message == false? done(null, 'password'): done(null, user);
                })
        }
    })
}))

passport.use('jwt', new JWTStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: app.get('superSecret')
    }, 
    (jwtPayload, done) => {
        User.findById(jwtPayload._id, function(err, user){
            if(err){
                done(err)
            }

            done(null, jwtPayload)
        })
    }
))

export const signJWT = (req, res) => {
    if(req.user){
        const user = req.user;

        if(req.user == 'password'){
            res.send({success: false, type: 'password', message: 'Authorization failed. Wrong password'})
        } else if(req.user == 'username'){
            res.send({success: false, type: 'username', message: 'Authorization failed. Non-exist Email'})
        } else {
            const token_payload = {
                username: user.username,
                email: user.email,
                id: user._id,
                isAdmin: user.admin,
            }

            const token = jwt.sign({token_payload}, app.get('superSecret'), {expiresIn: 60 * 1})

            const refresh_token = jwt.sign({token_payload}, app.get('superSecret'), {
                expiresIn: 60 * 60 * 24 // expires in 24 hours
            });
      
            res/*.cookie('refresh_token', refresh_token, { maxAge: 60 * 60 * 24 } )*/.send({
                success: true,
                user,
                refresh_token,
                token: 'Bearer ' + token,
            });
        }
        return 
    } 
}
