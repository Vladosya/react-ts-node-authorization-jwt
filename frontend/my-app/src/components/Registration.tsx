import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../index";

import "./Registration.css";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  const regRef = useRef<any>();
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("mousedown", (event: MouseEvent) => {
      if (regRef.current !== null) {
        if (!regRef.current.contains(event.target)) {
          navigate("/");
        }
      }
    });
  });

  const submitRegisterForm = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();
    let status = await store.registration(email, password);
    if (status === 200) {
      navigate({
        pathname: "/actiongood",
        search: "?fromPath=register",
      });
    } else {
      navigate({
        pathname: "/actionbad",
        search: "?fromPath=register",
      });
    }
  };

  return (
    <div className="registration">
      <div className="container">
        <div ref={regRef} className="wrapper">
          <div className="title">
            <span>Регистрация</span>
          </div>
          <form>
            <div className="row">
              <i className="fas fa-user"></i>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Введите e-mail"
                required
              />
            </div>
            <div className="row" style={{ marginTop: "30px" }}>
              <i className="fas fa-lock"></i>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Придумайте пароль"
                required
              />
            </div>
            <div className="row button" style={{ marginTop: "30px" }}>
              <input
                onClick={(event) => {
                  if (email.length && password.length > 8) {
                    submitRegisterForm(event);
                  }
                }}
                type="submit"
                value="Зарегистрироваться"
              />
            </div>
            <div className="signup-link">
              Not a member? <Link to="/Signin">Войти</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
