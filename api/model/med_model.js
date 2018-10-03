'use strict';

var mongoose = require('mongoose');

var medSchema = new mongoose.Schema({
    phone_number: Number,
    tokenS: String
});

var medSchema2 = new mongoose.Schema({
    phone_number1 : Number ,
    createDate: { type: Date, default: Date.now, expires: 2*60 }
    
});

var medSchema3 = new mongoose.Schema({
    phone_numberF: Number
});


module.exports = mongoose.model("Users",medSchema);
module.exports = mongoose.model("Temps",medSchema2);
module.exports = mongoose.model("Lasts",medSchema3);