const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport"); // za zasticene (protected) rute

const Notifications = require("../models/Notifications");
const RepairmanProfile = require("../models/RepairmanProfile");
const Repairman = require("../models/Repairman");
const ZahtevPopravka = require("../models/ZahtevPopravka");
const UserProfile = require("../models/UserProfile");

// @route   GET api/notification/
// @desc    Korisnik prebacuje zahtev u istoriju zahteva
// @access  Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    RepairmanProfile.findOne({ repairman: req.user.id }) //da vidimo da li se poklapaju id usera
      .then(async (repairmanprofile) => {
        if (!repairmanprofile) {
          errors.repairmanprofile = "Neautorizovan pristup!";
          return res.status(401).json(errors);
        } else {
          const notifications = await Notifications.find({
            usernameMajstora: repairmanprofile.username,
            seen: false,
          }).sort({ dateCreated: 1 });

          return res.send(notifications);
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   PUT api/notification/seen
// @desc    Korisnik prebacuje zahtev u istoriju zahteva
// @access  Private

router.put(
  "/seen",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {

    RepairmanProfile.findOne({ repairman: req.user.id }) //da vidimo da li se poklapaju id usera
      .then(async (repairmanprofile) => {
        if (!repairmanprofile) {
          errors.repairmanprofile = "Neautorizovan pristup!";
          return res.status(401).json(errors);
        } else {
          const nId = req.body.id;
          const notification = await Notifications.findById(nId);
          if (notification.usernameMajstora !== repairmanprofile.username) {
            return res.status(401).send("Unauthorized!");
          } else {
            notification.seen = true;
            await notification.save();
            return res.send("success");
          }
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
