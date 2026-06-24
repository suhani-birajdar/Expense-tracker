import React,{useState} from 'react'
import './component.css'

function AddExpense({onClose,onAddExpense}) {
  const [expenseName, setExpenseName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !date || !category || !amount || isNaN(amount) || amount <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      description: expenseName,
      date: date,
      category: category,
      amount: parseFloat(amount)
    };
    
    onAddExpense(newExpense);     
    onClose();              
    setExpenseName('');
    setDate('');
    setCategory('');
    setAmount('');
  };

  return (
    <div className='overlay'>
      <div className='popup'>
          <header>
              <h2 id='header-left'>Add Expense</h2>
              <button id='header-right' onClick={onClose}>X</button>
          </header>
          <hr></hr>
          <form onSubmit={handleSubmit}>
              <label>Expense Name<span>*</span></label>
              <input type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)}></input>

              <label>Date<span>*</span></label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>

              <label>Category<span>*</span></label>
              <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled>Select Category</option>
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Travel">Travel</option>
                <option value="Groceries">Grocery</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>

              <label>Amount<span>*</span></label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
              
              <button id='add' type="submit">Add Expense </button>
          </form>
      </div>
    </div>
  )
}

export default AddExpense