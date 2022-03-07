import React from "react";
import { useNavigate } from "react-router-dom";

import "./StartPage.css";
import logoAppl from "../assets/logo-site.jpg";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="startpage__logo">
        <img src={logoAppl} alt="logo-site" />
      </div>
      <div className="startpage__btn_left">
        <button onClick={() => navigate("/signin")} className="startpage__btn_l">
          Авторизация
        </button>
      </div>
      <div className="startpage__btn_right">
        <button onClick={() => navigate("/signup")} className="button-49">
          Регистрация
        </button>
      </div>
    </div>
  );
};

export default StartPage;
