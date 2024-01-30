import { Button, Typography } from "@mui/material";
import "../assets/notFoundScreen.css";
import { useNavigate } from "react-router-dom";

function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <Typography variant="h1" component="h1" mb={3}>
        404
      </Typography>
      <Typography variant="h4" component="h4" my={3}>
        Oops! Page not found
      </Typography>
      <Typography variant="p" component="p" my={3}>
        Sorry, the page you're looking for doesn't exist. If you think something
        is broken, report a problem.
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/");
        }}
      >
        Return to home
      </Button>
    </div>
  );
}

export default NotFoundScreen;
