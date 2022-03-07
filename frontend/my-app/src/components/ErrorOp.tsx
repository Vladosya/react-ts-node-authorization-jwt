import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./ErrorOp.css";

const ErrorOp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const continueBack = () => {
    if (location.search.split("=")[1] === "register") {
      navigate("/signup");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="error-op">
      <div id="container">
        <div id="error-box">
          <div className="dot"></div>
          <div className="dot two"></div>
          <div className="face2">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth sad"></div>
          </div>
          <div className="shadow move"></div>
          {location.search.split("=")[1] === "register" ? (
            <div className="message">
              <h1 className="alert">Ошибка!</h1>
              <p>
                Ошибка регистрации. <br /> Нажмите на кнопку, чтобы попробовать снова
              </p>
            </div>
          ) : (
            <div className="message">
              <h1 className="alert">Ошибка!</h1>
              <p>
                Ошибка авторизации. <br /> Нажмите на кнопку, чтобы попробовать снова
              </p>
            </div>
          )}
          <button onClick={continueBack} className="button-box">
            <h1 className="red">Ещё раз</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorOp;
