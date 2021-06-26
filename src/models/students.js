const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email is already taken"],
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Invalid Email")
            }
        } 
    },
    username:{
        type:String,
        required:true,
        unique:[true,"username is already taken"],
    },
    phone:{
        type:Number,
        minLength:10,
        maxLength:10,
        unique:true,
        required:true
    },
    pass:{
        type:String,
        require:[true],
        minlength:6
    }
})

//we will create a new collection
const Student = new mongoose.model('Student',studentSchema);
module.exports = Student;