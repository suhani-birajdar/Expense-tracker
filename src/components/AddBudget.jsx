import React,{useState} from 'react'
import './component.css'


function AddBudget({onAdd,onClose}) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const budget = parseFloat(input);
    if (!isNaN(budget)) {
      onAdd(budget); 
      setInput('');
      onClose();
    }
  };

  return (
    <div className='overlay'>
      <div className='popup'>
        <header>
            <h3 id='header-left'>Add Budget</h3>
            <button id='header-right' onClick={onClose}>X</button>
        </header>
        <hr></hr>
        <form onSubmit={handleSubmit}>
            <label>Amount<span>*</span></label><br></br>
            <input type="number" placeholder='Enter Amount' value={input} onChange={(e) => setInput(e.target.value)}></input><br></br>
            <button type="submit" id='add'>+ Add Budget</button>
        </form>
      </div>
    </div>
  )
}

export default AddBudget