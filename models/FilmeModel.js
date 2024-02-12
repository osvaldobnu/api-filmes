const mongoose = require("mongoose");

const FilmeSchema = new mongoose.Schema({
    nome : { type : String, required : true , unique : true},
    nota : { type : Number, required : true }
}, {timestamps : true});

module.exports = mongoose.model("Filme", FilmeSchema);