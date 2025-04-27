const Expense = require("../models/expense");

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { Amount, Category, Description, DateAdded } = req.body;

    const expense = await Expense.findOneAndUpdate(
      { Id: id },
      { 
        Amount, 
        Category, 
        Description, 
        DateAdded, 
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        Id: expense.Id,
        Amount: expense.Amount,
        Category: expense.Category,
        Description: expense.Description
      },
      message: "Successfully updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};
