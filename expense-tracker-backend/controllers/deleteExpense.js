const Expense = require("../models/expense");

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find and delete the expense
        const expense = await Expense.findOneAndDelete({ Id: id });
        
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                Id: expense.Id,
                Amount: expense.Amount,
                Category: expense.Category,
                Description: expense.Description,
                Date: expense.DateAdded
            },
            message: "Expense deleted successfully",
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};