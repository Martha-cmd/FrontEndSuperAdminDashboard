import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Authentication/Login";
import Home from "../pages/Dashboard/Home";
import Analytics from "../pages/Dashboard/Body/Analytics";
import Users from "../pages/Dashboard/Body/Users";
import Register from "../pages/Authentication/Register";

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="/home" element={<Home />}>
          <Route index element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Index;
