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
} from "@mui/material";
import moment from "moment";
import WalletsWithAccess from "../components/WalletsWithAccess";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AXIOS_METHOD, doApiCall, useApi } from "../hooks/useApi";
import UserInfoCard from "../components/UserInfoCard";
import { useAuth } from "../hooks/useAuth";
import { MODALS, useModals } from "../hooks/useModal";
import { enqueueSnackbar } from "notistack";

const transactions = [
  {
    id: 1,
    name: "Wallet 1",
    amount: 100,
    title: "Lorem ipsum dolot sit amet",
    date: new Date("2024-02-02 18:15"),
  },
  {
    id: 2,
    name: "Wallet 2",
    amount: 150,
    title: "Lorem ipsum dolot sit amet",
    date: new Date("2024-01-29 09:20"),
  },
  {
    id: 3,
    name: "Wallet 3",
    amount: 50,
    title: "Lorem ipsum dolot sit amet",
    date: new Date("2024-01-27 7:45"),
  },
  {
    id: 4,
    name: "Wallet 1",
    amount: 100,
    title: "Lorem ipsum dolot sit amet",
    date: new Date("2024-01-15 16:32"),
  },
];

function OneUser() {
  const { showModal } = useModals();
  const navigate = useNavigate();
  const { id } = useParams();
  const { sessionUser, setSessionUser, isAdmin } = useAuth();
  const isSameUser = (id) => {
    return sessionUser.id === id;
  };
  const [userData, loading, error] = useApi(AXIOS_METHOD.GET, `/user/${id}`);

  const handleWalletClick = (walletId) => {
    navigate(`/wallet/${walletId}`);
  };

  const handleDeleteAccess = (wallet) => {
    showModal(MODALS.CONFIRM, {
      message: `Are you sure you want to delete access to ${wallet.name} wallet?`,
      onConfirmed: () => {
        onDeleteAccess(wallet);
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

  const onDeleteAccess = (wallet) => {
    const walletID = wallet.id;

    doApiCall(
      AXIOS_METHOD.POST,
      `/wallet/${walletID}/remove_access`,
      (response) => {
        setSessionUser((previousValue) => {
          previousValue.wallets = previousValue.wallets.filter((wallet) => {
            return wallet.id !== response.id;
          });
          return { ...previousValue };
        });

        enqueueSnackbar("Access successfully removed!", { variant: "success" });
      },
      (apiError) => {
        enqueueSnackbar(apiError, { variant: "error" });
      },
      {
        user_id: id,
      }
    );
  };

  if (loading === false && error !== false) {
    navigate("/404");
    return null;
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
            {loading === false && userData && (
              <UserInfoCard name={userData?.name} />
            )}
          </Grid>
        </Grid>

        <WalletsWithAccess
          walletsWithAccess={sessionUser.wallets}
          handleClick={handleWalletClick}
          handleDelete={handleDeleteAccess}
        />

        <Typography variant="h5" my={2} mt={6}>
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
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{transaction?.name}</TableCell>
                  <TableCell>${transaction?.amount}</TableCell>
                  <TableCell>{transaction?.title}</TableCell>
                  <TableCell align="right">
                    {moment(transaction?.date).format("YYYY.MM.DD.")}
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

export default OneUser;
