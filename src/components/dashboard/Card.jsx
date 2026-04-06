const Card = ({ title, amount, type }) => {
  const colorClass =
    type === "income"
      ? "text-green-600"
      : type === "expense"
      ? "text-red-600"
      : "text-slate-900";

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-2 shadow-xl shadow-slate-200/40 border border-slate-200">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className={`text-2xl font-bold ${colorClass}`}>
        ₹ {amount.toLocaleString()}
      </p>
    </div>
  );
};

export default Card;