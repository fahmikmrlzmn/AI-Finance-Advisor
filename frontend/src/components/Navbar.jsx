import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Navigate back to login page
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>AI Finance</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default NavBar;