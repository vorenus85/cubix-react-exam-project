import { Button, Chip, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function UserButton({ id, name }) {
  const navigate = useNavigate();
  const { sessionUser } = useAuth();

  return (
    <div>
      {sessionUser.id === id ? (
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
      ) : (
        <Chip icon={<PersonIcon />} key={id} label={name} />
      )}
    </div>
  );
}
