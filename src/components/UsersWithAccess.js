import { Typography, Stack, Chip } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
function UsersWithAccess({ usersWithAccess = [], handleClick, handleDelete }) {
  const navigate = useNavigate();
  const { isAdmin, sessionUser } = useAuth();

  const isSameUser = (id) => {
    return sessionUser.id === id;
  };

  return (
    <Stack>
      <Typography variant="h5" mb={2} mt={4}>
        Users with access
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {usersWithAccess.map((user) =>
          isAdmin || isSameUser(user?.id) ? (
            <Chip
              className={!isAdmin ? "hide-delete" : ""}
              color={isSameUser(user?.id) ? "primary" : "info"}
              variant={isSameUser(user?.id) ? "filled" : "outlined"}
              key={user?.id}
              label={user?.name}
              onClick={() => {
                if (isSameUser(user?.id)) {
                  navigate(`/my-transactions`);
                }
              }}
              onDelete={() => {
                if (isAdmin || isSameUser(user?.id)) {
                  handleDelete(user);
                }
              }}
            />
          ) : (
            <Chip
              className={!isAdmin ? "hide-delete" : ""}
              color={isSameUser(user?.id) ? "primary" : "info"}
              variant={isSameUser(user?.id) ? "filled" : "outlined"}
              key={user?.id}
              label={user?.name}
              onClick={() => {
                if (isSameUser(user?.id)) {
                  navigate(`/my-transactions`);
                }
              }}
            />
          )
        )}
      </Stack>
    </Stack>
  );
}

export default UsersWithAccess;
