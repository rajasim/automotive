import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Utensils, 
  Scissors, 
  Heart, 
  ArrowLeft,
  Plus
} from 'lucide-react';
import { ExpenseCategory, Expense } from './types.ts';

function App() {
  const [page, setPage] = useState<'categories' | 'amount' | 'history'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState<string>('');

  const categories: ExpenseCategory[] = [
    { id: 1, name: '服装', icon: ShoppingBag, color: 'bg-blue-500' },
    { id: 2, name: '食品', icon: Utensils, color: 'bg-green-500' },
    { id: 3, name: '美容', icon: Scissors, color: 'bg-pink-500' },
    { id: 4, name: '医疗', icon: Heart, color: 'bg-red-500' },
  ];

  const handleCategoryClick = (category: ExpenseCategory) => {
    setSelectedCategory(category);
    setPage('amount');
  };

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory && amount) {
      const newExpense: Expense = {
        id: Date.now(),
        category: selectedCategory,
        amount: parseFloat(amount),
        date: new Date(),
      };
      setExpenses([newExpense, ...expenses]);
      setAmount('');
      setSelectedCategory(null);
      setPage('categories');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">个人记账</h1>
          {page !== 'history' && (
            <button
              onClick={() => setPage('history')}
              className="text-blue-500 hover:text-blue-600"
            >
              查看记录
            </button>
          )}
        </div>

        {/* Categories Page */}
        {page === 'categories' && (
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mb-3 mx-auto`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-center text-gray-700">{category.name}</p>
              </button>
            ))}
          </div>
        )}

        {/* Amount Input Page */}
        {page === 'amount' && selectedCategory && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <button
              onClick={() => setPage('categories')}
              className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              返回
            </button>
            <div className={`w-16 h-16 ${selectedCategory.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
              <selectedCategory.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl text-center mb-6">{selectedCategory.name}</h2>
            <form onSubmit={handleAmountSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">输入金额</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="¥0.00"
                  step="0.01"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                保存
              </button>
            </form>
          </div>
        )}

        {/* History Page */}
        {page === 'history' && (
          <div>
            <button
              onClick={() => setPage('categories')}
              className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              返回
            </button>
            <div className="bg-white rounded-lg shadow-md">
              {expenses.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  暂无支出记录
                </div>
              ) : (
                <div className="divide-y">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 ${expense.category.color} rounded-full flex items-center justify-center mr-3`}>
                          <expense.category.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{expense.category.name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-800">¥{expense.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;