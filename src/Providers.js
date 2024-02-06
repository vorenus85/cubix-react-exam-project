import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./hooks/useAuth";
import { ModalContextProvider } from "./hooks/useModal";

export default function Providers({ children }) {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}
