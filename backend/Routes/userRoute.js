const express=require("express");
const mongoose=require("mongoose");
const User=require('../models/userModel');

const router=express.Router();


//create
//post 
router.post("/", async(req,res)=>{
    console.log(req.body);
    const {name,email,age}=req.body;
    //const User= require("./models/userModel");


    try{
        const userAdded=await User.create({
            name:name,
            email:email,
            age:age,
        });

        res.status(201).json(userAdded);
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
    
});


//get all user 
router.get("/",async(req,res)=>{
    try{
    const showAll=await User.find();
    res.status(200).json(showAll);

    }catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }

    res.status("api running succesfull after doing all the changes");
});

//get single user by ID (GET)
router.get("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
    const singleUser=await User.findById({_id : id});
    if(!singleUser){
        return res.status(404).json({error:"user not found"});
    }
    res.status(200).json(singleUser);

    }catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }

    //res.status("api running succesfull after doing all the changes");
});

//delete operation
router.delete("/:id",async(req,res)=>{
    const {id}=req.params
    try{
    const singleUser=await User.findByIdAndDelete({_id : id});
    res.status(200).json(singleUser);

    }catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }

    res.status("api running succesfull after doing all the changes");
});


//PUT or UPDATE //Patch
router.patch("/:id",async(req,res)=>{
    const {id}=req.params;
    const {name,email,age}=req.body;
    try{
    const singleUser=await User.findByIdAndUpdate(id,req.body,{new:true,});
    res.status(200).json(singleUser);

    }catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }

    res.status("api running succesfull after doing all the changes");
});


module.exports=router;


