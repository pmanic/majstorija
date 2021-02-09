const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationsSchema = new Schema({
  usernameMajstora: {
    type: String,
    required: true,
  },

  usernameKorisnika: {
    type: String,
    required: true,
  },

  seen: {
    type: Boolean,
    required: true,
    default: false,
  },

  dateCreated: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  poruka: {
    type: String,
  },

  imeKorisnika: {
    type: String,
  },

  prezimeKorisnika: {
    type: String,
  },
});

module.exports = Notifications = mongoose.model(
  "notifications",
  NotificationsSchema
);
