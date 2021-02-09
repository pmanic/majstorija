// U sustini ovde pravimo taj token koji saljemo frontendu kada korisnik pokusa da se uloguje
// i taj token ce da sadrzi neke informacije preko kojih mi proveravamo odredjene informacije 
// za korisnika. Znaci jwt token je taj koji se proverava sta se u njemu sadrzi - to je taj auth

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Repairman = mongoose.model('repairmans');
const Admin = mongoose.model('admins');
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => { //ovaj jwt_payload bi trebalo da sadrzi one stvari sto smo naveli za usera u users.js kad logujemo 
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) { //ovo znaci da je user pronadjen
                    return done(null, user);
                }
                else { //ako nije trazimo da li ima repairman
                    Repairman.findById(jwt_payload.id)
                        .then(user => {
                            if (user) { //ovo znaci da je repairman pronadjen
                                return done(null, user);
                            }
                            else { //ako nije trazimo da li ima admin
                                Admin.findById(jwt_payload.id)
                                    .then(user => {
                                        if (user) { //ovo znaci da je admin pronadjen
                                            return done(null, user);
                                        }
                                        else {
                                            return done(null, false);
                                        }
                                    })
                                    .catch(err => console.log(err));
                            }
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));

    }))
}