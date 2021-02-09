const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');   // za zasticene (protected) rute

const UserProfile = require('../models/UserProfile');
const User = require('../models/User');
const validateUpdateInput = require('../../validation/updateUser');

// status 200 u postmenu znaci da je sve ok

// @route   GET api/userprofile
// @desc    Prikazuje profil trenutnog usera
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    UserProfile.findOne({ user: req.user.id }) //da vidimo da li se poklapaju id usera
        .then(userprofile => {
            if (!userprofile) {
                errors.noprofile = 'Ne postoji profil za ovog korisnika!'
                return res.status(404).json(errors);
            }
            res.json(userprofile);
        })
        .catch(err => res.status(404).json(err));

});

// @route   GET api/userprofile/handle/:handle  - ovako samo za BE, iz FE se poziva api/profile/handle
// @desc    Prikazuje profil usera preko handle-a
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    UserProfile.findOne({ handle: req.params.handle })    //u bazi trazi handle preko zadate rute /handle/:handle
        .then(userprofile => {
            if (!userprofile) {
                errors.noprofile = 'Ne postoji profil za ovog korisnika!';
                res.status(404).json(errors);
            }
            res.json(userprofile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/userprofile/user/:user_id
// @desc    Prikazuje profil usera preko user "id-a"
// @access  Public
router.get('/user/:user', (req, res) => {
    const errors = {};

    UserProfile.findOne({ user: req.params.user })
        .then(userprofile => {
            if (!userprofile) {
                errors.noprofile = 'Ne postoji profil za ovog korisnika!';
                res.status(404).json(errors);
            }
            res.json(userprofile);
        })
        .catch(err => res.status(404).json({ profile: 'Ne postoji profil za ovog korisnika!' }));
});

//@route    POST api/users/editprofile
//@desc     Azurira profil usera
//@access   Private
router.post('/editprofile', passport.authenticate('jwt', { session: false }), (req, res) => {
    /*const { errors, isValid } = validateUpdateInput(req.body);

    //Check Validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }*/

    const profileFields = {}; //objekat gde cemo da smestamo sve iz modela
    profileFields.user = req.user.id; //ovo je logovani user //proveravamo da li je poslato iz forme, ako jeste postavljamo ga na profileFields
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.adress) profileFields.adress = req.body.adress;
    if (req.body.number) profileFields.number = req.body.number;
    
    // Hesiramo password pre ubacivanja u bazu
    if (req.body.password)
    { 
        profileFields.password = req.body.password;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(profileFields.password, salt, (err, hash) => {
                if (err) throw err;
                profileFields.password = hash;
            });
        });
    }

    UserProfile.findOne({ user: req.user.id })
        .then(userprofile => {
            if (userprofile) {
                //update it with hash
                userprofile
                    .save()
                    .catch(err => console.log(err));

                //Update profile
                UserProfile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                    .then(userprofile => res.json(userprofile))
                    .catch(err => console.log(err));


            }
            else {
                return res.status(400).json("Profile not found");
            }
        });

    User.findOne({ username: req.user.username }) //proveravamo da li u bazi vec postoji user sa istim username-om
        .then(user => {
            if (user) {
                user
                    .save()
                    //.then(user => res.json(user))
                    .catch(err => console.log(err));

                //Update profile
                User.findOneAndUpdate(
                    { username: req.user.username },
                    { $set: profileFields },
                    { new: true }
                )
                    //.then(user => res.json(user))
                    .catch(err => console.log(err));
            }
        });
});

// @route   GET api/userprofile/all
// @desc    Prikazuje sve profile
// @access  Public
router.get('/all', (req, res) => {

    UserProfile.find()
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'Ne postoji ni jedan profil!';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({ profile: 'Ne postoji ni jedan profil!' })
        );
});

//@route    DELETE api/userprofile
//@desc     Brise profil i user
//@access   Private
router.delete('/deleteuser', passport.authenticate('jwt', { session: false }), (req, res) => {
    UserProfile.findOneAndRemove({ user: req.user.id })
        .then(() => {   // prazna () zato sto kada radimo ovakvo brisanje ne treba nista da nam vraca
            User.findOneAndRemove({ _id: req.user.id })
                .then(() => res.json({ success: true }));
        })
});

//@route    DELETE api/userprofile/:user
//@desc     Brise profil i user preko id-a
//@access   Private
router.delete('/deleteuser/:user', passport.authenticate('jwt', { session: false }), (req, res) => {
    UserProfile.findOneAndRemove({ user: req.params.user })
        .then(() => {   // prazna () zato sto kada radimo ovakvo brisanje ne treba nista da nam vraca
            User.findOneAndRemove({ _id: req.params.user })
                .then(() => res.json({ success: true }));
        })
});


module.exports = router;