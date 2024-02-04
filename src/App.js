import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./assets/normalize.css";
import Wallets from "./screens/Wallets";
import NotFoundScreen from "./screens/NotFoundScreen";
import OneWallet from "./screens/OneWallet";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Users from "./screens/Users";
import OneUser from "./screens/OneUser";
import EditWallet from "./screens/EditWallet";
import NewWallet from "./screens/NewWallet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Wallets />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/register" exact element={<Register />}></Route>
        <Route path="/wallet/:id" element={<OneWallet />} />
        <Route path="/wallet/edit/:id" element={<EditWallet />} />
        <Route path="/wallet/new" element={<NewWallet />} />
        <Route path="/users" exact element={<Users />}></Route>
        <Route path="/user/:id" exact element={<OneUser />}></Route>
        <Route path="*" exact element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
