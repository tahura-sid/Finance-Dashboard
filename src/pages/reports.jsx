function Reports({ transactions }) {
  //  Highest spending category
  const categoryTotals = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const highestCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0] || ["N/A", 0];

  //  Monthly comparison
  const monthlyData = transactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7); // "2026-04"

    if (!acc[month]) {
      acc[month] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      acc[month].income += t.amount;
    } else {
      acc[month].expense += t.amount;
    }

    return acc;
  }, {});

  const months = Object.keys(monthlyData).sort();
  const latestMonth = months.length ? months[months.length - 1] : "N/A";
  const latestData = monthlyData[latestMonth] || { income: 0, expense: 0 };

  //  Observation
  const observation = latestData.income > latestData.expense
    ? "You saved more than you spent this month. Great job!"
    : latestData.income < latestData.expense
      ? "Expenses exceeded income this month. Keep an eye on spending."
      : "Income and expenses are balanced this month.";

  const observationStyle = latestData.income > latestData.expense
    ? "text-emerald-700 bg-emerald-50"
    : latestData.income < latestData.expense
      ? "text-amber-800 bg-amber-50"
      : "text-slate-700 bg-slate-50";

  //  Total transactions
  const totalTransactions = transactions.length;

  //  Average expense
  const expenseList = transactions.filter(t => t.type === "expense");
  const totalExpense = expenseList.reduce((acc, t) => acc + t.amount, 0);
  const avgExpense = expenseList.length
    ? Math.round(totalExpense / expenseList.length)
    : 0;

  //  Savings rate
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const savingsRate = totalIncome
    ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
    : 0;

  //  Most frequent category
  const categoryCount = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});

  const mostFrequentCategory = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])[0] || ["N/A", 0];

  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-2">Reports</p>
        <h1 className="text-3xl font-semibold text-slate-900">Monthly performance overview</h1>
        <p className="mt-2 text-slate-600 max-w-2xl">
          A quick snapshot of your recent financial activity, spending trends, and savings health.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-200">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Top category</p>
          <p className="mt-4 text-2xl font-semibold text-slate-900">{highestCategory[0]}</p>
          <p className="mt-2 text-slate-500">₹{highestCategory[1].toLocaleString()}</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-200">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Latest month</p>
          <p className="mt-4 text-2xl font-semibold text-slate-900">{latestMonth}</p>
          <div className="mt-4 space-y-2 text-slate-600">
            <p>Income: <span className="font-semibold text-slate-900">₹{latestData.income.toLocaleString()}</span></p>
            <p>Expense: <span className="font-semibold text-slate-900">₹{latestData.expense.toLocaleString()}</span></p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-200">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Savings rate</p>
          <p className="mt-4 text-2xl font-semibold text-slate-900">{savingsRate}%</p>
          <p className="mt-2 text-slate-500">Your retained income after expenses.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-200">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Most frequent</p>
          <p className="mt-4 text-2xl font-semibold text-slate-900">{mostFrequentCategory[0]}</p>
          <p className="mt-2 text-slate-500">Appeared {mostFrequentCategory[1]} times</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-200">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Average expense</p>
          <p className="mt-4 text-2xl font-semibold text-slate-900">₹{avgExpense.toLocaleString()}</p>
          <p className="mt-2 text-slate-500">Average spend per expense transaction.</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-200">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Transactions</p>
          <p className="mt-4 text-2xl font-semibold text-slate-900">{totalTransactions}</p>
          <p className="mt-2 text-slate-500">Total entries recorded.</p>
        </div>
      </div>

      <div className={`mt-6 rounded-3xl p-6 border ${observationStyle} border-current/10`}>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Quick insight</p>
        <p className="mt-4 text-lg font-semibold">{observation}</p>
      </div>
    </div>
  );
}

export default Reports;
 