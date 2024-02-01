import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MyAppBar() {
  const navigate = useNavigate();
  const navigateToWallets = () => {
    navigate("/");
  };
  const navigateToUsers = () => {
    navigate("/users");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyWallets
          </Typography>
          <Button onClick={() => navigateToWallets()} color="inherit">
            Wallets
          </Button>
          <Button onClick={() => navigateToUsers()} color="inherit">
            Users
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
