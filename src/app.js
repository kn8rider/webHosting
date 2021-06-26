const express = require("express");
const router = require("./router/routes");
const path = require("path");
const hbs = require("hbs");
const Student = require("./models/students");
const bcrypt = require("bcryptjs");
const static_path = path.join(__dirname,"../public");
const template = path.join(__dirname,"../templates/views");
const partial = path.join(__dirname,"../templates/partials");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template);
hbs.registerPartials(partial)

app.use(router)
const port = process.env.PORT || 8000;
app.get("/",async(req,res)=>{
    res.render("index");
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.post("/register",async(req,res)=>{
    try{ 
        const password = req.body.password;
        const securepass = await bcrypt.hash(password,10);
        const cpassword = req.body.confirmpassword;
        console.log(password)
        if(password === cpassword){
            const addStudent = new Student({
                name:req.body.firstname,
                email:req.body.email,
                username:req.body.username,
                phone:req.body.phone,
                pass:securepass
            })
           const data = await addStudent.save();
           res.status(201).send(data);
           console.log(data);
        }else{
            res.status(400).send("Password not match..")
        }
    }catch(e){
        res.status(400).send(e)
    }
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async(req,res)=>{
  try{
      const user = req.body.username;
      const password = req.body.password;
      const findStudent = await Student.findOne({username:user});
      const matchpass = await bcrypt.compare(password,findStudent.pass);
      if(matchpass){
          res.status(201).send(findStudent);
          console.log(findStudent);
      }else{
          res.status(400).send("Login credentials invalid..");
      }
  }catch(e){
      res.status(400).send(e);
  }
})
app.get("/data",async(req,res)=>{
    const alldata = await Student.find();
   if(alldata){
    res.status(200).send(alldata)
   }else{
       res.status(404).send("Not found ..!!");
   }
})
app.listen(port,()=>{
    console.log(`App is start to listening ${port}`)
})
