const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
mongoose.connect('your-mongodb-url')

const User = mongoose.model('Users', { name: String, email: String , password:String });

app.post('/signup', async function(req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;


  const existingUser = await User.findOne({email:email});
  if(existingUser){
    return res.status(400).json({message:"user already exits"});
  }

  await user.create({name:username,email:email,password:password});
    // const user= new User({ name: username, 
    //     email: email,
    // password:password
    // });
  user.save();
  res.status(200).json({
    message:"successfully"
  })
})

app.listen(3000);

// kitty.save().then(() => console.log('meow'));

