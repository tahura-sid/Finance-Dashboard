import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './pages/dashboard'
import Reports from './pages/reports'
import Transactions from './pages/transactions'
import Sidebar from './components/Layout/Sidebar/sidebar'
import Topbar from './components/Topbar'
import './App.css'

const initialTransactions = [  { id: 1, date: "2026-04-01", type: "income", amount: 25000, category: "Salary" },
  { id: 2, date: "2026-04-02", type: "expense", amount: 1500, category: "Groceries" },
  { id: 3, date: "2026-04-03", type: "expense", amount: 800, category: "Transport" },
  { id: 4, date: "2026-04-04", type: "expense", amount: 1200, category: "Dining" },
  { id: 5, date: "2026-04-05", type: "income", amount: 3000, category: "Freelance" },
  { id: 6, date: "2026-04-06", type: "expense", amount: 2000, category: "Shopping" },
  { id: 7, date: "2026-04-07", type: "expense", amount: 500, category: "Mobile Recharge" },
  { id: 8, date: "2026-04-08", type: "income", amount: 1500, category: "Gift" },
  { id: 9, date: "2026-04-09", type: "expense", amount: 1000, category: "Electricity Bill" },
  { id: 10, date: "2026-04-10", type: "expense", amount: 700, category: "Internet Bill" },
  { id: 11, date: "2026-04-11", type: "income", amount: 2000, category: "Bonus" },
  { id: 12, date: "2026-04-12", type: "expense", amount: 1800, category: "Health" }
]

function App() {
  //role state for access control (admin, viewer)
  const [role, setRole] = useState("viewer")

  //sidebar state for responsive design
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false)
    }
  }

  // transactions state with localStorage persistence
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        console.log("Loaded transactions from localStorage:", parsed)
        return parsed
      } catch (error) {
        console.error("Error parsing localStorage data:", error)
      }
    }
    console.log("No transactions in localStorage, using initial transactions:", initialTransactions)
    return initialTransactions
  })

  useEffect(() => {
    console.log("useEffect triggered - saving transactions to localStorage:", transactions)
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  console.log("Current transactions state:", transactions)

  return(
    <div className={`app-layout ${isSidebarOpen ? "" : "sidebar-closed"}`}>
      <Sidebar isOpen={isSidebarOpen} onNavigate={closeSidebar} />

      <div className="app-content">
        <Topbar role={role} setRole={setRole} onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>

        <Routes>
          <Route path="/" element={<Dashboard transactions={transactions}/>} />
          <Route path="/transactions" element={<Transactions role={role} transactions={transactions} setTransactions={setTransactions}/>} />
          <Route path="/reports" element= {<Reports transactions={transactions}/>} />
        </Routes>

      </div>
    </div>
  )
}

export default App
