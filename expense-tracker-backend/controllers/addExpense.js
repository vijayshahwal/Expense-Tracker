//import th model
const Expense = require("../models/expense");

//define route handler

exports.addExpense = async(req,res) => {
    try {
            //extract data from request body
            const {Amount,Category,Description,DateAdded} = req.body;
            //create a new expense Obj and insert in DB
            const expense = await Expense.create({Amount,Category,Description,DateAdded});
            //send a json response with a success flag
            res.status(200).json({
                success: true,
                data: {
                  Id: expense.Id,
                  Amount: expense.Amount,
                  Category: expense.Category,
                  Description: expense.Description,
                  Date: expense.DateAdded
                },
                message: "Successfully added",
            });
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}