const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");
const userRouter=require("./Routes/userRoute");



dotenv.config();


const app =express();
app.use(cors());
app.use(express.json());


// Use the userRouter before starting the server
app.use("/api/users", userRouter);

//connection to MongoDB
mongoose.connect(process.env.URI).then(()=>{
    console.log("connected successfuly");
    app.listen(process.env.PORT || 8000, (err)=>{
        if(err) console.log(err);
        console.log("running successfully at",process.env.PORT || 8000);
    });
})
.catch((error)=>{
    console.log("error",error);
});


app.use(userRouter);

