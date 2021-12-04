import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <Provider store={Store().store}>
      <BrowserRouter>
        <PersistGate persistor={Store().persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  rootElement
);
