const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport"); //passport nam dodje glavni za autentikaciju

const users = require("./backend/routes/api/users");
const userprofile = require("./backend/routes/api/user-profile");
const repairmanprofile = require("./backend/routes/api/repairman-profile");
const zahtevpopravka = require("./backend/routes/api/zahtev-popravka");
const zahtevkategorija = require("./backend/routes/api/zahtev-kategorija");
const notifications = require("./backend/routes/api/notification");

const app = express();

// Bodyparser je sada ukljucen u express
app.use(express.json());

// DB config
const db = require("./backend/config/keys").mongoURI;

// Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log("Greska " + err));

// Passport middleware
app.use(passport.initialize());
// Passport Config ,sve ostalo za passport bice u config folderu na dalje
require("./backend/config/passport")(passport);

// Use Routes
// Ovo smo dodali kako bismo u routes(profile.js/users.js...) mogli samo da dopisemo /test primer a ne celu rutu
app.use("/api/users", users);
app.use("/api/userprofile", userprofile);
app.use("/api/repairmanprofile", repairmanprofile);
app.use("/api/zahtevpopravka", zahtevpopravka);
app.use("/api/zahtevkategorija", zahtevkategorija);
app.use("/api/notifications", notifications);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
