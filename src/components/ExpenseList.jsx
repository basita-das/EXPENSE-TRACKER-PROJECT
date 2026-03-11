import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, setEditingExpense, deleteExpense }) {
    return(
        <>
            <section className="max-h-[70vh] overflow-y-auto pr-2
                                [&::-webkit-scrollbar]:w-1.5
                              [&::-webkit-scrollbar-track]:bg-black/10
                              [&::-webkit-scrollbar-thumb]:bg-zinc-600
                                [&::-webkit-scrollbar-thumb]:rounded-[10px]
                              hover:[&::-webkit-scrollbar-thumb]:bg-blue-500">
                <div className="flex flex-col gap-3">
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <ExpenseItem 
                                key={expense.id}
                                expense={expense}
                                deleteExpense={deleteExpense}
                                setEditingExpense={setEditingExpense}
                            />
                        ))
                        ) : (
                        <p className="text-center text-(--fg-muted) py-10 italic">
                            No expenses recorded yet.
                        </p>
                    )}
                </div>
            </section>
        </>
    )
}