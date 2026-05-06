const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{ type:String, required:true },
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:true },

    role:{
        type:String,
        enum:["donor","patient","ngo","hospital"],
        required:true
    },

    bloodGroup:String,
    city:String,
    availability:{ type:Boolean, default:true },

    points:{ type:Number, default:0 },
    lastDonationDate:Date

},{timestamps:true});

module.exports = mongoose.model("User",userSchema);
