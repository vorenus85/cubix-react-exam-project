import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Wallet({ id, balance, name, description }) {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  return (
    <Grid item xs={12} lg={3} md={4} sm={6}>
      <Card>
        <CardContent>
          <Typography variant="h4">{name}</Typography>
          <Typography variant="body2" gutterBottom mb={4}>
            {description}
          </Typography>
          <Typography variant="subtitle2">Balance: ${balance}</Typography>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Stack>
            {isAdmin && (
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  navigate(`/wallet/edit/${id}`);
                }}
              >
                Edit
              </Button>
            )}
          </Stack>
          <Stack>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                navigate(`/wallet/${id}`);
              }}
            >
              View
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Wallet;
