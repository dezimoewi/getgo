import { useState } from 'react';

const CurrencyCard = ({ rates, country }) => {
  const [amount, setAmount] = useState(100);
  if (!rates || !country) return null;

  const currencies = country.currencies || {};
  const destCode = Object.keys(currencies)[0];
  const destName = currencies[destCode]?.name || destCode;

  const rate = rates.conversion_rates?.[destCode] || 1;
  const converted = (amount * rate).toFixed(2);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-white/90">Currency</h3>
      </div>
      <p className="text-sm text-white/50">{destName} ({destCode})</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value || 0)}
        className="w-full px-4 py-2 mt-3 text-lg bg-white/5 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-violet-400/40 border border-white/10"
      />
      <div className="mt-auto pt-4 text-center">
        <p className="text-xs text-white/40">USD → {destCode}</p>
        <p className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mt-1">{converted}</p>
        <p className="text-xs text-white/30 mt-1">1 USD ≈ {rate.toFixed(4)} {destCode}</p>
      </div>
    </div>
  );
};

export default CurrencyCard;