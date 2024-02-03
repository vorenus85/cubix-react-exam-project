import { Typography, Stack } from "@mui/material";
import { UserButton } from "./UserButton";
function UsersWithAccess({ usersWithAccess }) {
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
          <UserButton id={user.id} key={user.id} name={user.name} />
        ))}
      </Stack>
    </Stack>
  );
}

export default UsersWithAccess;
