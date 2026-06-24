import React, { useState, useEffect } from 'react';
import './component.css'

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex",
    alignItems: "center", justifyContent: "center",zIndex: 999
  },
  popup: {
    background: "#fff", padding: "20px", borderRadius: "10px", width: "500px",zIndex: 1000
  }
};

const EditExp = ({ onUpdateExpense, onClose, existingExpense }) => {
  const [expenseName, setExpenseName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (existingExpense) {
      setExpenseName(existingExpense.description || '');
      setDate(existingExpense.date || '');
      setCategory(existingExpense.category || '');
      setAmount(existingExpense.amount || '');
    }
  }, [existingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expenseName || !date || !category || !amount || isNaN(amount)) {
      alert("Please fill all fields correctly.");
      return;
    }

    const updatedExpense = {
      ...existingExpense,
      description: expenseName,
      date,
      category,
      amount: parseFloat(amount)
    };
    onUpdateExpense(updatedExpense);
    
    setExpenseName('');
    setDate('');
    setCategory('');
    setAmount('');
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <header>
          <h2 id="header-left">Edit Expense</h2>   
          <button id="header-right" onClick={onClose}>X</button>
        </header>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <label>Expense Name<span>*</span></label>
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />

          <label>Date<span>*</span></label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Category<span>*</span></label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="Travel">Travel</option>
            <option value="Groceries">Groceries</option>
            <option value="Health">Health</option>
          </select>

          <label>Amount<span>*</span></label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button id="add" type="submit">Update Expense</button>
        </form>
      </div>
    </div>
  );
};

export default EditExp;
