import { Typography, Stack, Chip } from "@mui/material";
function WalletsWithAccess({ walletsWithAccess, handleClick, handleDelete }) {
  // TODO handle auth

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
            key={wallet.id}
            label={wallet.name}
            onClick={() => handleClick(wallet.id)}
            onDelete={() => handleDelete(wallet.id)}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default WalletsWithAccess;
