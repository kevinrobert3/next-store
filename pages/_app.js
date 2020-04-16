import "../styles/index.css";
import "../styles/main.css";
import NavBar from "../components/navbar";
import { createStore } from "redux";
import rootReducer from "../reducers/rootreducer";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
