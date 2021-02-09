const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport'); // za zasticene (protected) rute

const RepairmanProfile = require('../models/RepairmanProfile');
const ZahtevKategorija = require('../models/ZahtevKategorija');
const Kategorije = require('../models/Kategorije');
const validateZahtevInput = require('../../validation/zahtevPopravka');

// -------------------------------------------------------------MAJSTOR----------------------------------------------------------------- //

// @route   POST api/zahtevkategorija
// @desc    Salje zahtev za novu kategoriju
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    // const { errors, isValid } = validateZahtevInput(req.body);
    // if (!isValid) {
    //     return res.status(400).json(errors); //ovo nam vraca greske ukoliko postoje
    // }

    RepairmanProfile.findOne({ repairman: req.user.id })
        .then((repairmanprofile) => {
            if (!repairmanprofile) {
                console.log(req.params.repairmanhandle);
                errors.noprofile = 'Ne postoji profil za ovog majstora!';
                return res.status(404).json(errors);
            }
            else {
                const zahtev = new ZahtevKategorija({
                    repairman: repairmanprofile.repairman,
                    repairmanUsername: repairmanprofile.username,
                    categoryTitle: req.body.params.categoryTitle
                });
                zahtev
                    .save()
                    .then((zahtev) => res.json(zahtev))
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => res.status(404).json(err));
});

// -------------------------------------------------------------ADMIN----------------------------------------------------------------- //

// @route   GET api/zahtevkategorija/allsent
// @desc    Vraca sve zahteve koji nisu prihvaceni/odbijeni
// @access  Private
router.get('/allsent', passport.authenticate('jwt', { session: false }), (req, res) => {

    ZahtevKategorija.find({ accepted: "false", declined: "false" })
        .then((zahtevi) => {
            if (!zahtevi) {
                return res.status(404).json("Nema zahteva");
            }
            res.json(zahtevi);
        })
        .catch((err) => res.status(404).json({ repairmanprofile: 'Ne postoji ni jedan zahtev' }));

});

// @route   POST api/zahtevkategorija/accept/:zahtevid
// @desc    Admin prihvata zahtev
// @access  Private
router.post('/accept/:zahtevid', passport.authenticate('jwt', { session: false }), (req, res) => {

    ZahtevKategorija.findOneAndUpdate({ _id: req.params.zahtevid }, { $set: { accepted: true } })
        .then((zahtev) => {
            RepairmanProfile.findOneAndUpdate(
                { repairman: zahtev.repairman },
                { $set: { category: zahtev.categoryTitle } },
                { overwrite: true }
            )
                .then(repairmanprofile => res.json(repairmanprofile));

            console.log(typeof (zahtev.categoryTitle), zahtev.categoryTitle)

            const newCategory = new Kategorije({
                categoryTitle: zahtev.categoryTitle
            })
            newCategory
                .save()
                //.then((newCategory) => res.json(newCategory))
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

});

// @route   POST api/zahtevkategorija/decline/:zahtevid
// @desc    Majstor prihvata zahtev
// @access  Private
router.post('/decline/:zahtevid', passport.authenticate('jwt', { session: false }), (req, res) => {

    ZahtevKategorija.findOneAndUpdate(
        { _id: req.params.zahtevid },
        { $set: { declined: true } }
    )
        .then((zahtev) => res.json(zahtev))
        .catch((err) => console.log(err));

});

// -------------------------------------------------------------KATEGORIJE----------------------------------------------------------------- //

// @route   GET api/zahtevkategorija/allcategories
// @desc    Vraca sve postojece kategorije za majstore
// @access  Public
router.get('/allcategories', (req, res) => {

    Kategorije.find({})
        .then((kategorije) => {
            if (!kategorije) {
                return res.status(404).json("Nema zahteva");
            }
            res.json(kategorije);
        })
        .catch((err) => res.status(404).json({ repairmanprofile: 'Ne postoji ni jedan zahtev' }));

});

module.exports = router;