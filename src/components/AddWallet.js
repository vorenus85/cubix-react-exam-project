import { Card, CardContent, Typography, Grid } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function AddWallet({ addNew }) {
  return (
    <Grid item xs={12} lg={3} md={4} sm={6}>
      <Card onClick={addNew}>
        <CardContent align="center">
          <AddCircleOutlineIcon
            fontSize="large"
            color="primary"
          ></AddCircleOutlineIcon>
          <Typography variant="h5">Add new</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default AddWallet;
