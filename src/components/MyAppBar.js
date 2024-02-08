import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function MyAppBar({ showLogin, showRegister }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate("/")}
          >
            MyWallets
          </Typography>
          {showLogin && (
            <Button onClick={() => navigate("/login")} color="inherit">
              Login
            </Button>
          )}
          {showRegister && (
            <Button onClick={() => navigate("/register")} color="inherit">
              Register
            </Button>
          )}
          {!showLogin && !showRegister && (
            <Stack direction="row">
              <Button onClick={() => navigate("/")} color="inherit">
                Wallets
              </Button>
              <Button onClick={() => navigate("/users")} color="inherit">
                Users
              </Button>
              <Button onClick={logout} color="inherit">
                Logout
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
