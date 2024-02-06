import { Button, Typography, Stack, Container } from "@mui/material";
import "../assets/notFoundScreen.css";
import { useNavigate } from "react-router-dom";
import MyAppBar from "../components/MyAppBar";

function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <Stack>
      <MyAppBar />
      <Container className="error-page" style={{ marginTop: "6rem" }}>
        <Typography variant="h1" component="h1" mx={3}>
          404
        </Typography>
        <Typography variant="h4" component="h4" my={3}>
          Oops! Page not found
        </Typography>
        <Typography variant="body2" my={3}>
          Sorry, the page you're looking for doesn't exist. If you think
          something is broken, report a problem.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/");
          }}
        >
          Return to home
        </Button>
      </Container>
    </Stack>
  );
}

export default NotFoundScreen;
