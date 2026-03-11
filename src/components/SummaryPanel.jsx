

export default function SummaryPanel({ expenses }) {

    const total = expenses.reduce(
        (sum, item) => sum + item.amount,
        0
         )

         const categories = {};

         expenses.forEach((item) => {
            categories[item.category] = (categories[item.category] || 0) + item.amount;
         });

    return(
        <>
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h2 className="text-zinc-500 text-xs uppercase tracking-widest mb-1 font-bold">Total Spending</h2>
                <p className="text-4xl font-bold text-blue-500 mb-6">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>

                <h3 className="text-white font-semibold mb-4 text-sm border-b border-white/5 pb-2">
                    Category Breakdown
                </h3>

                <div className="space-y-4">
                    {Object.entries(categories).map(([cat, value]) => (
                        <div key={cat}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-zinc-300 capitalize">{cat}</span>
                                <span className="text-zinc-400 font-mono">${value.toFixed(2)}</span>
                            </div>
                            
                            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${(value / (total || 1)) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}