import MyAppBar from "../components/MyAppBar";
import { Container, Typography, Grid, Stack } from "@mui/material";
import Wallet from "../components/Wallet";
import AddWallet from "../components/AddWallet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AXIOS_METHOD, doApiCall } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";

function Wallets() {
  const [wallets, setWallets] = useState([]);
  const navigate = useNavigate();

  const { sessionUser } = useAuth();

  useEffect(() => {
    doApiCall(
      AXIOS_METHOD.GET,
      "/wallets",
      (data) => {
        setWallets(data);
      },
      (apiError) => {
        console.log(apiError);
      }
    );
  }, []);

  return (
    <Stack>
      <MyAppBar />
      <Container maxWidth="md">
        <Typography variant="h4" my={2} mt={6}>
          Wallets
        </Typography>
        <Grid container spacing={2}>
          {wallets.map((wallet) => {
            return (
              <Wallet
                id={wallet.id}
                key={wallet.id}
                name={wallet.name}
                description={wallet.description}
                balance={wallet.balance}
              />
            );
          })}
          <AddWallet addNew={() => navigate("/wallet/new")}></AddWallet>
        </Grid>
      </Container>
    </Stack>
  );
}

export default Wallets;
