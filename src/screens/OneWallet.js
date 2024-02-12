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
import Loader from "../components/Loader";
import BalanceCard from "../components/BalanceCard";
import UsersWithAccess from "../components/UsersWithAccess";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import { useModals, MODALS } from "../hooks/useModal";
import { AXIOS_METHOD, useApi } from "../hooks/useApi";
import { AddAccessToWallet } from "../components/AddAccessToWallet";
import { WalletInfoCard } from "../components/WalletInfoCard";
import { useAuth } from "../hooks/useAuth";

function OneWallet() {
  const { showModal } = useModals();
  const navigate = useNavigate();
  const { id } = useParams();
  const { sessionUser, isAdmin } = useAuth();
  const isSameUser = (id) => {
    return sessionUser.id === id;
  };
  const [wallet, loading, error] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);
  const [walletTransactions, transactionsLoading, transactionsError] = useApi(
    AXIOS_METHOD.POST,
    `/transactions`,
    {
      wallet_id: id,
      limit: 10,
      cursor: "",
    }
  );

  if (
    (loading === false && error !== false) ||
    (transactionsLoading === false && transactionsError !== false)
  ) {
    navigate("/404");
    return null;
  }

  if (loading === true || transactionsLoading === true) {
    return <Loader />;
  }

  const onTransactionCreate = () => {
    showModal(MODALS.TRANSACTION, {
      onConfirmed: (values) => {
        console.log("On transaction add", values);
      },
    });
  };

  const handleUserClick = (event) => {
    navigate(`/user/${event}`);
  };

  const handleDeleteAccess = (event) => {
    showModal(MODALS.CONFIRM, {
      message:
        "Are you sure you want to delete this user access to this wallet?",
      onConfirmed: () => {
        console.log(
          "Delete user access to this wallet, then refresh module",
          event
        );
      },
    });
  };

  function onTransactionDelete(id) {
    showModal(MODALS.CONFIRM, {
      message: "Are you sure you want to delete this transaction?",
      onConfirmed: () => {
        console.log("Delete transaction, then refresh module", id);
      },
    });
  }

  function onTransactionEdit({ id, amount, title }) {
    showModal(MODALS.TRANSACTION, {
      id,
      amount,
      title,
      onConfirmed: (values) => {
        console.log("On transaction edit", values);
      },
    });
  }

  return (
    <Stack>
      <MyAppBar />
      <Container maxWidth="md">
        <Grid container spacing={2} mt={6}>
          <Grid item xs={12} sm={6} md={6}>
            <WalletInfoCard
              id={id}
              name={wallet?.name}
              description={wallet?.description}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}></Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BalanceCard balance={wallet?.balance} />
          </Grid>
        </Grid>
        <AddAccessToWallet />
        <UsersWithAccess
          usersWithAccess={wallet?.access || []}
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
              onClick={onTransactionCreate}
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
              {walletTransactions?.transactions.map((transaction) => (
                <TableRow
                  key={transaction?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{transaction?.created_by?.name}</TableCell>
                  <TableCell>${transaction?.amount}</TableCell>
                  <TableCell>{transaction?.title}</TableCell>
                  <TableCell align="right">
                    {moment(transaction?.created_at).format("YYYY.MM.DD.")}
                  </TableCell>
                  <TableCell align="right">
                    {(isAdmin || isSameUser(transaction?.created_by?.id)) && (
                      <div>
                        <IconButton
                          aria-label="delete"
                          onClick={() => onTransactionDelete(transaction?.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() =>
                            onTransactionEdit({
                              id: transaction?.id,
                              amount: transaction?.amount,
                              title: transaction?.title,
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                    )}
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
