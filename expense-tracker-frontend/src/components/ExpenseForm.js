import React, { useState } from 'react';

const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Healthcare',
  'Others'
];

function ExpenseForm({ onAddExpense, expenseToEdit }) {
  console.log("the value of expense to edit in form is : ", expenseToEdit);
  
  const [amount, setAmount] = useState(expenseToEdit ? expenseToEdit.Amount : '');
  const [category, setCategory] = useState(expenseToEdit ? expenseToEdit.Category : 'Food');
  const [description, setDescription] = useState(expenseToEdit ? expenseToEdit.Description : '');
  const [date, setDate] = useState(expenseToEdit ? expenseToEdit.Date : new Date().toISOString().split('T')[0]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (amount && category) {
      onAddExpense({
        Amount: parseFloat(amount),
        Category: category,
        Description: description,
        DateAdded: date,
      });
      setAmount('');
      setCategory('Food');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6 glass-effect rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
      <div>
        <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="amount">
          Amount (INR)
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          required
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-style"
        />
      </div>

      <div>
        <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-style"
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-gray-800 text-white">
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="description">
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-style"
        />
      </div>

      <div>
        <label className="block text-gray-200 text-sm font-semibold mb-2" htmlFor="date">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          required
          onChange={(e) => setDate(e.target.value)}
          className="input-style"
        />
      </div>

      <button
        type="submit"
        className="button-primary w-full mt-8"
      >
        {expenseToEdit ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
}

export default ExpenseForm;
