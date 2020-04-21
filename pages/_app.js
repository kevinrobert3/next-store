import "../styles/index.css";
import "../styles/main.css";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../store/reducers/rootreducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import config from "../lib/config";

import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";

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
  // store = createStore(
  //   persistReducer(persistConfig, rootReducer),
  //   compose(
  //     applyMiddleware(
  //       thunk.withExtraArgument({
  //         getFirebase,
  //         getFirestore,
  //       })
  //     ),
  //     reduxFirestore(config),
  //    // reactReduxFirebase(config)
  //   )
  // );
  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(rootReducer, applyMiddleware(thunk));

  // store = createStore(
  //   rootReducer,
  //   compose(
  //     applyMiddleware(
  //       thunk.withExtraArgument({
  //         getFirebase,
  //         getFirestore,
  //       })
  //     ),
  //     reduxFirestore(config),
  //    // reactReduxFirebase(config)
  //   )
  // );
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
