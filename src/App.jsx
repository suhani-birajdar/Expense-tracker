import React, { useState } from 'react';
import './App.css';
import AddBudget from './components/AddBudget.jsx';
import EditExp from './components/editExp';
import AddExp from './components/AddExpense.jsx';
import search from './assets/search-icon.png';
import travel from './assets/travel-icon.png';
import health from './assets/health-icon.png';
import grocery from './assets/grocery-icon.png';
import food from './assets/food-icon.png';
import img from './assets/img.png';
import Card from './components/card';
import CategoryButton from "./components/Buttons.jsx";
import Charts from './components/Charts';
import Header from './components/Header.jsx';

function App() {
  
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddExp, setShowAddExp] = useState(false);
  const [showEditExp, setShowEditExp] = useState(false);
  const [editExpenseData, setEditExpenseData] = useState(null);

  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget");
    return savedBudget ? Number(savedBudget) : 0;
  });

  const openAddBudget = () => setShowAddBudget(true);
  const closeAddBudget = () => setShowAddBudget(false);
  const openAddExp = () => setShowAddExp(true);
  const closeAddExp = () => setShowAddExp(false);
  const closeEditExp = () => setShowEditExp(false);

  const handleAddBudget = (budget) => {
    setBudget(budget);  
    setShowAddBudget(false);  
  }

  

  const openEditExp = (expense) => {
    setEditExpenseData(expense);
    setShowEditExp(true);
  };

  const handleAddExpense = (expense) => {
    if (editExpenseData) {
  
      const updated = expenses.map((e) =>
        e.id === expense.id ? expense : e
      );
      setExpenses(updated);
      setEditExpenseData(null);
    } else {
      setExpenses([...expenses, expense]);

    }
    setShowAddExp(false);
    setShowEditExp(false);

    const SearchExpense = (expense) => {
      SearchExpense()
    }
  };

  
    React.useEffect(() => {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);
    React.useEffect(() => {
      localStorage.setItem("budget", budget);
    }, [budget]);

  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  const categories = [
  { name: "All Expenses", imgSrc: img, className: "actionbutton"},
  { name: "Food & Drinks", imgSrc: food,className: "activebutton" },
  { name: "Groceries", imgSrc: grocery ,className: "activebutton"},
  { name: "Travel", imgSrc: travel ,className: "activebutton"},
  { name: "Health", imgSrc: health ,className: "activebutton"},
];

const [active, setActive] = useState("All Expenses");

const filteredExpenses = active === "All Expenses" ? expenses : expenses.filter((e) => e.category === active);

const handleUpdateExpense = (updatedExpense) => {
  setExpenses(prev =>
    prev.map(exp =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    )
  );
};



const openSearch = () => {
  setisSearchOpen(true);
};


  return (
    <>
    <Header />

      <div className='main'>
        <p className='greeting'>Hello, Suhani Birajdar</p>
      
        <div className='container'>
          <Card title="Total Budget" amount={budget} bgColor="#F2F3FF" />
          <Card title="Total Expenses" amount={totalExpenses} />
          <Card title="Remaining Budget" amount={budget - totalExpenses} />
        </div>

        <div id='options' style={{ width: '90%' }}>
          <button className='search'><img src={search} alt="search" onClick={openSearch}/>Search</button>
          <div className="category">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.name}
                name={cat.name}
                imgSrc={cat.imgSrc}
                isActive={active === cat.name}
                onClick={() => setActive(cat.name)}
              />
            ))}

            <button className='actionbutton' onClick={openAddBudget}>
              + Add Budget
            </button>
            {showAddBudget && <AddBudget onAdd={handleAddBudget} onClose={closeAddBudget} />}
            <button className='actionbutton' onClick={openAddExp}>
              + Add Expense
            </button>
            {showAddExp && <AddExp onAddExpense={handleAddExpense} onClose={closeAddExp} />}
          </div>
        </div>
      </div>

      <div className='chart-conatiner'>
        <Charts expenses={filteredExpenses} />
      </div>

      <div>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Sr.</th>                  
                <th>Expense</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp, index) => (
                <tr key={exp.id}>                    
                  <td>{index + 1}</td>
                  <td>{exp.description}</td>
                  <td>{exp.date}</td>
                  <td>{exp.category}</td>
                  <td>₹{exp.amount.toFixed(2)}</td>
                  <td>
                    <button onClick={() => openEditExp(exp)} style={{backgroundColor: '#F2F3FF'}}>✏️ Edit</button>
                    <button onClick={() => handleDelete(exp.id)} style={{backgroundColor:' #FFE1E1'}}>🗑️ Delete</button>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan="6" >No expenses added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {showEditExp && <EditExp onClose={closeEditExp} existingExpense={editExpenseData} onUpdateExpense={handleUpdateExpense}/>}
      </div>
    </>
  );
}

export default App;