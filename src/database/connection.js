const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/studentsApi",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("successfully connected....");
}).catch((e)=>{
    console.log(e);
})