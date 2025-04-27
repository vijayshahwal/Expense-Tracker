const Expense = require("../models/expense");

exports.getExpense = async (req, res) => {
  try {
    // Fetch all the expenses from database
    const expenses = await Expense.find({});

    // Map the expenses to only include selected fields
    const filteredExpenses = expenses.map(expense => ({
      Id: expense.Id,
      Amount: expense.Amount,
      Category: expense.Category,
      Description: expense.Description,
      Date: expense.DateAdded
    }));

    // Response
    res.status(200).json({
      success: true,
      data: filteredExpenses,
      message: "Fetched all expenses successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal Server Error",
    });
  }
};
