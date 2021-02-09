const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    dateRegistred: {
        type: Date,
        default: Date.now
    }

});

module.exports = Admin = mongoose.model('admins', AdminSchema);