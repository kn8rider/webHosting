const express = require("express");
const app = express();
require("../database/connection");
const Student = require("../models/students");

const router = express.Router();
//router.use(express.json());

router.post("/students",async(req,res)=>{
    try{
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
})
router.get("/students",async(req,res)=>{
    try{
        const data = await Student.find();
    res.status(201).json(data);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get("/students/:name",async(req,res)=>{
    try{
        const name = req.params.name;
        const data = await Student.findOne({name});
        if(data){
            res.status(201).json(data);
        }else{
            res.status(404).send("Data not found !!!");
        }
    }catch(e){
        res.status(400).send(e);
    }
})
router.delete("/students/:_id",async(req,res)=>{
    try{
        const _id = req.params._id;
        const data = await Student.findByIdAndDelete({_id});
        if(data){
            res.status(201).json(data);
        }else{
            res.status(404).send("Data not found !!!");
        }
    }catch(e){
        res.status(400).send(e);
    }
})

router.patch("/students/:_id",async(req,res)=>{
    try{
        const _id = req.params._id;
        const data = await Student.findByIdAndUpdate(_id,req.body,{new:true});
        if(data){
            res.status(201).json(data);
        }else{
            res.status(404).send("Data not found !!!");
        }
    }catch(e){
        res.status(400).send(e);
    }
})
module.exports = router;
