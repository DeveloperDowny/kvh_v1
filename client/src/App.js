import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestComponent from "./components/test";
import Test2 from "./components/Test2";
import Layout from "./Layout";
import Login from "./CFG components/Login";
import SignupCardOg from "./CFG components/SignUp";

const App = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/auth/signup" element={<SignupCardOg />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
