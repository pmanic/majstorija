const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ZahtevKategorijaSchema = new Schema({
    repairman: {
        type: Schema.Types.ObjectId, //ovo povezuje profil sa repairmanom preko id-a
        ref: 'repairmans' //povezujemo sa kolekcijom repairmans
    },
    repairmanUsername: {
        type: String
    },
    accepted: {
        type: Boolean,
        default: false
    },
    declined: {
        type: Boolean,
        default: false
    },
    categoryTitle: {
        type: String  // kategorija koju majstor salje u zahtevu
    },
    dateSent: {
        type: Date,
        default: Date.now
    }
});

module.exports = ZahtevKategorija = mongoose.model('zahtevkategorija', ZahtevKategorijaSchema);