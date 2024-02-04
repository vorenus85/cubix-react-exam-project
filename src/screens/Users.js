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
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { UserButton } from "../components/UserButton";
import { WalletButton } from "../components/WalletButton";
import { useState } from "react";

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

  const [search, setSearch] = useState();

  const handleSearchUser = (event) => {
    const searchParam = event.target.value;

    if (searchParam.length > 1) {
      setSearch(event.target.value);
      console.log("search user", event.target.value);
    }
  };

  return (
    <div>
      <MyAppBar />
      <Container maxWidth="md">
        <Grid container mb={4} mt={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Users list</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Stack>
                    <Typography variant="body1">Search:</Typography>
                  </Stack>
                  <Stack>
                    <TextField
                      value={search}
                      name="search"
                      size="small"
                      id="outlined-basic"
                      label="start typing to find user..."
                      variant="outlined"
                      onChange={handleSearchUser}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Wallets</TableCell>
                <TableCell align="right">Access</TableCell>
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
                  <TableCell align="right">
                    <Button variant="outlined" color="secondary">
                      Add
                    </Button>
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
