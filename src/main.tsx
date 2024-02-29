// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "@/redux/store.ts";
import { Provider } from "react-redux";
// import SocketProvider from "./constant/socket/Socket.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      {/* <SocketProvider> */}
        <App />
      {/* </SocketProvider > */}
    </Provider>
  </>
);
