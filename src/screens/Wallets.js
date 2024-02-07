import MyAppBar from "../components/MyAppBar";
import { Container, Typography, Grid, Stack } from "@mui/material";
import Wallet from "../components/Wallet";
import AddWallet from "../components/AddWallet";
import { useNavigate } from "react-router-dom";
import { AXIOS_METHOD, useApi } from "../hooks/useApi";
import Loader from "../components/Loader";

function Wallets() {
  const navigate = useNavigate();

  const [wallets, loading, error] = useApi(AXIOS_METHOD.GET, "/wallets");

  if (loading === false && error !== false) {
    navigate("/404");
    return null;
  }

  if (loading === true) {
    return <Loader />;
  }

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
