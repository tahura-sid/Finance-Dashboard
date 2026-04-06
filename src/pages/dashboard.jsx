import Card from "../components/dashboard/Card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

function Dashboard({ transactions }) {

  // 🔹 Summary calculations
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  // 🔹 Line chart data (balance over time)
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const balanceData = sorted.reduce((acc, t, index) => {
    const previousBalance = index > 0 ? acc[index - 1].balance : 0;
    const newBalance = previousBalance + (t.type === "income" ? t.amount : -t.amount);
    acc.push({
      date: new Date(t.date).toLocaleDateString(),
      balance: newBalance
    });
    return acc;
  }, []);

  // 🔹 Pie chart data (expense breakdown with percentages)
  const expenseData = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      const existing = acc.find(item => item.name === t.category);

      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }

      return acc;
    }, [])
    .sort((a, b) => b.value - a.value) // Sort by amount (largest first)
    .map(item => ({
      ...item,
      percentage: ((item.value / expenses) * 100).toFixed(1)
    }));

  const COLORS = [
    "#dc2626", // Red
    "#f59e0b", // Amber
    "#16a34a", // Green
    "#2563eb", // Blue
    "#7c3aed", // Purple
    "#ec4899", // Pink
    "#ea580c", // Orange
    "#0891b2", // Cyan
    "#84cc16", // Lime
    "#c2410c", // Brown
    "#6366f1", // Indigo
    "#be123c", // Rose
    "#0d9488", // Teal
    "#7c2d12", // Sienna
    "#581c87", // Violet
    "#0f766e", // Emerald
    "#92400e", // Yellow-brown
    "#1e40af", // Royal blue
    "#be185d", // Magenta
    "#059669"  // Jade
  ];

  // Custom label function for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="p-6">

      {/*  Heading */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/*  Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Balance" amount={balance} />
        <Card title="Income" amount={income} type="income" />
        <Card title="Expenses" amount={expenses} type="expense" />
      </div>

      {/*  Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/*  Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Balance Trend</h2>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={balanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/*  Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>

          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label={renderCustomLabel}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {expenseData.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-gray-600 font-medium">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;