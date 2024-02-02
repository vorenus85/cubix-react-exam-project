import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MyAppBar({ showLogin, showRegister }) {
  const navigate = useNavigate();
  const navigateToWallets = () => {
    navigate("/");
  };
  const navigateToUsers = () => {
    navigate("/users");
  };
  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyWallets
          </Typography>
          {showLogin && (
            <Button onClick={() => navigateToLogin()} color="inherit">
              Login
            </Button>
          )}
          {showRegister && (
            <Button onClick={() => navigateToRegister()} color="inherit">
              Register
            </Button>
          )}
          {!showLogin && !showRegister && (
            <Stack direction="row">
              <Button onClick={() => navigateToWallets()} color="inherit">
                Wallets
              </Button>
              <Button onClick={() => navigateToUsers()} color="inherit">
                Users
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
