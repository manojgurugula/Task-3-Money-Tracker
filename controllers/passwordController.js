const User = require('../model/usersModel');
const ForgotModel = require('../model/forgotpasswordModel')
const bcrypt = require('bcrypt');
require('dotenv').config();
const nodemailer = require('nodemailer');
const uuid = require('uuid');


//FORGET PASSWORD FORM CONTROLLER ---SEND MAIL
const forgotPassword =  async (req, res)=> {
        const { email } = req.body;
        try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not Exists..Please Signup or enter correct email id.' });
        }
        else{
            const id=uuid.v4()
            const addForget = await ForgotModel.create({id,active:true,usersTbId:user.dataValues.id})
            if(addForget){
                  // gmail auth ====================
            const transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            })
            const msg = {
                from: process.env.EMAIL,
                to: email,
                subject:'Reset your ExpenseTracker Password',
                html: `
                    <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
                    <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                    <p><a href="http://3.109.143.245:4000/password/resetpassword/${id}">Click here to Reset password</a></p>
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                    `
              }
            await transporter.sendMail(msg, function(err,info){
                if(err){
                    return console.log("Error occured in sending mail..",err);
                }
                else{
                    console.log("Email sent successfully")
                }
            }) 
             // gmail auth ====================

                  return res.status(202).json({message: 'Reset intiated email sent...Please Reset Passowrd using link in mail. ', sucess: true})
            }
            else{
               throw new Error('Error in updating forget table')
           }                      
        }
    }
    catch(err){
        return res.json({ message: "Reset link not send", sucess: false });
    }
}



//RESET LINK FORM METHOD VERIFY AND FIRE EVENT UPDATE
const resetPassword = async (req, res) => {
    const id =  req.params.id;
    const validUser = await ForgotModel.findOne({ where : { id , active:true}})
        if(validUser){
            validUser.update({ active: false});
            res.status(200).send(`<html>
                                    <head>
                                    <title>Expense Tracker</title>
                                        <script src="https://cdn.tailwindcss.com"></script>
                                    </head>
                                    <body>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get" class="w-screen h-screen grid place-items-center">
                                        
                                        <div class="flex items-center border-b border-teal-500 py-2">
                                            <label for="newpassword">Enter New password</label><br>
                                            <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="password" placeholder="***********" name="newpassword" required />
                                            <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" >
                                            Reset Password
                                            </button>
                                        </div>
                                    </form>
                                    </body>
                                </html>`
                                )

            res.end()
            
        }
        else{
            console.log("user token invalid. Retry with new reset link.")
            return res.status(404).json({message: "Invalid Link. retry with new password reset link."})
        }    
}




//UPDATE PSWD
const updatePassword = async (req, res) => {
    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        ForgotModel.findOne({ where : { id: resetpasswordid }}).then(validUser => {
            User.findOne({where: { id : validUser.usersTbId}}).then(user => {
                if(user) {
                    //encrypt the password
                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly updated the new password. Please login using new Password.'})
                                return ;
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }
}



module.exports = {
    forgotPassword,resetPassword,updatePassword
}

