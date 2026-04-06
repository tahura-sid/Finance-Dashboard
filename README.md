# 💰 Finance Dashboard App

A modern, responsive **Finance Dashboard Web Application** built using React that allows users to manage, track, and analyze their financial transactions with powerful analytics and visualization.

---

## 🚀 Live Demo

🔗 https://tahura-finance-app.netlify.app/

---

## ✨ Features

### 📊 Dashboard & Data Visualization

* 💰 Displays:

  * Total Balance
  * Total Income
  * Total Expenses
* 📈 **Balance Trend (Line Chart)**

  * Shows how balance evolves over time
* 🥧 **Expense Breakdown (Pie Chart)**

  * Category-wise expense distribution
  * Percentage labels for better insights

---

### 💳 Transactions Management

* ➕ Add transactions *(Admin only)*
* ✏️ Inline edit functionality
* 🗑️ Delete transactions with confirmation
* 🔍 Advanced search:

  * Category, type, amount, date
* 🔽 Filter by:

  * Income / Expense
* 🔃 Sort by:

  * ID (asc/desc)
  * Date (newest/oldest)
  * Amount (high/low)
* 📄 Pagination:

  * Efficient handling of large data

---

### 📈 Reports & Insights

* 🏆 Highest spending category
* 📅 Monthly income vs expense comparison
* 📊 Savings rate calculation
* 🔁 Most frequent transaction category
* 💸 Average expense analysis
* 📦 Total number of transactions
* 🧠 Smart financial observation:

  * Detects whether user is saving or overspending

---

### 🔐 Role-Based Access Control

* **Admin**

  * Full control (Add, Edit, Delete)
* **Viewer**

  * Read-only access

---

### 💾 Data Persistence

* Transactions stored in **localStorage**
* Data remains intact after refresh

---

### 📱 Responsive Design

* Fully responsive across devices
* Sidebar adapts for mobile screens
* Clean UI built with Tailwind CSS

---

## 🛠️ Tech Stack

* ⚛️ React (Vite)
* 🎨 Tailwind CSS
* 🔀 React Router
* 📊 Recharts (for charts)
* 💾 LocalStorage

---

## 📂 Folder Structure

```
finance-dashboard/
│
├── public/
│   ├── _redirects
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── dashboard/
│   │   │   └── Card.jsx
│   │   ├── Layout/
│   │   │   └── Sidebar/
│   │   │       ├── sidebar.jsx
│   │   │       └── Sidebar.css
│   │   └── Topbar.jsx
│   │
│   ├── pages/
│   │   ├── dashboard.jsx
│   │   ├── transactions.jsx
│   │   └── reports.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── index.html
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/tahura-sid/Finance-Dashboard.git
```

### 2. Navigate to project folder

```bash
cd finance-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the app

```bash
npm run dev
```

### 5. Open in browser

```
http://localhost:5173
```

---

## 🧠 Key Implementations

### 🔄 Centralized State Management

* Transactions managed in `App.jsx`
* Passed as props to all pages

---

### 💾 LocalStorage Integration

```js
useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions))
}, [transactions])
```

---

### 🔍 Filtering + Sorting + Search

* Combined filtering logic
* Dynamic sorting system
* Real-time search updates

---

### 📄 Pagination System

* Displays limited items per page
* Automatically resets on filter/search

---

### 📊 Data Analytics Logic

* Monthly aggregation
* Category-based grouping
* Savings rate calculation
* Dynamic insights generation

---

## 📈 Future Improvements

* 📊 Add more advanced charts (bar, area)
* 🔐 Authentication system (login/signup)
* ☁️ Backend integration (Firebase / MongoDB)
* 📅 Custom date range filtering
* 🌙 Dark mode support

---

## 🤝 Contributing

Feel free to fork this repo and contribute!

---

## 👩‍💻 Author

**Tahura Siddiqua**
Aspiring Software Developer

---
