const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const RepairmanProfileSchema = new Schema({
  repairman: {
    type: Schema.Types.ObjectId, //ovo povezuje profil sa repairmanom preko id-a
    ref: "repairmans", //povezujemo sa kolekcijom repairmans
  },

  handle: {
    //da mozemo url do profila da ukucamo
    type: String,
    max: 40,
  },
  username: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  surname: {
    type: String,
  },
  category: {
    type: String,
  },
  hourbill: {
    type: Number,
  },
  city: {
    type: String,
  },
  jobsRatedCount: {
    type: Number,
    default: 0,
  },
  ratesSum: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  adress: {
    type: String,
  },
  number: {
    type: Number,
  },
  bio: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    required: true,
  },
  education: [
    {
      school: {
        type: String,
      },
      degree: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  experience: [
    {
      position: {
        type: String,
      },
      company: {
        type: String,
      },
      years: {
        type: Number,
      },
      currentJob: {
        type: Boolean,
        default: false,
      },
      descriptionJob: {
        type: String,
      },
    },
  ],
  website: {
    type: String,
    default: "",
  },
  onduty: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
  },
});

module.exports = RepairmanProfile = mongoose.model(
  "repairmanprofiles",
  RepairmanProfileSchema
);
