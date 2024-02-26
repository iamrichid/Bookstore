const User = require('../model/UserModel');
const bcrypt = require('bcrypt');


//  handling new users
const handleNewUser = async(req,res) => {
    const {user,pwd} = req.body;

    // making sure none of the fields are empty
    if(!user || !pwd) {
        return res.status(400).json(
            {'message' : 'username and password are required'}
        )
    }

    // checking for duplicates
    const duplicate = await User.findOne({username:user }).exec();
    if(duplicate) return res.sendStatus(409);

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);

        const result = await User.create ({
            'username':user,
            'password': hashedPwd,
        });

        console.log(result)


        res.status(201).json({'success': `New user ${user} created!`});
    }catch(err){
        res.status('500').json({'message' : err.message});
    }
}

module.exports = {handleNewUser};