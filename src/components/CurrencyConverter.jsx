import { useEffect, useState } from "react"


export default function CurrencyConverter({ total }) {

    const [currency, setCurrency] = useState("USD");
    const [rate, setRate] = useState(null);

    const apiKey = import.meta.env.VITE_API_key;

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
        .then(res => res.json())
        .then(data => {            
            if(data.conversion_rates) {
                setRate(data.conversion_rates[currency])
            }
        })
        .catch((error) => console.error("Error fetching data:", error))
    }, [currency, apiKey])

    return (
        <>
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                
                <div className="flex flex-col gap-4">
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none"
                    >
                        <option className="bg-zinc-900">USD</option>
                        <option className="bg-zinc-900">EUR</option>
                        <option className="bg-zinc-900">GBP</option>
                        <option className="bg-zinc-900">INR</option>
                    </select>

                    {rate ? (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                            <p className="text-zinc-500 text-xs uppercase mb-1 font-bold">Converted Total</p>
                            <p className="text-2xl font-mono font-bold text-blue-400">
                                {(total * rate).toFixed(2)} <span className="text-sm font-sans ml-1">{currency}</span>
                            </p>
                        </div>
                    ) : (
                        <p className="text-center text-zinc-500 text-xs animate-pulse italic">
                            Updating exchange rates...
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}