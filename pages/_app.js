import "../styles/index.css";
import "../styles/main.css";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../store/reducers/rootreducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let store;

const isClient = typeof window !== "undefined";

if (isClient) {
  const { persistReducer } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;
  const persistConfig = {
    key: "root",
    storage,
  };
  store = createStore(
    persistReducer(persistConfig, rootReducer),
    applyMiddleware(thunk)
  );
  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(rootReducer, applyMiddleware(thunk));
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={store.__PERSISTOR} loading={null}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
