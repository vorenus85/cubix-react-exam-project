import {
  Stack,
  Typography,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { AXIOS_METHOD, doApiCall } from "../hooks/useApi";
import { useSnackbar } from "notistack";

export function AddAccessToWallet({ walletId, onAddAccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedUser, setSelectedUser] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        doApiCall(
          AXIOS_METHOD.POST,
          "/user/list",
          (data) => {
            setOptions([...data?.users]);
          },
          (apiError) => {
            enqueueSnackbar(apiError, { variant: "error" });
          },
          {
            prefix: "",
            limit: 100,
            cursor: "",
          }
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, enqueueSnackbar, setOptions]);

  const handleGrantAccess = () => {
    doApiCall(
      AXIOS_METHOD.POST,
      `/wallet/${walletId}/grant_access`,
      (_unusedData) => {
        onAddAccess();
        enqueueSnackbar("Access successfully granted!", { variant: "success" });
        setSelectedUser("");
      },
      (apiError) => {
        enqueueSnackbar(apiError, { variant: "error" });
      },
      {
        user_id: selectedUser?.id,
      }
    );
  };

  return (
    <Stack>
      <Typography variant="h5" my={2} mt={6}>
        Add access to wallet
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Stack>
          <Autocomplete
            freeSolo
            value={selectedUser}
            id="asynchronous-userlist"
            sx={{ width: 300 }}
            open={open}
            onChange={(event, newValue, reason) => {
              if (reason === "reset" && newValue === "") {
                // Do nothing
              } else {
                setSelectedUser(newValue);
              }
            }}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option?.name || ""}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="start typing..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Stack>
        <Stack>
          <Button
            variant="outlined"
            size="large"
            onClick={handleGrantAccess}
            disabled={!selectedUser}
          >
            Add to wallet
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
