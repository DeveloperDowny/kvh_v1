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
import generateRandomGraphData from "./sampleData/graphData";
import GraphComponent from "./components/GraphComponent";
import GraphVisualization from "./components/GraphViz";
import Label from "./components/labels/Label";
import Dashboard from "./components/Dashboard/Dashboard";
const App = () => {
  const graphData = generateRandomGraphData();

  // return (
  //   <div className="App">
  //     <h1>Sample Graph using vis-react</h1>
  //     {/* <GraphComponent graphData={graphData} /> */}
  //     <div>
  //       <GraphVisualization />
  //     </div>
  //   </div>
  // );
  

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/auth/signup" element={<SignupCardOg />} />
          <Route path="/boards/:board_id" element={<GraphVisualization />} />
          <Route path="/labels" element={<Label />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
