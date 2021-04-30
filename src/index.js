import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContactsProvider } from "./contexts/ContactsContext";
import { ConversationsProvider } from "./contexts/ConversationsContext";
import { SocketsProvider } from "./contexts/SocketsContext";
import { testProvider } from "./contexts/TestContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <head>
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css'
        integrity='sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=='
        crossOrigin='anonymous'
      />
    </head>

    <Provider store={store}>
      <testProvider>
        <SocketsProvider>
          <ContactsProvider>
            <ConversationsProvider>
              <App />
            </ConversationsProvider>
          </ContactsProvider>
        </SocketsProvider>
      </testProvider>
    </Provider>

    <script
      src='https://code.jquery.com/jquery-1.12.4.min.js'
      integrity='sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ'
      crossorigin='anonymous'
    ></script>
    <script
      src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js'
      integrity='sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf'
      crossorigin='anonymous'
    ></script>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
