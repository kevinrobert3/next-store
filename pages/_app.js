import "../styles/index.css";
import "../styles/main.css";
import NavBar from "../components/navbar";
import {createStore} from 'redux';


export default function MyApp({ Component, pageProps }) {
  return  <Component {...pageProps} />
}
