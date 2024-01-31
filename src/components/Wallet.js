import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
function Wallet({ id, balance, name, description }) {
  return (
    <Grid item xs={12} lg={3} md={4} sm={6}>
      <Card>
        <CardContent>
          <Typography variant="h4" mb={2}>
            {name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {description}
          </Typography>
          <Typography variant="subtitle2">Balance: ${balance}</Typography>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              console.log("Go to wallet");
            }}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Wallet;
