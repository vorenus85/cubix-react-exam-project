import MyAppBar from "../components/MyAppBar";
import {
  Grid,
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
  IconButton,
  LinearProgress,
  Collapse,
  Box,
  Chip,
} from "@mui/material";
import moment from "moment";
import WalletsWithAccess from "../components/WalletsWithAccess";
import { Navigate, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { doApiCall } from "../hooks/useApi";
import UserInfoCard from "../components/UserInfoCard";
import { useAuth } from "../hooks/useAuth";
import { useModals } from "../hooks/useModal";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AXIOS_METHOD, MODALS } from "../constants";

function MyTransactions() {
  const { showModal } = useModals();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [transactionsPerWallets, setTransactionsPerWallets] = useState([]);
  const { sessionUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    const wallets = sessionUser.wallets;

    wallets.forEach((wallet) => {
      wallet.transactions = [];
      doApiCall(
        AXIOS_METHOD.POST,
        `/transactions`,
        (response) => {
          const mineWalletTransactions = response?.transactions.filter(
            (transaction) => {
              return sessionUser.id === transaction.created_by.id;
            }
          );
          wallet.transactions = [...mineWalletTransactions];
          wallet.numberOfTransactions = mineWalletTransactions.length;
          wallet.balance = calculateTotalAmount(mineWalletTransactions);
        },
        (apiError) => {
          console.log(apiError);
          setError(true);
          setLoading(false);
        },
        {
          wallet_id: wallet.id,
          limit: 100,
          cursor: "",
        }
      );
    });

    setTransactionsPerWallets([...wallets]);
    setLoading(false);
  }, []);

  const handleWalletClick = (walletId) => {
    navigate(`/wallet/${walletId}`);
  };

  function calculateTotalAmount(transactions) {
    let total = 0;
    for (const transaction of transactions) {
      total += transaction.amount;
    }
    return total;
  }

  function editTransactionById(wallets, transactionId, newTransactionData) {
    wallets.forEach((wallet) => {
      wallet.transactions = wallet.transactions.map((transaction) => {
        if (transaction.id === transactionId) {
          return { ...transaction, ...newTransactionData };
        }
        return transaction;
      });

      wallet.numberOfTransactions = wallet.transactions.length;
      wallet.balance = calculateTotalAmount(wallet.transactions);
    });

    return wallets;
  }

  function removeTransactionById(wallets, transactionId) {
    wallets.forEach((wallet) => {
      wallet.transactions = wallet.transactions.filter((transaction) => {
        return transaction.id !== transactionId;
      });

      wallet.numberOfTransactions = wallet.transactions.length;
      wallet.balance = calculateTotalAmount(wallet.transactions);
    });

    return wallets;
  }

  function onTransactionDelete({ id }) {
    showModal(MODALS.CONFIRM, {
      message: "Are you sure you want to delete this transaction?",
      onConfirmed: () => {
        deleteTransaction(id);
      },
    });
  }

  const deleteTransaction = (id) => {
    doApiCall(
      AXIOS_METHOD.DELETE,
      `/transaction/${id}`,
      () => {
        setTransactionsPerWallets((wallets) => {
          wallets = removeTransactionById(wallets, id);

          return [...wallets];
        });
        enqueueSnackbar("Transaction successfully deleted!", {
          variant: "success",
        });
      },
      (apiError) => {
        enqueueSnackbar(apiError, { variant: "error" });
      }
    );
  };

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

  const editTransaction = ({ id, title, amount }) => {
    doApiCall(
      AXIOS_METHOD.PATCH,
      `/transaction/${id}`,
      () => {
        setTransactionsPerWallets((wallets) => {
          wallets = editTransactionById(wallets, id, { title, amount });

          return [...wallets];
        });
        enqueueSnackbar("Transaction successfully edited!", {
          variant: "success",
        });
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
        <Grid container spacing={2} mt={6}>
          <Grid item xs={12} sm={6} md={6}>
            {loading === false && sessionUser && (
              <UserInfoCard name={sessionUser?.name} />
            )}
          </Grid>
        </Grid>

        <WalletsWithAccess
          walletsWithAccess={sessionUser.wallets}
          handleClick={handleWalletClick}
        />

        <Typography variant="h5" my={2} mt={6}>
          Transactions by Wallets
        </Typography>
        {loading === false && transactionsPerWallets && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Wallet</TableCell>
                  <TableCell>Num. of transaction</TableCell>
                  <TableCell align="right">Sum of transactions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionsPerWallets?.map((wallet) => {
                  return (
                    <TransactionsOfOneWallet
                      key={wallet?.id}
                      row={wallet}
                      onTransactionDelete={onTransactionDelete}
                      onTransactionEdit={onTransactionEdit}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Stack>
  );
}

function TransactionsOfOneWallet({
  row,
  onTransactionDelete,
  onTransactionEdit,
}) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.numberOfTransactions}</TableCell>
        <TableCell align="right">
          <Chip
            color={row.balance < 0 ? "error" : "success"}
            label={
              row.balance < 0 ? `-$${row.balance * -1}` : `$${row.balance}`
            }
          ></Chip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" mt={3}>
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
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
                        {moment(transaction?.created_at.toString()).format(
                          "YYYY.MM.DD. HH:MM"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            onTransactionDelete({
                              id: transaction?.id,
                              walletId: row.id,
                            })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() =>
                            onTransactionEdit({
                              walletId: row.id,
                              id: transaction?.id,
                              amount: transaction?.amount,
                              title: transaction?.title,
                            })
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default MyTransactions;
