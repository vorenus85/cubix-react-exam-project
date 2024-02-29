import { Navigate, Routes, Route } from "react-router-dom";
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
import MyTransactions from "./screens/MyTransactions";
import EditWallet from "./screens/EditWallet";
import NewWallet from "./screens/NewWallet";
import Providers from "./Providers";
import { useAuth } from "./hooks/useAuth";

function ProtectedPage({ children }) {
  const { authToken } = useAuth();
  if (authToken === false) {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
}

function App() {
  return (
    <Providers>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedPage>
              <Wallets />
            </ProtectedPage>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/wallet/:id"
          element={
            <ProtectedPage>
              <OneWallet />
            </ProtectedPage>
          }
        />
        <Route
          path="/wallet/edit/:id"
          element={
            <ProtectedPage>
              <EditWallet />
            </ProtectedPage>
          }
        />
        <Route
          path="/wallet/new"
          element={
            <ProtectedPage>
              <NewWallet />
            </ProtectedPage>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedPage>
              <Users />
            </ProtectedPage>
          }
        ></Route>
        <Route
          path="/my-transactions"
          element={
            <ProtectedPage>
              <MyTransactions />
            </ProtectedPage>
          }
        ></Route>
        <Route path="/404" element={<NotFoundScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Providers>
  );
}

export default App;
