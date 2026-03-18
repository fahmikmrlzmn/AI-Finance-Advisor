import React, { useState } from "react";
import api from "../api";

function AddTransaction({ fetchTransactions }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", { text, amount });
      setText("");
      setAmount("");
      fetchTransactions(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={addTransaction} className="transactionForm">
      <input
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button>Add</button>
    </form>
  );
}

export default AddTransaction;