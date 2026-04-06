import { useState, useEffect } from "react";
function Transactions({ role, transactions, setTransactions }) {
    console.log("Transactions component received transactions:", transactions)
    console.log("setTransactions function:", typeof setTransactions)



    //form state
    const [formData, setFormData] = useState({
        date: "",
        type: "income",
        amount: "",
        category: ""

    })
    //editing state
    const [editId, setEditId] = useState(null)
    const [editData, setEditData] = useState({
        type: "",
        amount: "",
        category: "",
        date: ""
    })

    //pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    //search state
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedType, setSelectedType] = useState("All")
    const [sortOption, setSortOption] = useState("idAsc")




    console.log("Transactions component rendered with transactions:", transactions)

    // Test localStorage function
    const testLocalStorage = () => {
        console.log("Testing localStorage...")
        const testData = { test: "data", timestamp: Date.now() }
        localStorage.setItem("test", JSON.stringify(testData))
        const retrieved = localStorage.getItem("test")
        console.log("localStorage test - saved:", testData)
        console.log("localStorage test - retrieved:", JSON.parse(retrieved))
    }

    // Call test on component mount
    useEffect(() => {
        testLocalStorage()
    }, [])

    //handling edit click
    const handleEdit = (transaction) => {
        setEditId(transaction.id)
        setEditData(transaction)
    }

    //hnadling the edit input chnage
    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }

    //Saving the edited transaction
    const handleSave = () => {
        setTransactions(
            transactions.map((t) => t.id === editId ? { ...editData, id: editId } : t)
        )

        setEditId(null)
    }

    //handling the input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    //Adding the transaction
    const handleAdd = () => {
        if (!formData.amount || !formData.category || !formData.date) {
            alert("Please fill all the the feilds")
            return;
        }

        const newId =
            transactions.length > 0
                ? Math.max(...transactions.map(t => t.id)) + 1
                : 1;

        const newTransaction = {
            id: newId,
            ...formData, amount: Number(formData.amount)
        }

        setTransactions([...transactions, newTransaction])
        setCurrentPage(1) // Reset to first page when adding

        //lets rest the  form too
        setFormData({
            type: "income",
            amount: "",
            category: "",
            date: ""
        })
    }

    //delete transaction function
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you wanna delete this transaction?")
        if (confirmDelete) {
            setTransactions(transactions.filter((t) => t.id !== id))
            setCurrentPage(1) // Reset to first page when deleting
        }
    }

    //filtering and sorting logic
    const filteredTransactions = transactions.filter((t) => {
        const matchesSearch = searchTerm === "" ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.amount.toString().includes(searchTerm) ||
            t.date.includes(searchTerm);

        const matchesType = selectedType === "All" || t.type === selectedType
        return matchesSearch && matchesType;
    })
        .sort((a, b) => {
            if (sortOption === "idAsc") {
                return a.id - b.id;
            }
            if (sortOption === "idDesc") {
                return b.id - a.id;
            }
            if (sortOption === "newest") {
                return new Date(b.date) - new Date(a.date);
            }
            if (sortOption === "oldest") {
                return new Date(a.date) - new Date(b.date);
            }
            if (sortOption === "high") {
                return b.amount - a.amount;
            }
            if (sortOption === "low") {
                return a.amount - b.amount;
            }
            return 0;
        });

    // Pagination calculations (after filtering)
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

    console.log("Filtering debug:", {
        totalTransactions: transactions.length,
        filteredTransactions: filteredTransactions.length,
        searchTerm,
        selectedType,
        currentPage,
        currentTransactions: currentTransactions.length
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Transactions</h1>
                <p className="text-slate-600 mb-8">Manage your financial transactions</p>

                {role === "admin" && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Add New Transaction</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                                <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="0.00"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="e.g., Salary"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex items-end">
                                <button onClick={handleAdd} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md">Add Transaction</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 mb-4">

                    {/* 🔍 Search */}
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1) // Reset to page 1 when search changes
                        }}
                        className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* 🔽 Type Filter */}
                    <select
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value)
                            setCurrentPage(1) // Reset to page 1 when filter changes
                        }}
                        className="border rounded-lg px-4 py-2 w-full md:w-1/4 focus:outline-none"
                    >
                        <option value="All">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    {/* 🔃 Sort */}
                    <select
                        value={sortOption}
                        onChange={(e) => {
                            setSortOption(e.target.value)
                            setCurrentPage(1) // Reset to page 1 when sort changes
                        }}
                        className="border rounded-lg px-4 py-2 w-full md:w-1/4 focus:outline-none"
                    >
                        <option value="idAsc">ID: Low → High</option>
                        <option value="idDesc">ID: High → Low</option>
                        <option value="newest">Date: Newest</option>
                        <option value="oldest">Date: Oldest</option>
                        <option value="high">Amount: High → Low</option>
                        <option value="low">Amount: Low → High</option>
                    </select>

                </div>


                {/* table*/}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                                    <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>

                                    {role === "admin" && <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>}
                                </tr>
                            </thead>

                            <tbody>
                                {currentTransactions.map((t, index) => (
                                    <tr key={t.id} className={`border-t border-slate-200 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'} hover:bg-blue-50 transition duration-150`}>
                                        <td className="px-6 py-4 text-sm text-slate-900 font-medium">{t.id}</td>

                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {editId === t.id ? (
                                                <input type="date" name="date" value={editData.date} onChange={handleEditChange} className="px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500" />
                                            ) : (
                                                t.date
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-sm">
                                            {editId === t.id ? (
                                                <select name="type" value={editData.type} onChange={handleEditChange} className="px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500">
                                                    <option value="income">Income</option>
                                                    <option value="expense">Expense</option>
                                                </select>
                                            ) : (
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{t.type}</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                            {editId === t.id ? (
                                                <input type="number" name="amount" value={editData.amount} onChange={handleEditChange} className="px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500" />
                                            ) : (
                                                `₹${t.amount.toLocaleString()}`
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {editId === t.id ? (
                                                <input type="text" name="category" value={editData.category} onChange={handleEditChange} className="px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500" />
                                            ) : (
                                                t.category
                                            )}
                                        </td>

                                        {role === "admin" && (
                                            <td className="px-6 py-4 text-sm space-x-2">
                                                {editId === t.id ? (
                                                    <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-medium transition duration-200">Save</button>
                                                ) : (
                                                    <button onClick={() => handleEdit(t)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded font-medium transition duration-200">Edit</button>
                                                )}
                                                <button onClick={() => handleDelete(t.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-medium transition duration-200">Delete</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="bg-white px-6 py-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-slate-700">
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} transactions
                        </div>
                        <div className="flex flex-wrap items-center justify-end gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            <div className="hidden md:flex flex-wrap items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1 text-sm border rounded-md ${currentPage === page
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Transactions;