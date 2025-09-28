import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/authentication/Login";
import Home from "../pages/dashboard/Home";
import Analytics from "../pages/dashboard/Body/Analytics";
import Users from "../pages/dashboard/Body/Users";
import Register from "../pages/Authentication/Register";

const Index = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/home" element={<Home />} />
    //     <Route path="/analytics" element={<Analytics />} />
    //     <Route path="/users" element={<Users />} />
    //   </Routes>
    // </Router>
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
