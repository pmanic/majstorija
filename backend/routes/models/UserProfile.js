const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, //ovo povezuje profil sa userom preko id-a
        ref: 'users' //povezujemo sa kolekcijom users
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    handle: { //da mozemo url do profila da ukucamo
        type: String,
        max: 40
    },
    city: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    adress: {
        type: String
    },
    number: {
        type: Number
    },
    role: {
        type: String
    }
});

module.exports = UserProfile = mongoose.model('userprofiles', UserProfileSchema);