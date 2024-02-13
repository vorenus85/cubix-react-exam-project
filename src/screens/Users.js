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
  Grid,
  Card,
  CardContent,
  TextField,
  LinearProgress,
} from "@mui/material";
import { UserButton } from "../components/UserButton";
import { useState } from "react";
import { AXIOS_METHOD, useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();

  const [search, setSearch] = useState();
  const [users, loading, error] = useApi(AXIOS_METHOD.POST, `/user/list`, {
    prefix: "",
    limit: 10,
    cursor: "",
  });

  const handleSearchUser = (event) => {
    const searchParam = event.target.value;

    if (searchParam.length > 1) {
      setSearch(event.target.value);
      console.log("search user", event.target.value);
    }
  };

  if (loading === false && error !== false) {
    navigate("/404");
    return null;
  }

  return (
    <Stack>
      <MyAppBar />
      {loading === true && (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      )}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {loading === false &&
                users &&
                users?.users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <UserButton id={user.id} name={user.name} />
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

export default Users;
