import React, { useEffect, useState } from "react";
import api from "../api";
import TransactionList from "../components/TransactionList";
import AIChat from "../components/AiChat";
import AddTransaction from "../components/AddTransaction";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdvice = async () => {
    try {
      const res = await api.get("/ai");
      setAdvice(res.data.advice);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Your Financial Dashboard</h2>
        <button onClick={getAdvice}>Get AI Advice</button>
        {advice && <p style={{ marginTop: "1rem" }}>{advice}</p>}

        <AddTransaction fetchTransactions={fetchTransactions} />
        <TransactionList transactions={transactions} />
        <AIChat advice={advice} setAdvice={setAdvice} getAdvice={getAdvice} />
      </div>
    </div>
  );
}

export default Dashboard;