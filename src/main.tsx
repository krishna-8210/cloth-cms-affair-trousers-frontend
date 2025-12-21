import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { Provider as Redux_Provider } from 'react-redux'
import store from './redux/store.tsx'
ReactDOM.createRoot(document.getElementById("root")!).render(
<Redux_Provider store={store}>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
    </Redux_Provider>

);
