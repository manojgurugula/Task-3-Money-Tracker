const ExpenseTrackerModel = require('../model/expensesModel')
 

//get all expenses
exports.getAllExpenses = async (req,res)=>{
    try{
        const allExpenses = await ExpenseTrackerModel.findAll({where: {usersTbId:req.user.userId}});
        res.status(200).json({allExpenses : allExpenses})
    }catch(err){
        console.log('Error in fetching all expenses record with error: ',JSON.stringify(err))
        res.status(500).json({error: err})
    } 
}



exports.getExpenseById = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.trim()) {
        return res.status(400).json({ error: 'Expense Id of Updated user missing' });
      }
      const expense = await ExpenseTrackerModel.findOne({
        where: { id, usersTbId: req.user.userId },
      });
      if (!expense.trim()) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.status(200).json({ updatedUserExpense: expense });
    } catch (error) {
      console.error(`Error in fetching expense by Id: ${error}`);
      res.status(500).json({ error });
    }
  };
  


//addNew Expense Post Request
exports.addNewExpense = async (req,res)=>{
    try{
        const {amount ,description, category , amountType} = req.body;
        const usersTbId = req.user.userId;
        if(!amount.trim() || !description.trim() || !category.trim()){ throw new Error('all fields mandatory')}
        const newExpense = await ExpenseTrackerModel.create({  
            amount ,description, category, amountType ,usersTbId       
        }) 
        res.status(201).json({newAddedExpense:newExpense})
    }
    catch(err){
        console.error(`Error in posting new expense: ${err}`)
        res.status(err.status || 500).json({error: err.message || err})
    } 
}




//delete Expense
exports.deleteExpense = async (req,res)=>{
    try{
        const { id } = req.params;
        if(!id.trim()){ 
            return res.status(400).json({error:'Expense Id is missing while deleting.'})
        }
        const delres = await ExpenseTrackerModel.destroy({where: {id, usersTbId:req.user.userId}});
        if(delres === 0){
            return res.status(404).json({error: 'Expense not found'});
        }
        res.sendStatus(200)
    }
    catch(err){
        console.error(`Error in deleting expense: ${err}`);
        res.status(500).json({error: err.message || err})
    } 
}




//update expense
exports.updateExpense = async (req,res)=>{
    try{
        const {amount ,description, category, amountType} = req.body;
        const { id } = req.params;
        if(!id.trim()){ return res.status(400).json({error: 'Expense Id is missing for update.'})}
        if(!amount.trim() || !description || !category){ throw new Error('all fields mandatory')}
        const result = await ExpenseTrackerModel.update({ amount ,description, category ,amountType}, { 
            returning:true, 
            where: {id, usersTbId:req.user.userId} 
        });
        if(result[0] === 0) {
            return res.status(404).json({error: 'Expense not found'});
        }
        res.sendStatus(200)
    }
    catch(err){
        console.error(`Error in updating expense: ${err}`);
        res.status(err.status || 500).json({error: err.message || err})
    } 
}



