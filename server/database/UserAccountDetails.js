const mongoose = require("mongoose");
require("dotenv").config();


// =========================
// DATABASE CONNECTION
// =========================

const connectDatabase = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URL
    );

    console.log("MongoDB Connected Successfully");

  } catch (error) {

    console.log(
      "MongoDB Connection Error:",
      error.message
    );

  }

};


const userschema = mongoose.Schema({
    FullName : {
        type : String,
        required : true,
    },
    DOB : {
        type : String,
        required : true,
        
    },
    Gender : {
         type : String,
        required : true,
    },

     Email : {
         type : String,
        required : true,
        unique : true,
    },

      Phone : {
         type : String,
        required : true,
        unique : true,
    },

      Address : {
         type : String,
        required : true,
    },

    City : {
         type : String,
        required : true,
    },

    State : {
         type : String,
        required : true,
    },

    PinCode : {
         type : Number,
        required : true,
    },
    AccountType : {
         type : String,
        required : true,
    },

    NomineeName : {
         type : String,
        required : true,
    },
   Relation : {
         type : String,
        required : true,
    },
    Password : {
         type : String,
        required : true,
    },

    AccountNumber : {
      type : Number,
      required : true,
      unique : true
    },

     TotalAmount : {
      type : Number,
      required : true,
      default : 0
    },

    TotalCredited : {
      type : Number,
      required : true,
      default : 0
    },

    TotalDebited : {
      type : Number,
      required : true,
      default : 0
    }
    
})
const User = mongoose.model("User", userschema);

module.exports = {
  User,
  connectDatabase
};