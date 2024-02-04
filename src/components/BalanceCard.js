import {
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useNavigate, useParams } from "react-router-dom";
function BalanceCard({ balance }) {
  let { id } = useParams();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/wallet/edit/${id}`);
  };
  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack>
            <Typography variant="body1">Balance</Typography>
            <Typography variant="h4">${balance}</Typography>
          </Stack>
          <Stack>
            <Avatar>
              <CurrencyExchangeIcon />
            </Avatar>
          </Stack>
        </Stack>
        <Stack>
          <Button
            variant="contained"
            onClick={handleNavigate}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default BalanceCard;
