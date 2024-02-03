import MyAppBar from "../components/MyAppBar";
import {
  Container,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { UserButton } from "../components/UserButton";

const balance = 400;

const usersWithAccess = [
  {
    name: "User 1",
    id: 1,
  },
  {
    name: "User 2",
    id: 2,
  },
  {
    name: "User 3",
    id: 3,
  },
];

const transactions = [
  {
    id: 1,
    name: "User 1",
    amount: 100,
    description: "Lorem ipsum dolot sit amet",
    date: new Date("2024-02-02 18:15"),
  },
  {
    id: 2,
    name: "User 2",
    amount: 150,
    description: "Lorem ipsum dolot sit amet",
    date: new Date("2024-01-29 09:20"),
  },
  {
    id: 3,
    name: "User 3",
    amount: 50,
    description: "Lorem ipsum dolot sit amet",
    date: new Date("2024-01-27 7:45"),
  },
  {
    id: 4,
    name: "User 1",
    amount: 100,
    description: "Lorem ipsum dolot sit amet",
    date: new Date("2024-01-15 16:32"),
  },
];
function OneWallet() {
  const walletName = "Wallet 1";

  const addNewTransaction = () => {
    console.log("Open add new transaction modal");
  };

  const navigate = useNavigate();

  return (
    <div>
      <MyAppBar />
      <Container maxWidth="md">
        <Typography variant="h4" my={2} mt={6}>
          {walletName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Stack>
                    <Typography variant="body1">Balance</Typography>
                    <Typography variant="h4">${balance}</Typography>
                  </Stack>
                  <Stack>
                    <Avatar>
                      <CurrencyExchangeIcon />
                    </Avatar>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" mb={2} mt={4}>
          Users with access
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          {usersWithAccess.map((user) => (
            <UserButton id={user.id} key={user.id} name={user.name} />
          ))}
        </Stack>
        <Stack
          direction="row"
          my={2}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack>
            <Typography variant="h5">Transactions</Typography>
          </Stack>
          <Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addNewTransaction()}
            >
              Add new transaction
            </Button>
          </Stack>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Created by</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell align="right">
                    {moment(transaction.date).format("YYYY.MM.DD.")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default OneWallet;
