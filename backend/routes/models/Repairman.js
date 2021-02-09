const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RepairmanSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Bez kategorije'
    },
    hourbill: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    ratesSum: {
        type: Number,
        default: 0
    },
    jobsRatedCount: {
        type: Number,
        default: 0
    },
    number: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    dateRegistred: {
        type: Date,
        default: Date.now
    }
});

module.exports = Repairman = mongoose.model('repairmans', RepairmanSchema);