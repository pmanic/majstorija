const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport"); // za zasticene (protected) rute

const RepairmanProfile = require("../models/RepairmanProfile");
const Repairman = require("../models/Repairman");
const validateUpdateInput = require("../../validation/updateRepairman");
const validateExperienceUpdateInput = require("../../validation/updateRepairmanExperience");
const validateEducationUpdateInput = require("../../validation/updateRepairmanEducation");

// status 200 u postmenu znaci da je sve ok

// @route   GET api/repairmanprofile
// @desc    Prikazuje profil trenutnog repairmana
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    RepairmanProfile.findOne({ repairman: req.user.id }) //da vidimo da li se poklapaju id repairmana
      .then((repairmanprofile) => {
        if (!repairmanprofile) {
          errors.noprofile = "Ne postoji profil za ovog majstora!";
          return res.status(404).json(errors);
        }
        res.json(repairmanprofile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/repairmanprofile/handle/:handle  - ovako samo za BE, iz FE se poziva api/repairmanprofile/handle
// @desc    Prikazuje profil repairmana preko handle-a
// @access  Public
router.get("/handle/:handle", (req, res) => {
  RepairmanProfile.findOne({ handle: req.params.handle })
    .then((repairmanprofile) => {
      if (!repairmanprofile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(repairmanprofile);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   GET api/repairmanprofile/repairman/:repairman_id
// @desc    Prikazuje profil repairmana preko repairman "id-a"
// @access  Public
router.get("/repairman/:repairman", (req, res) => {
  const errors = {};

  RepairmanProfile.findOne({ repairman: req.params.repairman })
    .then((repairmanprofile) => {
      if (!repairmanprofile) {
        errors.noprofile = "Ne postoji profil za ovog korisnika!";
        res.status(404).json(errors);
      }
      res.json(repairmanprofile);
    })
    .catch((err) =>
      res
        .status(404)
        .json({ repairmanprofile: "Ne postoji profil za ovog korisnika!" })
    );
});

// @route   GET api/repairmanprofile/all
// @desc    Prikazuje sve profile
// @access  Public
router.get("/all", (req, res) => {
  RepairmanProfile.find()
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "Ne postoji ni jedan profil!";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) =>
      res.status(404).json({ profile: "Ne postoji ni jedan profil!" })
    );
});

// @route   GET api/repairmanprofile/all
// @desc    Prikazuje sve profile
// @access  Public
router.get("/allonduty", (req, res) => {
  RepairmanProfile.find({ onduty: "true" })
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "Ne postoji ni jedan profil!";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) =>
      res.status(404).json({ profile: "Ne postoji ni jedan profil!" })
    );
});

//@route    POST api/repairmanprofile/editprofile/changeduty
//@desc     Menja duznost majstora
//@access   Private
router.post(
  "/editprofile/changeduty/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOne({ handle: req.params.handle }) //da vidimo da li se poklapaju id usera
      .then((repairmanprofile) => {
        if (!repairmanprofile) {
          errors.repairmanprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          if (repairmanprofile.onduty === true) {
            RepairmanProfile.findOneAndUpdate(
              { repairman: req.user.id },
              { $set: { onduty: false } },
              { new: true }
            )
              .then((repairmanprofile) => res.json(repairmanprofile))
              .catch((err) => console.log(err));
          } else if (repairmanprofile.onduty === false) {
            RepairmanProfile.findOneAndUpdate(
              { repairman: req.user.id },
              { $set: { onduty: true } },
              { new: true }
            )
              .then((repairmanprofile) => res.json(repairmanprofile))
              .catch((err) => console.log(err));
          }
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

//@route    POST api/repairmanprofile/editprofile
//@desc     Azurira profil repairmana
//@access   Private
router.post(
  "/editprofile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateUpdateInput(req.body);

    //Check Validation
    /*if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }*/

    const profileFields = {}; //objekat gde cemo da smestamo sve iz modela
    profileFields.repairman = req.user.id; //ovo je logovani repairman
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.adress) profileFields.adress = req.body.adress;
    if (req.body.number) profileFields.number = req.body.number;
    if (req.body.hourbill) profileFields.hourbill = req.body.hourbill;
    if (req.body.category) profileFields.category = req.body.category;

    // Hesiramo password pre ubacivanja u bazu
    if (req.body.password) {
      profileFields.password = req.body.password;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(profileFields.password, salt, (err, hash) => {
          if (err) throw err;
          profileFields.password = hash;
        });
      });
    }

    RepairmanProfile.findOne({ repairman: req.user.id }).then(
      (repairmanprofile) => {
        if (repairmanprofile) {
          //Update profile
          RepairmanProfile.findOneAndUpdate(
            { repairman: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then((repairmanprofile) => res.json(repairmanprofile));
        } else {
          return res.status(400).json("Profile not found");
        }
      }
    );

    Repairman.findOne({ username: req.user.username }) //proveravamo da li u bazi vec postoji repairman sa istim username-om
      .then((repairman) => {
        if (repairman) {
          repairman
            .save()
            //.then(user => res.json(repairman))
            .catch((err) => console.log(err));

          //Update profile
          Repairman.findOneAndUpdate(
            { username: req.user.username },
            { $set: profileFields },
            { new: true }
          )
            //.then(user => res.json(user))
            .catch((err) => console.log(err));
        }
      });
  }
);

//@route    POST api/repairmanprofile/editprofile/education
//@desc     Azurira education repairmana
//@access   Private
router.post(
  "/editprofile/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationUpdateInput(req.body);

    //Check Validation
    if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
    }

    let newEducation = {};

    RepairmanProfile.findOne({ repairman: req.user.id }).then(
      (repairmanprofile) => {
        if (repairmanprofile) {
          //dodajem education
          if (req.body.school) {
            newEducation = {
              school: req.body.school,
              degree: req.body.degree,
              from: req.body.from,
              to: req.body.to,
              current: req.body.current,
              description: req.body.description,
            };
            //Add to education array
            repairmanprofile.education.unshift(newEducation);
          }
          repairmanprofile.save().catch((err) => console.log(err));

          //Update profile
          RepairmanProfile.findOneAndUpdate(
            { repairman: req.user.id },
            { $set: newEducation },
            { new: true }
          ).then((repairmanprofile) => res.json(repairmanprofile));
        } else {
          return res.status(400).json("Profile not found");
        }
      }
    );
  }
);

//@route    POST api/repairmanprofile/editprofile/experience
//@desc     Azurira experience repairmana
//@access   Private
router.post(
  "/editprofile/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceUpdateInput(req.body);

    //Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    let newExperience = {};

    RepairmanProfile.findOne({ repairman: req.user.id }).then(
      (repairmanprofile) => {
        if (repairmanprofile) {
          //dodajem experience
          if (req.body.position) {
            newExperience = {
              position: req.body.position,
              company: req.body.company,
              years: req.body.years,
              currentJob: req.body.currentJob,
              descriptionJob: req.body.descriptionJob,
            };
            //Add to experience array
            repairmanprofile.experience.unshift(newExperience);
          }
          repairmanprofile.save().catch((err) => console.log(err));

          //Update profile
          RepairmanProfile.findOneAndUpdate(
            { repairman: req.user.id },
            { $set: newExperience },
            { new: true }
          ).then((repairmanprofile) => res.json(repairmanprofile));
        } else {
          return res.status(400).json("Profile not found");
        }
      }
    );
  }
);

//@route    DELETE api/repairmanprofile/education/:education_id  //mora /education/:education_id da ne bi obrisao prvi id koji se poklapa sa zahtevanim
//@desc     Brise objekat sa ID-jem education_id iz niza objekata education
//@access   Private
router.delete(
  "/education/:education_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOne({ repairman: req.user.id })
      .then((repairmanprofile) => {
        //Get remove index
        const removeIndex = repairmanprofile.education //pristup edukaciji
          .map((item) => item.id)
          .indexOf(req.params.education_id);

        //Splice out of array
        repairmanprofile.education.splice(removeIndex, 1);

        // Save
        repairmanprofile.save().then((profile) => res.json(repairmanprofile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

//@route    DELETE api/repairmanprofile/experience/:experience_id
//@desc     Brise objekat sa ID-jem experience_id iz niza objekata experience
//@access   Private
router.delete(
  "/experience/:experience_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOne({ repairman: req.user.id })
      .then((repairmanprofile) => {
        //Get remove index
        const removeIndex = repairmanprofile.experience //pristup iskustvu
          .map((item) => item.id)
          .indexOf(req.params.experience_id);

        //Splice out of array
        repairmanprofile.experience.splice(removeIndex, 1);

        // Save
        repairmanprofile.save().then((profile) => res.json(repairmanprofile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

//@route    DELETE api/repairmanprofile
//@desc     Brise profil i repairman
//@access   Private
router.delete(
  "/deleterepairman",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOneAndRemove({ repairman: req.user.id }).then(() => {
      // prazna () zato sto kada radimo ovakvo brisanje ne treba nista da nam vraca
      Repairman.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

//@route    DELETE api/repairmanprofile/deleterepairman/:repairman
//@desc     Brise profil i repairman preko id-a
//@access   Private
router.delete(
  "/deleterepairman/:repairman",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOneAndRemove({ repairman: req.params.repairman }).then(
      () => {
        // prazna () zato sto kada radimo ovakvo brisanje ne treba nista da nam vraca
        Repairman.findOneAndRemove({ _id: req.params.repairman }).then(() =>
          res.json({ success: true })
        );
      }
    );
  }
);

// @route    GET api/repairmanprofile/search - PERA
// @desc     Search for a repairman
// @access   Private
router.post(
  "/search",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { search, category, city, rating } = req.body;

    console.log(req.body);

    if (!search) search = "";
    if (!category) category = "";
    if (!city) city = "";
    if (!rating) rating = "";

    //Korisnik moze da trazi po username,imenu, prezimenu i kategoriji
    //Ako se ne unese polje, ono se ignorise
    const searchReg = new RegExp(search);
    const categoryReg = new RegExp(category);
    const cityReg = new RegExp(city);

    if (searchReg.toString().indexOf(" ") > 0) {
      const firstWord = new RegExp(
        searchReg
          .toString()
          .substr(0, searchReg.toString().indexOf(" "))
          .replace("/", "")
      );
      const secoundWord = new RegExp(
        searchReg
          .toString()
          .substr(searchReg.toString().indexOf(" ") + 1)
          .replace("/", "")
      );

      const result = await RepairmanProfile.find({
        name: firstWord,
        surname: secoundWord,
        onduty: "true",
      });
      res.json(result);
    } else {
      const results = await RepairmanProfile.find(
        {
          $or: [
            { username: searchReg },
            { name: searchReg },
            { surname: searchReg },
            { onduty: "true" },
          ],
          category: categoryReg,
          city: cityReg,
          rating: { $gte: Number(rating) },
        },
        { password: 0 }
      ).sort({ rating: -1 });
      res.json(results);
    }
  }
);

//@route    GET api/repairmanprofile/search
//@desc     Search for a repairman
//@access   Private

//NE PIPAJ FUNKCIJU

// router.get('/search', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     let { name, surname, category, city, rating } = req.query.search;
//     if (!name) name = "";
//     if (!surname) surname = "";
//     if (!category) category = "";
//     if (!city) city = "";
//     if (!rating) rating = 0;

//     //Korisnik moze da trazi po imenu, prezimenu i kategoriji
//     //Ako se ne unese neko polje, ono se ignorise u query-ju
//     const nameReg = new RegExp(`.*${name}.*`);
//     const surnameReg = new RegExp(`.*${surname}.*`);
//     const categoryReg = new RegExp(`.*${category}.*`);
//     const cityReg = new RegExp(`.*${city}.*`);

//     const results = await RepairmanProfile.find({ name: nameReg, surname: surnameReg, category: categoryReg, city: cityReg, rating: { $gte: Number(rating) } },
//         { password: 0 }).sort({ rating: -1 });
//     res.json(results);
// })

module.exports = router;
