import React from 'react';

function ExpenseList({ expenses, onDelete, onEdit }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDelete(id);
    }
  };

  return (
    <div className="w-full">
      {expenses.length === 0 ? (
        <p className="text-gray-400 text-center py-12 text-lg fade-in">No expenses found</p>
      ) : (
        <div className="table-container">
          <table className="w-full">
            <colgroup>
              <col className="w-[18%] min-w-[180px]" />
              <col className="w-[22%] min-w-[220px]" />
              <col className="w-[30%] min-w-[300px]" />
              <col className="w-[15%] min-w-[150px]" />
              <col className="w-[15%] min-w-[150px]" />
            </colgroup>
            <thead className="table-header">
              <tr>
                <th className="px-8 py-5 text-center text-base">Date</th>
                <th className="px-8 py-5 text-center text-base">Category</th>
                <th className="px-8 py-5 text-center text-base">Description</th>
                <th className="px-8 py-5 text-center text-base">Amount</th>
                <th className="px-8 py-5 text-center text-base">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-200 divide-y divide-gray-700">
              {expenses.map((expense) => (
                <tr key={expense.Id} className="table-row">
                  <td className="px-8 py-5 text-center">
                    {formatDate(expense.Date)}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`category-badge category-badge-${expense.Category.toLowerCase()}`}>
                      {expense.Category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="line-clamp-2">{expense.Description || '-'}</div>
                  </td>
                  <td className="px-8 py-5 text-center font-medium">
                    {formatAmount(expense.Amount)}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center items-center space-x-4">
                      <button
                        onClick={() => onEdit(expense)}
                        className="action-button action-button-edit"
                        title="Edit expense"
                      >
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(expense.Id)}
                        className="action-button action-button-delete"
                        title="Delete expense"
                      >
                        <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
