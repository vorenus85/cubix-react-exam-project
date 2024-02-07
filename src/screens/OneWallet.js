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
  Button,
  Stack,
  IconButton,
} from "@mui/material";

import moment from "moment";
import BalanceCard from "../components/BalanceCard";
import UsersWithAccess from "../components/UsersWithAccess";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import { useModals, MODALS } from "../hooks/useModal";
import { useEffect, useState } from "react";
import { AXIOS_METHOD, doApiCall } from "../hooks/useApi";

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
  const [wallet, setWallet] = useState(false);
  const { id } = useParams();

  const { showModal } = useModals();
  const navigate = useNavigate();
  useEffect(() => {
    doApiCall(
      AXIOS_METHOD.GET,
      `/wallet/${id}`,
      (data) => {
        setWallet(data);
      },
      (apiError) => {
        console.log(apiError);
      }
    );
  }, [id, setWallet]);

  const addNewTransaction = () => {
    console.log("Open add new transaction modal");
  };

  const handleUserClick = (event) => {
    navigate(`/user/${event}`);
  };

  const handleDeleteAccess = (event) => {
    // confirm modal
    console.log("handle delete access user to wallet", event);
  };

  const handleDeleteTransactionModal = (id) => {
    console.log(id);
  };

  return (
    <Stack>
      <MyAppBar />
      <Container maxWidth="md">
        <Typography variant="h4" mt={6}>
          {wallet?.name}
        </Typography>
        <Typography variant="body2" mb={2}>
          {wallet?.description}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <BalanceCard balance={wallet?.balance} />
          </Grid>
        </Grid>

        <UsersWithAccess
          usersWithAccess={wallet?.access}
          handleClick={handleUserClick}
          handleDelete={handleDeleteAccess}
        />

        <Stack
          direction="row"
          my={2}
          mt={6}
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
                <TableCell align="right">Actions</TableCell>
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
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      onClick={() => showModal(MODALS.CONFIRM)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => showModal(MODALS.TRANSACTION)}
                    >
                      <EditIcon />
                    </IconButton>
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

export default OneWallet;
