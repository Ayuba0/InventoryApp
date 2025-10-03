import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Report from "./pages/Report";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) setUser(loggedInUser);
    }, []);

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/products" element={<Products user={user} />} />
        <Route path="/sales" element={<Sales user={user} />} />
        <Route path="/report" element={<Report user={user} />} />
        </Route>
      </Routes>
    </Router>
  )

}

export default App;

