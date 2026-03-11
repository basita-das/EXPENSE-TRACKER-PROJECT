import './App.css'
import { useEffect, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList';
import SummaryPanel from './components/SummaryPanel';
import CurrencyConverter from './components/CurrencyConverter';


function App() {

    const [expenses, setExpenses] = useState(() => {
      const savedExpenses = localStorage.getItem("expenses");
      return savedExpenses ? JSON.parse(savedExpenses) : [];
    });

    const [editingExpense, setEditingExpense] = useState(null)

    useEffect(() => {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses])

    const addExpense = (expense) => {
      setExpenses([...expenses, expense])
    };

    const updateExpense = (updatedExpense) => {
        setExpenses(
          expenses.map((expense) => 
            expense.id === updatedExpense.id ? updatedExpense : expense
          )
        )
        setEditingExpense(null);
    }

    const deleteExpense = (id) => {
      setExpenses(expenses.filter((item) => item.id !== id))
    }

    const total = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    )

  return (
    <>
        <div className=" w-full mx-auto p-6 min-h-screen bg-gray-900">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-400">
            Expense Tracker
          </h1>

          <main className="grid grid-cols-1 md:grid-cols-12 gap-8">

            <section className="md:col-span-3 flex flex-col gap-6 bg-gray-700 p-2 rounded-xl h-fit">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-600">Entry</h2>
                <ExpenseForm 
                  addExpense={addExpense}
                  editingExpense={editingExpense}
                  updateExpense={updateExpense}
                />
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-600"> Currency Converter</h2>
                <CurrencyConverter total={total} />
              </div>
            </section>

            <section className="md:col-span-6 bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-300">Expense List</h2>
              <ExpenseList 
                expenses={expenses} 
                deleteExpense={deleteExpense} 
                setEditingExpense={setEditingExpense}
              />
            </section>

            <section className="md:col-span-3 gap-6 bg-gray-700 p-2 rounded-xl h-fit">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold mb-4 text-gray-600">Summary</h2>
                <SummaryPanel expenses={expenses} />
              </div>
            </section>
          </main>
        </div>
    </>
  )
}

export default App
