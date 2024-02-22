import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./hooks/useAuth";
import { ModalContextProvider } from "./hooks/useModal";
import { SnackbarProvider } from "notistack";

export default function Providers({ children }) {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>{children}</BrowserRouter>
        </SnackbarProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}
