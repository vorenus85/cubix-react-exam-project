import MyAppBar from "../components/MyAppBar";
import { Container, Typography, Grid } from "@mui/material";
import Wallet from "../components/Wallet";
import AddWallet from "../components/AddWallet";

const wallets = [
  {
    id: 1,
    balance: 150,
    name: "9 A.",
    description: "9 A. osztály tárcája",
  },
  {
    id: 2,
    balance: 50,
    name: "9 B.",
    description: "9 B. osztály tárcája",
  },
  {
    id: 3,
    balance: 100,
    name: "10 A.",
    description: "10 A. osztály tárcája",
  },
  {
    id: 4,
    balance: 20,
    name: "10 B.",
    description: "10 B. osztály tárcája",
  },
];

function Wallets() {
  const AddNewWallet = () => {
    console.log("trigger add new wallet modal");
  };

  return (
    <div>
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
          <AddWallet addNew={() => AddNewWallet()}></AddWallet>
        </Grid>
      </Container>
    </div>
  );
}

export default Wallets;
