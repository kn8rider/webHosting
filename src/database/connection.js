const mongoose = require("mongoose");
const DB = 'mongodb+srv://kn8Rider:twIVfr1YEKuoz63I@cluster0.fezsl.mongodb.net/EmployeeApi?retryWrites=true&w=majority';
mongoose.connect(DB,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("successfully connected....");
}).catch((e)=>{
    console.log(e);
})