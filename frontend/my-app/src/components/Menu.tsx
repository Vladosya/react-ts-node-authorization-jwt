import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../index";
import UserService from "../services/UserService";
import { IUsers } from "../types/services/UserService";

import "./Menu.css";

const Menu = observer(() => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  const logoutFunc = () => {
    store.logout();
    navigate("/");
  };

  const getUsers = async () => {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.log("Error get Users", error);
    }
  };

  if (store.isLoading) {
    return <div className="loading-menu">Загрузка...</div>;
  }

  return (
    <div className="menu">
      <div>
        <h2 className="info-activated">
          {store.user.isActivated
            ? "Аккаунт пользователя подтвержден"
            : "Аккаунт пользователя не подтвержден"}
        </h2>
      </div>
      <div className="btns-menu">
        <button onClick={getUsers} className="btn-menu btn-menu2">
          Получить пользователей
        </button>
        <button onClick={logoutFunc} className="btn-menu btn-menu2">
          Выйти
        </button>
      </div>
      {users.map((user) => {
        return (
          <div key={user.email} style={{ marginTop: "50px", color: "#fff" }}>
            {user.email}
          </div>
        );
      })}
    </div>
  );
});

export default Menu;
