import { Provider } from "react-redux";
import store from "./rtk/store";
import Layout from "./Layout";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
