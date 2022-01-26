// import styles from "../styles/Home.module.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import MainContainer from "../Container/MainContainer";
import { store } from "../Store/store";

const Home = () => (
  <Provider store={store}>
    <MainContainer />
  </Provider>
);

export default Home;
