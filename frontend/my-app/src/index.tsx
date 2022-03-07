import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import Store from "./store/store";

import "./assets/zeroing.css";

interface IStore {
  store: Store;
}

const store = new Store();

export const Context = createContext<IStore>({
  store,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{ store }}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
