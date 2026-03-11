import { useState, useEffect } from "react"


export default function ExpenseForm({ addExpense, editingExpense, updateExpense }) {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");

    useEffect(() => {
        if (editingExpense) {
            setName(editingExpense.name)
            setAmount(editingExpense.amount)
            setCategory(editingExpense.category)
        } else {
            setName("");
            setAmount("");
            setCategory("Food");
        }
    }, [editingExpense])

    const handleSubmit = (e) => {
        e.preventDefault();

        const newExpense = {
            id: editingExpense ? editingExpense.id : Date.now(),
            name,
            amount: Number(amount),
            category
        };

        if(editingExpense){
            updateExpense(newExpense)
        } else {
            addExpense(newExpense)
        }

        setName("");
        setAmount("");
    }



    return (
        <>
           <section className="bg-zinc-800 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {editingExpense && (
                        <p className="text-blue-600 text-sm font-bold">
                            Editing: {editingExpense.name}
                        </p>
                    )}

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase text-gray-300">Name</label>
                        <input 
                            placeholder="Expense Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-gray-50 border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase text-gray-300">Amount</label>
                        <input 
                            placeholder="0.00"
                            value={amount}
                            type="number"
                            step="0.01"
                            min="0.01"
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            className="bg-gray-50 border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold uppercase text-gray-300">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border p-2 rounded bg-white"
                        >
                            <option>Food</option>
                            <option>Travel</option>
                            <option>Marketing</option>
                            <option>Utilities</option>
                            <option>Others</option>
                        </select>
                    </div>

                    <button className="bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors">
                        {editingExpense ? "Update Expense" : "Add Expense"}
                    </button>
                </form>
            </section>
        </>
    )
}