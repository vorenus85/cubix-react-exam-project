import { Typography, Stack, Chip } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
function WalletsWithAccess({ walletsWithAccess, handleClick, handleDelete }) {
  const { isAdmin } = useAuth();

  return (
    <Stack>
      <Typography variant="h5" mb={2} mt={4}>
        Wallets with access
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {walletsWithAccess.map((wallet) => (
          <Chip
            color="primary"
            variant="filled"
            key={wallet.id}
            label={wallet.name}
            onClick={() => handleClick(wallet.id)}
            onDelete={() => {
              if (!isAdmin) {
                handleDelete(wallet.id);
              }
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default WalletsWithAccess;
