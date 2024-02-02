import MyAppBar from "../components/MyAppBar";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserButton } from "../components/UserButton";
import { WalletButton } from "../components/WalletButton";

function createData(user, wallets) {
  return { user, wallets };
}

const rows = [
  createData(
    [{ name: "User 1", id: 1 }],
    [
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
      {
        name: "Wallet 4",
        id: 4,
      },
    ]
  ),
  createData(
    [{ name: "User 2", id: 2 }],
    [
      {
        name: "Wallet 2",
        id: 2,
      },
      {
        name: "Wallet 4",
        id: 4,
      },
    ]
  ),
  createData(
    [{ name: "User 3", id: 3 }],
    [
      {
        name: "Wallet 4",
        id: 4,
      },
    ]
  ),
  createData(
    [{ name: "User 4", id: 4 }],
    [
      {
        name: "Wallet 1",
        id: 1,
      },
      {
        name: "Wallet 4",
        id: 4,
      },
    ]
  ),
];
function Users() {
  // TODO use memoization for caching

  return (
    <div>
      <MyAppBar />
      <Container maxWidth="md">
        <Typography variant="h4" my={2} mt={6}>
          Users list
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Wallets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.user[0].id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.user.map(({ name, id }) => (
                      <UserButton key={id} id={id} name={name} />
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      spacing={2}
                      direction="row"
                      style={{ justifyContent: "flex-end" }}
                    >
                      {row.wallets.map(({ name, id }) => (
                        <WalletButton key={id} id={id} name={name} />
                      ))}
                    </Stack>
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

export default Users;
