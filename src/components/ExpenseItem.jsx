

export default function ExpenseItem({ expense, setEditingExpense, deleteExpense}) {
    return (
        <>
            <section className="bg-gray-900 text-white p-4 rounded-lg border border-gray-700 mb-3">
                <div>

                        <h3 className="text-lg font-semibold">
                            {expense.name}</h3>
                        <p className="text-gray-400">
                            {expense.category}</p>
                        <p className="text-green-400 font-bold">
                            ${expense.amount}</p>
                            
                        <div className="mt-2 flex gap-2">
                            <button
                                className="bg-blue-500 px-3 py-1 rounded"
                                    onClick={() => setEditingExpense(expense)}
                            >
                                Edit
                            </button>

                            <button
                                className="bg-red-500 px-3 py-1 rounded"
                                    onClick={() => deleteExpense(expense.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </section>
        </>
    )
}