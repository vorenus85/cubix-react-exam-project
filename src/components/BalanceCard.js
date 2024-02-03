import { Typography, Card, CardContent, Stack, Avatar } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
function BalanceCard({ balance }) {
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
      </CardContent>
    </Card>
  );
}

export default BalanceCard;
