
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myApp')
  .then(() => console.log('Connected!')).catch((err)=>{
    console.log(err)
  });


let userSchema= mongoose.Schema({
  name:String,
  userName:String,
  age:Number,
  email: String,
  password:String,
  like:Array,
});

module.exports=mongoose.model('user',userSchema)





