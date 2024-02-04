import { Card, CardContent, Typography, Grid, ButtonBase } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function AddWallet({ addNew }) {
  // Todo use complex button
  // https://mui.com/material-ui/react-button/#complex-button

  return (
    <Grid item xs={12} lg={3} md={4} sm={6}>
      <ButtonBase style={{ width: "100%" }}>
        <Card onClick={addNew} style={{ width: "100%" }}>
          <CardContent align="center">
            <AddCircleOutlineIcon
              fontSize="large"
              color="primary"
            ></AddCircleOutlineIcon>
            <Typography variant="h5">Add new</Typography>
          </CardContent>
        </Card>
      </ButtonBase>
    </Grid>
  );
}

export default AddWallet;
