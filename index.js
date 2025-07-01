const express = require('express');
const jwt = require('jsonwebtoken');
const jwtpassord = '123456';
const app = express();
app.use(express.json());
const ALL_USERS=[{
  username:"tushar@gmail.com",
  password:"123",
  name:"tushar",
},{
  username:'golu@gmail.com',
    password:'123321',
    name:'golu',
},{username:'ujjwal@gmail.com',
    password:'123123',
    name:'ujjwal',},
];
function userExits(username,password){
  
  for(let i=0;i<ALL_USERS.length;i++){
    if(ALL_USERS[i].username == username && ALL_USERS[i].password == password){
      return true;
    }
    else{
      return false;
    }
  }
  
}

app.post('/signin',function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  if(!userExits(username,password)){
    return res.status(403).json({
      msg:"user does not exit"
    })
  }
    var token = jwt.sign({ username: username}, jwtpassord);
    return res.json({ token });
});

app.get('/users',function(req,res){
  const token = req.headers.authorization;
  const decoded = jwt.verify(token,jwtpassord);
  const username = decoded.username;
  res.json({users:ALL_USERS.filter(function(value){
    if(value.username === username){
      return false;
    }else{
      return true;
    }
  })})
})
const port= 3000;
app.listen(port);