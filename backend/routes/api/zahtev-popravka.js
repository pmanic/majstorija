const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport"); // za zasticene (protected) rute

const RepairmanProfile = require("../models/RepairmanProfile");
const Repairman = require("../models/Repairman");
const UserProfile = require("../models/UserProfile");
const ZahtevPopravka = require("../models/ZahtevPopravka");
const Notifications = require("../models/Notifications");
const validateZahtevInput = require("../../validation/zahtevPopravka");
const validateOcenaInput = require("../../validation/ocena");

// -------------------------------------------------------------MAJSTOR----------------------------------------------------------------- //

// @route   POST api/zahtevpopravka/accept/:zahtevid
// @desc    Majstor prihvata zahtev
// @access  Private
router.post(
  "/accept/:zahtevid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOne({ repairman: req.user.id }) //da vidimo da li se poklapaju id usera
      .then((repairmanprofile) => {
        if (!repairmanprofile) {
          errors.repairmanprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.findOneAndUpdate(
            { _id: req.params.zahtevid },
            {
              $set: {
                accepted: true,
                messageRepairman: req.body.messageRepairman,
              },
            }
          )
            .then((zahtev) => res.json(zahtev))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST api/zahtevpopravka/decline/:zahtevid
// @desc    Majstor odbija zahtev
// @access  Private
router.post(
  "/decline/:zahtevid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOne({ repairman: req.user.id }) //da vidimo da li se poklapaju id usera
      .then((repairmanprofile) => {
        if (!repairmanprofile) {
          errors.repairmanprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.findOneAndUpdate(
            { _id: req.params.zahtevid },
            {
              $set: {
                declined: true,
                messageRepairman: req.body.messageRepairman,
              },
            },
            { new: true }
          )
            .then((zahtev) => res.json(zahtev))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/zahtevpopravka/archivedforrepairman
// @desc    Vraca sve zavrsene zahteve za prijavljenog majstora
// @access  Private
router.get(
  "/allforrepairman",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOne({ repairman: req.user.id }) //da vidimo da li se poklapaju id repairmana
      .then((repairmanprofile) => {
        if (!repairmanprofile) {
          errors.repairmanprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.find({
            repairman: repairmanprofile.repairman,
            archived: "false",
            accepted: "false",
            declined: "false",
          })
            .then((zahtevi) => {
              if (!zahtevi) {
                errors.repairmanprofile = "Ne postoji ni jedan profil!";
                return res.status(404).json(errors);
              }
              res.json(zahtevi);
            })
            .catch((err) =>
              res
                .status(404)
                .json({ repairmanprofile: "Ne postoji ni jedan profil!" })
            );
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/zahtevpopravka/allacceptedforuser
// @desc    Vraca sve prihvacene zahteve za prijavljenog korisnika
// @access  Private
router.get(
  "/allacceptedforrepairman",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOne({ repairman: req.user.id }) //da vidimo da li se poklapaju id repairmana
      .then((repairmanprofile) => {
        if (!repairmanprofile) {
          errors.repairmanprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.find({
            repairman: repairmanprofile.repairman,
            archived: "false",
            accepted: "true",
            declined: "false",
          })
            .then((zahtevi) => {
              if (!zahtevi) {
                errors.repairmanprofile = "Ne postoji ni jedan profil!";
                return res.status(404).json(errors);
              }
              res.json(zahtevi);
            })
            .catch((err) =>
              res
                .status(404)
                .json({ repairmanprofile: "Ne postoji ni jedan profil!" })
            );
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/zahtevpopravka/allaccepted
// @desc    Vraca sve prihvacene zahteve za prijavljenog korisnika
// @access  Private
router.get(
  "/allarchivedforrepairman",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOne({ repairman: req.user.id }) //da vidimo da li se poklapaju id repairmana
      .then((repairmanprofile) => {
        if (!repairmanprofile) {
          errors.repairmanprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.find({
            repairman: repairmanprofile.repairman,
            archived: "true",
          })
            .then((zahtevi) => {
              if (!zahtevi) {
                errors.repairmanprofile = "Ne postoji ni jedan profil!";
                return res.status(404).json(errors);
              }
              res.json(zahtevi);
            })
            .catch((err) =>
              res
                .status(404)
                .json({ repairmanprofile: "Ne postoji ni jedan profil!" })
            );
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/zahtevpopravka/allaccepted
// @desc    Vraca sve prihvacene zahteve za prijavljenog korisnika
// @access  Private
router.get(
  "/allratedforrepairman",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RepairmanProfile.findOne({ repairman: req.user.id }) //da vidimo da li se poklapaju id repairmana
      .then((repairmanprofile) => {
        if (!repairmanprofile) {
          errors.repairmanprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.find({
            repairman: repairmanprofile.repairman,
            archived: "true",
            rateRepairman: "true",
          })
            .then((zahtevi) => {
              if (!zahtevi) {
                errors.repairmanprofile = "Ne postoji ni jedan profil!";
                return res.status(404).json(errors);
              }
              res.json(zahtevi);
            })
            .catch((err) =>
              res
                .status(404)
                .json({ repairmanprofile: "Ne postoji ni jedan profil!" })
            );
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// -------------------------------------------------------------KORISNIK----------------------------------------------------------------- //

// @route   POST api/zahtevpopravka
// @desc    Salje zahtev repairmanu
// @access  Private
router.post(
  "/:repairmanhandle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("ASD");
    const { errors, isValid } = validateZahtevInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors); //ovo nam vraca greske ukoliko postoje
    }

    UserProfile.findOne({ user: req.user.id }) //da vidimo da li se poklapaju id usera
      .then((userprofile) => {
        if (!userprofile) {
          console.log("NE POSTOJI korisnik");
          errors.noprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          RepairmanProfile.findOne({ username: req.params.repairmanhandle })
            .then((repairmanprofile) => {
              if (!repairmanprofile) {
                console.log(req.params.repairmanhandle);
                errors.noprofile = "Ne postoji profil za ovog majstora!";
                return res.status(404).json(errors);
              } else {
                const zahtev = new ZahtevPopravka({
                  user: userprofile.user,
                  repairman: repairmanprofile.repairman,
                  repairmanUsername: repairmanprofile.username,
                  userUsername: userprofile.username,
                  messageUser: req.body.userMessage,
                  scheduledDate: req.body.scheduledDate,
                  scheduledFrom: req.body.scheduledFrom,
                  scheduledTo: req.body.scheduledTo,
                  sent: true,
                });

                const notifikacija = new Notifications({
                  usernameMajstora: repairmanprofile.username,
                  usernameKorisnika: userprofile.username,
                  poruka: req.body.userMessage,
                  imeKorisnika: userprofile.name,
                  prezimeKorisnika: userprofile.surname,
                });
                notifikacija
                  .save()
                  .then((noti) => console.log(noti))
                  .catch((err) => console.log(err));

                zahtev
                  .save()
                  .then((zahtev) => res.json(zahtev))
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => {
              console.log("ne prnadje repman");
              res.status(404).json(err);
            });
        }
      })
      .catch((err) => {
        console.log("ne pronadje profil");
        res.status(404).json(err);
      });
  }
);

// @route   POST api/zahtevpopravka/archive/:zahtevid
// @desc    Korisnik prebacuje zahtev u istoriju zahteva
// @access  Private
router.post(
  "/archive/:zahtevid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ZahtevPopravka.findOneAndUpdate(
      { _id: req.params.zahtevid },
      { $set: { archived: true } }
    )
      .then((zahtev) => res.json(zahtev))
      .catch((err) => console.log(err));
  }
);

// @route   POST api/zahtevpopravka/oceni/:zahtevid
// @desc    Korisnik ocenjuje majstora (preko arhiviranog zahteva)
// @access  Private
router.post(
  "/oceni/:zahtevid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOcenaInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    ZahtevPopravka.findById({ _id: req.params.zahtevid })
      .then((zahtev) => {
        if (!zahtev) {
          errors.zahtev = "Ne postoji ovakav zahtev!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.findOneAndUpdate(
            {
              _id: req.params.zahtevid,
              archived: "true", rateRepairman: "false",
            },
            { $set: { rate: req.body.rate, rateRepairman: true } }
          )
            .then((zahtev) => {
              if (!zahtev) {
                errors.zahtev = "Nije moguce oceniti majstora za ovaj zahtev!";
                return res.status(404).json(errors);
              } else {
                RepairmanProfile.findOne({ repairman: zahtev.repairman }).then(
                  (repairmanprofile) => {
                    repairmanprofile.ratesSum =
                      repairmanprofile.ratesSum + parseInt(req.body.rate);
                    repairmanprofile.jobsRatedCount =
                      repairmanprofile.jobsRatedCount + 1;
                    if (repairmanprofile.rating === 0) {
                      repairmanprofile.rating = parseInt(req.body.rate);
                    } else {
                      repairmanprofile.rating =
                        (repairmanprofile.ratesSum /
                        repairmanprofile.jobsRatedCount).toFixed(1);
                    }
                    repairmanprofile
                      .save()
                      .then((repairmanprofile) => res.json(repairmanprofile));
                  }
                );

                Repairman.findOne({ _id: zahtev.repairman }).then((majstor) => {
                  majstor.ratesSum = majstor.ratesSum + parseInt(req.body.rate);
                  majstor.jobsRatedCount = majstor.jobsRatedCount + 1;
                  if (majstor.rating === 0) {
                    majstor.rating = parseInt(req.body.rate);
                  } else {
                    majstor.rating = (majstor.ratesSum / majstor.jobsRatedCount).toFixed(1);
                  }
                  majstor.save();
                });
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/zahtevpopravka/allforuser
// @desc    Vraca sve zahteve za prijavljenog korisnika
// @access  Private
router.get(
  "/allforuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserProfile.findOne({ user: req.user.id }) //da vidimo da li se poklapaju id usera
      .then((userprofile) => {
        if (!userprofile) {
          errors.userprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.find({ user: userprofile.user })
            .then((zahtevi) => {
              if (!zahtevi) {
                errors.noprofile = "Ne postoji ni jedan profil!";
                return res.status(404).json(errors);
              }
              res.json(zahtevi);
            })
            .catch((err) =>
              res.status(404).json({ profile: "Ne postoji ni jedan profil!" })
            );
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/zahtevpopravka/allacceptedforuser
// @desc    Vraca sve prihvacene zahteve za prijavljenog korisnika
// @access  Private
router.get(
  "/allacceptedforuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserProfile.findOne({ user: req.user.id }) //da vidimo da li se poklapaju id usera
      .then((userprofile) => {
        if (!userprofile) {
          errors.userprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.find({
            user: userprofile.user,
            accepted: "true",
            declined: "false",
            archived: "false",
          })
            .then((zahtevi) => {
              if (!zahtevi) {
                errors.noprofile = "Ne postoji ni jedan zahtev!";
                return res.status(404).json(errors);
              }
              res.json(zahtevi);
            })
            .catch((err) =>
              res.status(404).json({ profile: "Ne postoji ni jedan profil!" })
            );
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/zahtevpopravka/alldeclinedforuser
// @desc    Vraca sve odbijene zahteve za prijavljenog korisnika
// @access  Private
router.get(
  "/alldeclinedforuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserProfile.findOne({ user: req.user.id }) //da vidimo da li se poklapaju id usera
      .then((userprofile) => {
        if (!userprofile) {
          errors.userprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.find({
            user: userprofile.user,
            declined: "true",
            archived: "false",
          })
            .then((zahtevi) => {
              if (!zahtevi) {
                errors.noprofile = "Ne postoji ni jedan zahtev!";
                return res.status(404).json(errors);
              }
              res.json(zahtevi);
            })
            .catch((err) =>
              res.status(404).json({ profile: "Ne postoji ni jedan profil!" })
            );
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/zahtevpopravka/allacceptedforuser
// @desc    Vraca sve arhivirane zahteve za prijavljenog korisnika
// @access  Private
router.get(
  "/allarchivedforuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserProfile.findOne({ user: req.user.id }) //da vidimo da li se poklapaju id usera
      .then((userprofile) => {
        if (!userprofile) {
          errors.userprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.find({ user: userprofile.user, archived: "true" })
            .then((zahtevi) => {
              if (!zahtevi) {
                errors.noprofile = "Ne postoji ni jedan zahtev!";
                return res.status(404).json(errors);
              }
              res.json(zahtevi);
            })
            .catch((err) =>
              res.status(404).json({ profile: "Ne postoji ni jedan profil!" })
            );
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/zahtevpopravka/allacceptedforuser
// @desc    Vraca sve arhivirane zahteve za prijavljenog korisnika
// @access  Private
router.get(
  "/allsentforuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserProfile.findOne({ user: req.user.id }) //da vidimo da li se poklapaju id usera
      .then((userprofile) => {
        if (!userprofile) {
          errors.userprofile = "Ne postoji profil za ovog korisnika!";
          return res.status(404).json(errors);
        } else {
          ZahtevPopravka.find({
            user: userprofile.user,
            sent: "true",
            archived: "false",
            accepted: "false",
            declined: "false",
          })
            .then((zahtevi) => {
              if (!zahtevi) {
                errors.noprofile = "Ne postoji ni jedan zahtev!";
                return res.status(404).json(errors);
              }
              res.json(zahtevi);
            })
            .catch((err) =>
              res.status(404).json({ profile: "Ne postoji ni jedan profil!" })
            );
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// -------------------------------------------------------------ADMIN----------------------------------------------------------------- //

// @route   GET api/zahtevpopravka/all
// @desc    Da adminu vrati sve zahteve
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ZahtevPopravka.find()
      .then((zahtevi) => {
        res.json(zahtevi);
      })
      .catch((err) =>
        res
          .status(404)
          .json({ repairmanprofile: "Ne postoji ni jedan profil!" })
      );
  }
);

// @route   POST api/zahtevpopravka/:zahtevid
// @desc    Brisanje zahteva popravke preko id-a
// @access  Private
router.delete(
  "/delete/:zahtevid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ZahtevPopravka.findOneAndRemove({ _id: req.params.zahtevid }).then(() =>
      res.json({ success: true })
    );
  }
);

module.exports = router;
