import "../styles/index.css";
import "../styles/main.css";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../store/reducers/rootreducer";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
