import MyAppBar from "../components/MyAppBar";
import {
  Container,
  Typography,
  Grid,
  Stack,
  Button,
  LinearProgress,
} from "@mui/material";
import Wallet from "../components/Wallet";
import { Navigate, useNavigate } from "react-router-dom";
import { AXIOS_METHOD, useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";

function Wallets() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [wallets, loading, error] = useApi(AXIOS_METHOD.GET, "/wallets");

  if (loading === false && error !== false) {
    return <Navigate to="/404" />;
  }

  return (
    <Stack pb={5}>
      <MyAppBar />
      {loading === true && (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      )}
      <Container maxWidth="md">
        <Stack
          direction="row"
          my={2}
          mt={6}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack>
            <Typography variant="h4">Wallets</Typography>
          </Stack>
          {isAdmin && (
            <Stack>
              <Button
                variant="contained"
                onClick={() => navigate("/wallet/new")}
              >
                Add new wallet
              </Button>
            </Stack>
          )}
        </Stack>

        <Grid container spacing={2}>
          {loading === false &&
            wallets &&
            wallets.map((wallet) => {
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
        </Grid>
      </Container>
    </Stack>
  );
}

export default Wallets;
