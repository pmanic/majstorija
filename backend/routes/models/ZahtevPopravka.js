const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ZahtevPopravkaSchema = new Schema({
    repairman: {
        type: Schema.Types.ObjectId, //ovo povezuje profil sa repairmanom preko id-a
        ref: 'repairmans' //povezujemo sa kolekcijom repairmans
    },
    user: {
        type: Schema.Types.ObjectId, //ovo povezuje profil sa user preko id-a
        ref: 'users' //povezujemo sa kolekcijom users
    },
    repairmanUsername: {
        type: String
    },
    userUsername: {
        type: String
    },
    sent: {
        type: Boolean, // da znamo da li je poslat zahtev 
        default: false
    },
    accepted: {
        type: Boolean, // da znamo da li je majstor prihvatio ili odbio zahtev
        default: false
    },
    declined: {
        type: Boolean,
        default: false
    },
    messageUser: {
        type: String  // poruka koju ce korisnik da posalje majstoru u zahtevu
    },
    messageRepairman: {
        type: String  // poruka koju ce korisnik da posalje majstoru u zahtevu
    },
    archived: {
        type: Boolean, // da znamo da li je zavrsen posao, korisnik moze da arhivira zahtev
        default: false
    },
    rateRepairman: {
        type: Boolean, // da li je ocenjen majstor
        default: false
    },
    rate: {
        type: Number,
        default: 0
    },
    scheduledDate: {
        type: Date
    },
    scheduledFrom: {
        type: String
    },
    scheduledTo: {
        type: String
    },
    dateSent: {
        type: Date,
        default: Date.now
    }
});

module.exports = RepairmanProfile = mongoose.model('zahtevpopravka', ZahtevPopravkaSchema);