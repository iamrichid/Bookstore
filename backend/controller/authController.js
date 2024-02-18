const User = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req,res) => {
  const {user,pwd} = req.body;

  if(!user || !pwd) return res.sendStatus(400).json({'message' : 'Username and password are both required'});
 
  const foundUser = await User.findOne({refreshToken }).exec();   
  if(!foundUser) return res.sendStatus(401); //forbidden

  // evaluate password
  const match = await bcrypt.compare(pwd,foundUser.password);
  
  if (match){
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
          userInfo:{
            'username': foundUser.username,
            'roles' : roles
          }
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '30s'}
    );

    const refreshToken = jwt.sign(
        {'username': foundUser.username},
          process.env.REFRESH_TOKEN_SECRET,
          {expiresIn: '1d'}
       );

       foundUser.refreshToken = refreshToken;
       const result = foundUser.save();
       console.log(result)
   
       res.cookie('jwt', {httpOnly : true, sameSite: 'None', secure:true});
       res.json({accessToken});

    }else{
        res.sendStatus(401)
       }
  }


  module.exports = { handleLogin }