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
  LinearProgress,
  Chip,
} from "@mui/material";

import moment from "moment";
import BalanceCard from "../components/BalanceCard";
import UsersWithAccess from "../components/UsersWithAccess";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import { useModals, MODALS } from "../hooks/useModal";
import { AXIOS_METHOD, doApiCall, useApi } from "../hooks/useApi";
import { AddAccessToWallet } from "../components/AddAccessToWallet";
import { WalletInfoCard } from "../components/WalletInfoCard";
import { useAuth } from "../hooks/useAuth";
import useTransactions from "../hooks/useTransactions";
import { useSnackbar } from "notistack";

function OneWallet() {
  const { enqueueSnackbar } = useSnackbar();
  const { showModal } = useModals();
  const navigate = useNavigate();
  const { id } = useParams();
  const { sessionUser, isAdmin } = useAuth();
  const isSameUser = (id) => {
    return sessionUser.id === id;
  };
  const [wallet, loading, error, reloadWallet] = useApi(
    AXIOS_METHOD.GET,
    `/wallet/${id}`
  );

  const [
    transactions,
    transactionsLoading,
    transactionsError,
    onMore,
    hasMore,
    resetList,
  ] = useTransactions(id, "5");

  const deleteTransaction = (id) => {
    doApiCall(
      AXIOS_METHOD.DELETE,
      `/transaction/${id}`,
      (_unusedResponse) => {
        resetList();
        reloadWallet();
      },
      (apiError) => {
        enqueueSnackbar(apiError, { variant: "error" });
      }
    );
  };

  const editTransaction = ({ id, title, amount }) => {
    doApiCall(
      AXIOS_METHOD.PATCH,
      `/transaction/${id}`,
      (_unusedResponse) => {
        resetList();
        reloadWallet();
      },
      (apiError) => {
        enqueueSnackbar(apiError, { variant: "error" });
      },
      {
        title,
        amount,
      }
    );
  };

  const addTransaction = (transactionData) => {
    const data = {
      wallet_id: id,
      ...transactionData,
      extra: {},
    };

    doApiCall(
      AXIOS_METHOD.PUT,
      `/transactions`,
      (_unusedResponse) => {
        resetList();
        reloadWallet();
      },
      (apiError) => {
        enqueueSnackbar(apiError, { variant: "error" });
      },
      data
    );
  };

  const onTransactionCreate = () => {
    showModal(MODALS.TRANSACTION, {
      onConfirmed: (values) => {
        addTransaction(values);
      },
    });
  };

  const handleUserClick = (event) => {
    navigate(`/user/${event}`);
  };

  const handleDeleteAccess = (data) => {
    showModal(MODALS.CONFIRM, {
      message: `Are you sure you want to delete ${data.name} access to this wallet?`,
      onConfirmed: () => {
        onDeleteAccess(data);
      },
    });
  };

  function onTransactionDelete(id) {
    showModal(MODALS.CONFIRM, {
      message: "Are you sure you want to delete this transaction?",
      onConfirmed: () => {
        deleteTransaction(id);
      },
    });
  }

  function onTransactionEdit({ id, amount, title }) {
    showModal(MODALS.TRANSACTION, {
      id,
      amount,
      title,
      onConfirmed: ({ amount, title }) => {
        editTransaction({ id, amount, title });
      },
    });
  }

  const onAddAccess = () => {
    reloadWallet();
  };

  const onDeleteAccess = (user) => {
    const walletID = id;

    doApiCall(
      AXIOS_METHOD.POST,
      `/wallet/${walletID}/remove_access`,
      (data) => {
        reloadWallet();
      },
      (apiError) => {
        enqueueSnackbar(apiError, { variant: "error" });
      },
      {
        user_id: user.id,
      }
    );
  };

  if (
    (loading === false && error !== false) ||
    (transactionsLoading === false && transactionsError !== false)
  ) {
    navigate("/404");
    return null;
  }

  return (
    <Stack pb={5}>
      <MyAppBar />
      {loading === true ||
        (transactionsLoading === true && (
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        ))}
      <Container maxWidth="md">
        <Grid container spacing={2} mt={6}>
          <Grid item xs={12} sm={6} md={6}>
            <WalletInfoCard
              loading={loading}
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
        <AddAccessToWallet walletId={id} onAddAccess={onAddAccess} />
        {wallet && (
          <UsersWithAccess
            usersWithAccess={wallet?.access || []}
            handleClick={handleUserClick}
            handleDelete={handleDeleteAccess}
          />
        )}

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
              {transactionsLoading === false &&
                transactions &&
                transactions?.map((transaction) => (
                  <TableRow
                    key={transaction?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{transaction?.created_by?.name}</TableCell>
                    <TableCell>
                      <Chip
                        color={transaction?.amount < 0 ? "error" : "success"}
                        label={
                          transaction?.amount < 0
                            ? `-$${transaction?.amount * -1}`
                            : `$${transaction?.amount}`
                        }
                      ></Chip>
                    </TableCell>
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
        <Grid item xs={12}>
          {hasMore && !loading && (
            <Button onClick={onMore} fullWidth>
              Load more
            </Button>
          )}
        </Grid>
      </Container>
    </Stack>
  );
}

export default OneWallet;
