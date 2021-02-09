const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../models/User");
const Admin = require("../models/Admin");
const Repairman = require("../models/Repairman");
const UserProfile = require("../models/UserProfile");
const RepairmanProfile = require("../models/RepairmanProfile");

const validateRegisterInput = require("../../validation/registerUser");
const validateRegisterRepairmanInput = require("../../validation/registerRepairman");
const validateLoginInput = require("../../validation/login");
const validateUpdateInput = require("../../validation/updateUser");

// @route   POST api/users/register
// @desc    Registracija usera
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body); //validatoru prosledjujemo bukvalno sve ovo dole iz req.body
  if (!isValid) {
    return res.status(400).json(errors); //ovo nam vraca greske ukoliko postoje
  }

  User.findOne({ username: req.body.username }) //proveravamo da li u bazi vec postoji user sa istim username-om
    .then((user) => {
      if (user) {
        errors.username = "Korisnicko ime je zauzeto!";
        return res.status(400).json(errors); //ako postoji bacamo error 400
      } else {
        const newUser = new User({
          // ako ne kreiramo novog i uzimamo req.body, ovde ce kasnije da se vuce iz forme sa frontenda, ovo za postman
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          surname: req.body.surname,
          city: req.body.city,
          adress: req.body.adress,
          number: req.body.number,
          gender: req.body.gender,
          role: req.body.role,
        });

        const newUserProfile = new UserProfile({
          user: newUser.id,
          username: newUser.username,
          name: newUser.name,
          surname: newUser.surname,
          city: newUser.city,
          adress: newUser.adress,
          number: newUser.number,
          gender: newUser.gender,
          handle: newUser.username,
          role: newUser.role,
        });

        // Hesiramo password pre ubacivanja u bazu
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
            newUserProfile.save().catch((err) => console.log(err));
          });
        });
      }
    });
  res.send("success");
});

// // @route   POST api/users/login
// // @desc    Logovanje usera / vracanje Tokena
// // @access  Public
// router.post("/login", (req, res) => {
//   const { errors, isValid } = validateLoginInput(req.body); //validatoru prosledjujemo bukvalno sve ovo dole iz req.body
//   if (!isValid) {
//     return res.status(400).json(errors); //ovo nam vraca greske ukoliko postoje
//   }

//   const username = req.body.username;
//   const password = req.body.password;

//   //Trazimo usera preko username-a odozgo iz const username
//   User.findOne({ username }).then((user) => {
//     //Proveravamo za usera
//     if (!user) {
//       errors.username = "Korisnicko ime ne postoji!";
//       return res.status(404).json(errors);
//     }
//     //ako smo nasli usera idemo dalje
//     //proveravamo sifru odozgo iz const password
//     //sa bcrypt uporedjujemo
//     bcrypt.compare(password, user.password).then((isMatch) => {
//       if (isMatch) {
//         //User Matched
//         //payload je ono sto hocemo da smestimo u token kad saljemo na front
//         const payload = {
//           id: user.id,
//           username: user.username,
//           role: user.role,
//           gender: user.gender,
//         };
//         //Sign Token
//         //Nakon jednog sata (3600s) key se odbacuje i token istice
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           { expiresIn: 3600 },
//           (err, token) => {
//             res.json({
//               //ovde saljemo token
//               success: true,
//               token: "Bearer " + token,
//               role: user.role,
//               gender: user.gender,
//             });
//           }
//         );
//       } else {
//         errors.password = "Neispravna lozinka!";
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });

// @route   POST api/users/registeradmin
// @desc    Registracija admina
// @access  Public
router.post("/registeradmin", (req, res) => {
  Admin.findOne({ username: req.body.username }) //proveravamo da li u bazi vec postoji admin sa istim username-om
    .then((admin) => {
      if (admin) {
        errors.username = "Korisnicko ime je zauzeto!";
        return res.status(400).json(errors); //ako postoji bacamo error 400
      } else {
        const newAdmin = new Admin({
          // ako ne kreiramo novog i uzimamo req.body, ovde ce kasnije da se vuce iz forme sa frontenda, ovo za postman
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });

        const newProfile = new Profile({
          user: newAdmin.id,
        });

        // Hesiramo password pre ubacivanja u bazu
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then((admin) => res.json(admin))
              .catch((err) => console.log(err));
            newProfile.save().then((newProfile) => res.json(newProfile));
          });
        });
      }
    });
  res.send("success");
});

// // @route   POST api/users/loginadmin
// // @desc    Logovanje admina / vracanje Tokena
// // @access  Public
// router.post("/loginadmin", (req, res) => {
//   const { errors, isValid } = validateLoginInput(req.body); //validatoru prosledjujemo bukvalno sve ovo dole iz req.body
//   if (!isValid) {
//     return res.status(400).json(errors); //ovo nam vraca greske ukoliko postoje
//   }

//   const username = req.body.username;
//   const password = req.body.password;

//   //Trazimo usera preko username-a odozgo iz const username
//   Admin.findOne({ username }).then((admin) => {
//     //Proveravamo za usera
//     if (!admin) {
//       errors.username = "Korisnicko ime ne postoji!";
//       return res.status(404).json(errors);
//     }
//     //ako smo nasli usera idemo dalje
//     //proveravamo sifru odozgo iz const password
//     //sa bcrypt uporedjujemo
//     bcrypt.compare(password, admin.password).then((isMatch) => {
//       if (isMatch) {
//         //User Matched
//         //payload je ono sto hocemo da smestimo u token kad saljemo na front
//         const payload = {
//           id: admin.id,
//           username: admin.username,
//           role: admin.role,
//         };
//         //Sign Token
//         //Nakon jednog sata (3600s) key se odbacuje i token istice
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           { expiresIn: 3600 },
//           (err, token) => {
//             res.json({
//               //ovde saljemo token
//               success: true,
//               token: "Bearer " + token,
//               role: admin.role,
//             });
//           }
//         );
//       } else {
//         errors.password = "Neispravna lozinka!";
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });

// @route   POST api/users/registerrepairman
// @desc    Registracija majstora
// @access  Public
router.post("/registerrepairman", (req, res) => {
  const { errors, isValid } = validateRegisterRepairmanInput(req.body); //validatoru prosledjujemo bukvalno sve ovo dole iz req.body
  if (!isValid) {
    return res.status(400).json(errors); //ovo nam vraca greske ukoliko postoje
  }

  Repairman.findOne({ username: req.body.username }) //proveravamo da li u bazi vec postoji repairman sa istim username-om
    .then((repairman) => {
      if (repairman) {
        errors.username = "Korisnicko ime je zauzeto!";
        return res.status(400).json(errors); //ako postoji bacamo error 400
      } else {
        const newRepairman = new Repairman({
          // ako ne kreiramo novog i uzimamo req.body, ovde ce kasnije da se vuce iz forme sa frontenda, ovo za postman
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          surname: req.body.surname,
          category: req.body.category,
          hourbill: req.body.hourbill,
          city: req.body.city,
          adress: req.body.adress,
          number: req.body.number,
          gender: req.body.gender,
          role: req.body.role,
        });

        const newRepairmanProfile = new RepairmanProfile({
          repairman: newRepairman.id,
          username: newRepairman.username,
          name: newRepairman.name,
          surname: newRepairman.surname,
          hourbill: newRepairman.hourbill,
          city: newRepairman.city,
          category: newRepairman.category,
          adress: newRepairman.adress,
          number: newRepairman.number,
          gender: newRepairman.gender,
          handle: newRepairman.username,
          role: newRepairman.role,
        });

        // Hesiramo password pre ubacivanja u bazu
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newRepairman.password, salt, (err, hash) => {
            if (err) throw err;
            newRepairman.password = hash;
            newRepairmanProfile.password = hash;
            newRepairman
              .save()
              //.then((repairman) => res.json(repairman))
              .catch((err) => console.log(err));
            newRepairmanProfile.save().catch((err) => console.log(err));
          });
        });
      }
    });
  res.send("success");
});

// // @route   POST api/users/loginrepairman
// // @desc    Logovanje majstora / vracanje Tokena
// // @access  Public
// router.post("/loginrepairman", (req, res) => {
//   const { errors, isValid } = validateLoginInput(req.body); //validatoru prosledjujemo bukvalno sve ovo dole iz req.body
//   if (!isValid) {
//     return res.status(400).json(errors); //ovo nam vraca greske ukoliko postoje
//   }

//   const username = req.body.username;
//   const password = req.body.password;

//   //Trazimo usera preko username-a odozgo iz const username
//   Repairman.findOne({ username }).then((repairman) => {
//     //Proveravamo za usera
//     if (!repairman) {
//       errors.username = "Korisnicko ime ne postoji!";
//       return res.status(404).json(errors);
//     }
//     //ako smo nasli usera idemo dalje
//     //proveravamo sifru odozgo iz const password
//     //sa bcrypt uporedjujemo
//     bcrypt.compare(password, repairman.password).then((isMatch) => {
//       if (isMatch) {
//         //User Matched
//         //payload je ono sto hocemo da smestimo u token kad saljemo na front
//         const payload = {
//           id: repairman.id,
//           username: repairman.username,
//           role: repairman.role,
//           gender: repairman.gender,
//         };
//         //Sign Token
//         //Nakon jednog sata (3600s) key se odbacuje i token istice
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           { expiresIn: 3600 },
//           (err, token) => {
//             res.json({
//               //ovde saljemo token
//               success: true,
//               token: "Bearer " + token,
//               role: repairman.role,
//               gender: repairman.gender,
//             });
//           }
//         );
//       } else {
//         errors.password = "Neispravna lozinka!";
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });

const signToken = async (payload) => {
  let toSend = { success: true, role: payload.role };
  if (payload.gender) toSend.gender = payload.gender;
  const token = await jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });

  return token;
};
// @route   POST api/users/login
// @desc    Login
// @access  Public

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { id, username, role, gender } = user;
      const payload = { id, username, role, gender };
      const token = await signToken(payload);
      return res.json({
        success: true,
        token: "Bearer " + token,
        role: user.role,
        gender: user.gender,
      });
    } else {
      errors.password = "Neispravna lozinka!";
      return res.status(400).json(errors);
    }
  }

  const admin = await Admin.findOne({ username });
  if (admin) {
    const match = await bcrypt.compare(password, admin.password);
    if (match) {
      const { id, username, role } = admin;
      const payload = { id, username, role };
      const token = await signToken(payload);
      return res.json({
        success: true,
        token: "Bearer " + token,
        role: admin.role,
      });
    } else {
      errors.password = "Neispravna lozinka!";
      return res.status(400).json(errors);
    }
  }

  const repairman = await Repairman.findOne({ username });
  if (repairman) {
    const match = await bcrypt.compare(password, repairman.password);
    if (match) {
      const { id, username, role, gender } = repairman;
      const payload = { id, username, role, gender };
      const token = await signToken(payload);
      return res.json({
        success: true,
        token: "Bearer " + token,
        role: repairman.role,
        gender: repairman.gender,
      });
    } else {
      errors.password = "Neispravna lozinka!";
      return res.status(400).json(errors);
    }
  }

  errors.username = "Korisnicko ime ne postoji!";
  return res.status(404).json(errors);
});

module.exports = router;
