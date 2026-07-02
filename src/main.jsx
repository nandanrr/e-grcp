import "./index.css";
import ReactDOM from "react-dom/client";

import App from "./App";

import { Provider } from "react-redux";
import { store, persistor } from "./store/store";

import { PersistGate } from "redux-persist/integration/react";

import ErrorBoundary from "./components/common/ErrorBoundary";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <Provider store={store}>

    <PersistGate
      loading={null}
      persistor={persistor}
    >

      <ErrorBoundary>

        <App />

      </ErrorBoundary>

    </PersistGate>

  </Provider>

);