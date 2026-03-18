import React from "react";

function TransactionList({ transactions }) {
  return (
    <div className="transactionList">
      <h3>Transactions</h3>
      {transactions.map((t) => (
        <div key={t._id} className="transactionItem">
          <p>{t.text}</p>
          <span>${t.amount}</span>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;