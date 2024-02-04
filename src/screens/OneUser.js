import MyAppBar from "../components/MyAppBar";
import {
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import moment from "moment";
import WalletsWithAccess from "../components/WalletsWithAccess";
import { useNavigate } from "react-router-dom";

const userName = "User 1";

const walletsWithAccess = [
  {
    name: "Wallet 1",
    id: 1,
  },
  {
    name: "Wallet 2",
    id: 2,
  },
  {
    name: "Wallet 3",
    id: 3,
  },
];

const transactions = [
  {
    id: 1,
    name: "Wallet 1",
    amount: 100,
    description: "Lorem ipsum dolot sit amet",
    date: new Date("2024-02-02 18:15"),
  },
  {
    id: 2,
    name: "Wallet 2",
    amount: 150,
    description: "Lorem ipsum dolot sit amet",
    date: new Date("2024-01-29 09:20"),
  },
  {
    id: 3,
    name: "Wallet 3",
    amount: 50,
    description: "Lorem ipsum dolot sit amet",
    date: new Date("2024-01-27 7:45"),
  },
  {
    id: 4,
    name: "Wallet 1",
    amount: 100,
    description: "Lorem ipsum dolot sit amet",
    date: new Date("2024-01-15 16:32"),
  },
];

function OneUser() {
  const navigate = useNavigate();

  const handleWalletClick = (event) => {
    navigate(`/wallet/${event}`);
  };

  const handleWalletDelete = (event) => {
    // confirm modal
    console.log("handleWalletDelete", event);
  };

  return (
    <Stack>
      <MyAppBar />
      <Container maxWidth="md">
        <Typography variant="h4" my={2} mt={6}>
          {userName}
        </Typography>

        <WalletsWithAccess
          walletsWithAccess={walletsWithAccess}
          handleClick={handleWalletClick}
          handleDelete={handleWalletDelete}
        />

        <Typography variant="h5" my={2}>
          Transactions
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Wallet</TableCell>
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
    </Stack>
  );
}

export default OneUser;
