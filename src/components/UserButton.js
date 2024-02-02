import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

export function UserButton({ id, name }) {
  const navigate = useNavigate();

  return (
    <Button
      size="small"
      key={id}
      startIcon={<PersonIcon />}
      onClick={() => {
        navigate(`/user/${id}`);
      }}
    >
      {name}
    </Button>
  );
}
