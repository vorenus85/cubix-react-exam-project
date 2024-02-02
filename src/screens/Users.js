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
  Button,
  Stack,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
                      <Link
                        key={id}
                        component="button"
                        variant="body2"
                        onClick={() => {
                          navigate(`/user/${id}`);
                        }}
                      >
                        {name}
                      </Link>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      spacing={2}
                      direction="row"
                      style={{ justifyContent: "flex-end" }}
                    >
                      {row.wallets.map(({ name, id }) => (
                        <Button
                          size="small"
                          key={id}
                          variant="outlined"
                          onClick={() => {
                            navigate(`/wallet/${id}`);
                          }}
                        >
                          {name}
                        </Button>
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
