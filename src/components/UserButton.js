import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

export function UserButton({ id, name }) {
  const navigate = useNavigate();

  return (
    <Button
      style={{ textWrap: "nowrap" }}
      size="small"
      key={id}
      variant="outlined"
      startIcon={<PersonIcon />}
      onClick={() => {
        navigate(`/user/${id}`);
      }}
    >
      {name}
    </Button>
  );
}
