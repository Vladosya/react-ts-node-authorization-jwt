import React from "react";
import { Routes, Route } from "react-router-dom";

import StartPage from "./components/StartPage";
import Registration from "./components/Registration";
import Authorization from "./components/Authorization";
import Menu from "./components/Menu";
import SuccessOp from "./components/SuccessOp";
import ErrorOp from "./components/ErrorOp";

import "./App.css";

const App = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/signin" element={<Authorization />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/actiongood" element={<SuccessOp />} />
        <Route path="/actionbad" element={<ErrorOp />} />
      </Routes>
    </div>
  );
};

export default App;
