import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../index";

import "./Authorization.css";

const Authorization = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  const authRef = useRef<any>();
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("mousedown", (event: MouseEvent) => {
      if (authRef.current !== null) {
        if (!authRef.current.contains(event.target)) {
          navigate("/", { replace: true });
        }
      }
    });
  });

  const submitAuthorizationForm = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();
    let status = await store.login(email, password);
    if (status === 200) {
      navigate({
        pathname: "/actiongood",
        search: "?fromPath=authorization",
      });
    } else {
      navigate({
        pathname: "/actionbad",
        search: "?fromPath=authorization",
      });
    }
  };

  return (
    <div className="autorization">
      <div className="container">
        <div ref={authRef} className="wrapper">
          <div className="title">
            <span>Авторизация</span>
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
                    submitAuthorizationForm(event);
                  }
                }}
                type="submit"
                value="Войти"
              />
            </div>
            <div className="signup-link">
              Not a member?
              <Link to="/Signup">Зарегистрироваться</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
