import React from "react";

function AIChat({ advice, setAdvice, getAdvice }) {
  return (
    <div className="aiBox">
      <h3>AI Financial Advice</h3>
      <button onClick={getAdvice}>Analyze My Spending</button>
      <p>{advice}</p>
    </div>
  );
}

export default AIChat;