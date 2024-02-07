import { Typography, Stack, Chip } from "@mui/material";
function UsersWithAccess({ usersWithAccess = [], handleClick, handleDelete }) {
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
            key={user?.id}
            label={user?.name}
            onClick={() => handleClick(user?.id)}
            onDelete={() => handleDelete(user?.id)}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default UsersWithAccess;
