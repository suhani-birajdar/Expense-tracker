import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import './component.css';

// ✅ Colors matching your screenshot
const COLORS = {
  'Travel': '#7899e6ff'  ,
  'Groceries': '#f8a2b2ff',    // Pink
  'Food & Drink': '#f0a05fff', // Orange
  'Health': '#20BF6B',       // Green
  'Other' : '#A55EEA',         //Purple
};

// ✅ Custom legend component


const Charts = ({ expenses }) => {
  // Group by category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Group by month
  const monthlyTotals = expenses.reduce((acc, exp) => {
    const date = parseISO(exp.date);
    const month = format(date, 'MMM');
    acc[month] = (acc[month] || 0) + exp.amount;
    return acc;
  }, {});

  const barData = Object.entries(monthlyTotals).map(([month, amount]) => ({
    month,
    amount,
  }));

  const CATEGORY_ORDER = ["Travel", "Groceries", "Food & Drink", "Health", "Other"];

  return (
    <div className="chart-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* ✅ Legend */}
      <div style={{ width: '15%', height: 300,display: "flex", flexDirection: "column", gap: "0.5rem",padding:"50px 0px" }}>
        <h3 style={{ fontWeight: "bold" }}>Expense Chart</h3>
        <div style={{padding: "50px 0px"}}>
          {CATEGORY_ORDER.map((cat) => (
          <div key={cat} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 1,
                height: 1,
                borderRadius: "50%",
                backgroundColor: COLORS[cat],
                marginRight: 8,
              }}
            ></div>
            <span>{cat}</span>
          </div>
        ))}
        </div>
      </div>

      {/* Donut Chart */}
      <div style={{ width: '25%', height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',gap: "0.5rem",padding:"20px 0px" }}>
          <ResponsiveContainer>
            <PieChart style={{position: "relative"}}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name] ||'#FD9644'} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      {/* Bar Chart */}
      <div style={{ width: '55%', height: 300 }}>
        <h3 style={{ textAlign: 'center' }}>Expenses Tracker</h3>
        <ResponsiveContainer>
          <BarChart data={barData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4B7BEC" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
