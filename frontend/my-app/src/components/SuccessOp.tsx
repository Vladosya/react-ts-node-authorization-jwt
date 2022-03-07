import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./SuccessOp.css";

const SuccessOp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const continueStep = () => {
    if (location.search.split("=")[1] === "register") {
      navigate("/signin");
    } else {
      navigate("/menu");
    }
  };

  return (
    <div className="success-op">
      <div id="container">
        <div id="success-box">
          <div className="dot"></div>
          <div className="dot two"></div>
          <div className="face">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth happy"></div>
          </div>
          <div className="shadow scale"></div>
          {location.search.split("=")[1] === "register" ? (
            <div className="message">
              <h1 className="alert">Успешно!</h1>
              <p>Вы, успешно зарегистрировались.</p>
            </div>
          ) : (
            <div className="message">
              <h1 className="alert">Успешно!</h1>
              <p>Вы, успешно Авторизовались.</p>
            </div>
          )}
          <button onClick={continueStep} className="button-box">
            <h1 className="green">Продолжить</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessOp;
