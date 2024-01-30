import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Wallets from "./screens/Wallets";
import NotFoundScreen from "./screens/NotFoundScreen";
import OneWallet from "./screens/OneWallet";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Users from "./screens/Users";
import OneUser from "./screens/OneUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Wallets />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/register" exact element={<Register />}></Route>
        <Route path="/wallet/:id" element={<OneWallet />} />
        <Route path="/users" exact element={<Users />}></Route>
        <Route path="/user/:id" exact element={<OneUser />}></Route>
        <Route path="*" exact element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
