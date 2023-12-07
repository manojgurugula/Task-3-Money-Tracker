const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const fs = require('fs');
const https = require('https')
const bodyParser =require('body-parser')
const sequelize = require('./utils/database')
const path = require('path')
const helmet =require('helmet');
const morgan = require('morgan');


//models
const User =require('./model/usersModel')
const Expense =require('./model/expensesModel')
const Order = require('./model/ordersModel')
const Forgotpassword = require('./model/forgotpasswordModel');
const Downloads = require('./model/downloadedReportsModel');


//importing routes
const adminRoute = require('./routes/adminRoutes');
const userRoute = require('./routes/userRoutes');
const orderRoute = require('./routes/purchaseRoutes');
const premiumUserRoutes = require('./routes/premiumFeaturesRoutes')
const PasswordRouter = require('./routes/resetPasswordRoutes')


//log file
const accessLogstream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});


//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use(helmet());
app.use(morgan('combined',{stream:accessLogstream}))



//registering routes to app
app.use(adminRoute); 
app.use(userRoute); 
app.use(orderRoute); 
app.use('/premium',premiumUserRoutes)
app.use('/password',PasswordRouter)




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/view/signup.html'));
});  
  
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname,'public/view/404.html'));
});

// app.use((req, res) => {
//     //console.log("req.url : ",req.url)
//     res.sendFile(path.join(__dirname,`public/${req.url}`));
// });



//Associations
User.hasMany(Expense,{foreignKey: 'usersTbId',sourceKey: 'id', onDelete:'CASCADE'});
Expense.belongsTo(User,{Constraints: true, onDelete: "CASCADE"});

User.hasMany(Order,{foreignKey: 'usersTbId',sourceKey: 'id', onDelete:'CASCADE'})
Order.belongsTo(User,{Constraints: true, onDelete: "CASCADE"})

User.hasMany(Forgotpassword,{foreignKey: 'usersTbId',sourceKey: 'id', onDelete:'CASCADE'});
Forgotpassword.belongsTo(User,{Constraints: true, onDelete: "CASCADE"});

User.hasMany(Downloads,{foreignKey: 'usersTbId',sourceKey: 'id', onDelete:'CASCADE'})
Downloads.belongsTo(User,{Constraints: true, onDelete: "CASCADE"})



sequelize.sync()
    .then(res=>{ app.listen(4000) })
    .catch(err=>console.log("error in connection..",err))

