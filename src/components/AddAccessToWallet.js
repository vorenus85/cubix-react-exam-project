import {
  Stack,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";

const allUsers = [
  {
    label: "User 1",
    id: 1,
  },
  {
    label: "User 2",
    id: 2,
  },
  {
    label: "User 3",
    id: 3,
  },
  {
    label: "User 4",
    id: 4,
  },
  {
    label: "User 5",
    id: 5,
  },
  {
    label: "User 6",
    id: 6,
  },
];

export function AddAccessToWallet() {
  const [user, setUser] = useState("");

  const handleGrantAccess = () => {
    console.log("grant access to ", user);
  };

  return (
    <Stack>
      <Typography variant="h5" my={2} mt={6}>
        Add user to wallet
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Stack>
          {/*
              // todo async autocomplete: https://codesandbox.io/p/sandbox/asynchronous-material-demo-forked-70eff?file=%2Fdemo.js
            */}
          <Autocomplete
            onChange={(event, newValue) => {
              setUser(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={allUsers}
            sx={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="start typing to find user..." />
            )}
          />
        </Stack>
        <Stack>
          <Button variant="outlined" onClick={handleGrantAccess}>
            Add to wallet
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
