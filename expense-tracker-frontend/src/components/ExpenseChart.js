import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const ExpenseChart = ({ expenses }) => {
  console.log("TJE VALUE OF EXPENSES IS", expenses);
  
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Process data for category distribution (Pie Chart)
  const categoryData = expenses.reduce((acc, expense) => {
    if (!acc[expense.Category]) {
      acc[expense.Category] = 0;
    }
    acc[expense.Category] += expense.Amount;
    return acc;
  }, {});

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            family: "'Poppins', sans-serif"
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          family: "'Poppins', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Poppins', sans-serif"
        },
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return ` ${formatAmount(value)}`;
          }
        }
      }
    }
  };

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          'rgba(129, 140, 248, 0.8)',  // Indigo
          'rgba(147, 51, 234, 0.8)',   // Purple
          'rgba(236, 72, 153, 0.8)',   // Pink
          'rgba(239, 68, 68, 0.8)',    // Red
          'rgba(245, 158, 11, 0.8)',   // Amber
          'rgba(16, 185, 129, 0.8)',   // Emerald
          'rgba(59, 130, 246, 0.8)',   // Blue
        ],
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2
      }
    ]
  };

  // Process data for monthly expenses (Bar Chart)
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.Date);
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += expense.Amount;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: Object.values(monthlyData),
        backgroundColor: 'rgba(129, 140, 248, 0.5)',
        borderColor: 'rgba(129, 140, 248, 1)',
        borderWidth: 2,
        borderRadius: 5,
        maxBarThickness: 50
      }
    ]
  };

  const barChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          callback: (value) => formatAmount(value),
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: "'Poppins', sans-serif"
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: "'Poppins', sans-serif"
          }
        }
      }
    }
  };

  // Calculate statistics
  const total = expenses.reduce((sum, exp) => sum + exp.Amount, 0);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.Date);
    return expenseDate.getMonth() === new Date().getMonth() &&
           expenseDate.getFullYear() === new Date().getFullYear();
  });
  const currentMonthTotal = currentMonthExpenses.reduce((sum, exp) => sum + exp.Amount, 0);

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-effect rounded-xl p-6 hover-scale">
          <h3 className="text-gray-400 text-sm uppercase mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-white">
            {formatAmount(total)}
          </p>
        </div>
        <div className="glass-effect rounded-xl p-6 hover-scale">
          <h3 className="text-gray-400 text-sm uppercase mb-2">This Month ({currentMonth})</h3>
          <p className="text-3xl font-bold text-white">
            {formatAmount(currentMonthTotal)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-effect rounded-xl p-6 hover-scale">
          <h3 className="text-white text-lg font-semibold mb-6">Category Distribution</h3>
          <div className="aspect-w-1 aspect-h-1">
            <Pie data={pieChartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6 hover-scale">
          <h3 className="text-white text-lg font-semibold mb-6">Monthly Trend</h3>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
