import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import { fetchExpenses, createExpense, updateExpense, deleteExpense } from './api';
import './index.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetchExpenses();
      setExpenses(response.data.data);
      setError(null);
    } catch (error) {
      setError('Error fetching expenses. Please try again later.');
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpenseHandler = async (expense) => {
    try {
      if (expenseToEdit) {
        await updateExpense(expenseToEdit.Id, {
          ...expense,
          Id: expenseToEdit.Id
        });
        setExpenseToEdit(null);
      } else {
        await createExpense(expense);
      }
      await loadExpenses(); // Refresh data after update or create
      setError(null);
    } catch (error) {
      setError('Error saving expense. Please try again.');
      console.error('Error saving expense:', error);
    }
  };

  const editExpenseHandler = (expense) => {
    setExpenseToEdit(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteExpenseHandler = async (id) => {
    try {
      await deleteExpense(id);
      await loadExpenses(); // Refresh data after deletion
      setError(null);
    } catch (error) {
      setError('Error deleting expense. Please try again.');
      console.error('Error deleting expense:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-background flex items-center justify-center">
        <div className="glass-effect p-8 rounded-full animate-pulse">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-background">
      <div className="content-container">
        <header className="glass-effect rounded-2xl p-8 mb-8 text-center fade-in">
          <h1 className="text-5xl font-bold text-white mb-4">
            Expense Tracker
          </h1>
          <p className="text-xl text-gray-300">
            Keep track of your spending with ease
          </p>
        </header>

        {error && (
          <div className="glass-effect mb-8 border-l-4 border-red-500 p-4 rounded-lg fade-in" role="alert">
            <div className="flex items-center">
              <svg className="h-6 w-6 text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-red-300 flex-grow">{error}</p>
              <button
                className="text-red-300 hover:text-red-400 transition-colors"
                onClick={() => setError(null)}
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="glass-effect rounded-2xl p-8 hover-scale fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              {expenseToEdit ? 'Edit Expense' : 'Add New Expense'}
            </h2>
            <ExpenseForm
              onAddExpense={addExpenseHandler}
              expenseToEdit={expenseToEdit}
            />
          </div>

          <div className="glass-effect rounded-2xl p-8 hover-scale fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">
              Expense Analytics
            </h2>
            <ExpenseChart expenses={expenses} />
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-8 hover-scale fade-in mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Expense History
          </h2>
          <ExpenseList
            expenses={expenses}
            onDelete={deleteExpenseHandler}
            onEdit={editExpenseHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
