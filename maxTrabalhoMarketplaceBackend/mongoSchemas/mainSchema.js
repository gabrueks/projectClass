const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Game = new Schema({
    name: {
        type: String,
        unique: true
    },
    price: {
        type: Number
    }
},
{
    colletion: "games"
});

module.exports = mongoose.model('Game', Game);