const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CategorySchema = new Schema({
    categoryTitle: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }

});

module.exports = Kategorije = mongoose.model('categories', CategorySchema);