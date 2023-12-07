const jwt = require('jsonwebtoken')
const User = require('../model/usersModel')
require('dotenv').config();

const secret = process.env.JWT_SECRET_KEY


//@type: middleware for user authentication
//@description: used to decrypt token value and store userid in global variable 'req' to pass to controller
exports.authenticate =async (req,res,next)=>{
    try{
        const token = req.header('Authorization');
        if(!token) { return res.status(401).json({ message: 'Unauthorized. No token provided.' }); }
        const user = jwt.verify(token,secret)

        const result =await User.findByPk(user.userId)
        if(result){
            req.user=user;
            next();
        }
        else{
            return res.json({success:false, message: `middleware auth user does not exists`});
        }
    }
    catch(err){
        return res.status(401).json({success:false,message:"authentication failed"})
    }
}
