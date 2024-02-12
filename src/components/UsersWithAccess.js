import { Typography, Stack, Chip } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
function UsersWithAccess({ usersWithAccess = [], handleClick, handleDelete }) {
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
        {usersWithAccess.map((user) => (
          <Chip
            color={isSameUser(user?.id) ? "primary" : "info"}
            variant={isSameUser(user?.id) ? "filled" : "outlined"}
            key={user?.id}
            label={user?.name}
            onClick={() => {
              if (isSameUser(user?.id)) {
                handleClick(user?.id);
              }
            }}
            onDelete={() => {
              if (isAdmin || isSameUser(user?.id)) {
                handleDelete(user?.id);
              }
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default UsersWithAccess;
