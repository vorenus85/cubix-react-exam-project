import MyAppBar from "../components/MyAppBar";
import {
  Stack,
  Typography,
  Container,
  TextField,
  Grid,
  Button,
  LinearProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import UsersWithAccess from "../components/UsersWithAccess";
import { useNavigate, useParams } from "react-router-dom";
import { AXIOS_METHOD, doApiCall, useApi } from "../hooks/useApi";
import { useModals, MODALS } from "../hooks/useModal";
import { AddAccessToWallet } from "../components/AddAccessToWallet";
import { useSnackbar } from "notistack";
import { useAuth } from "../hooks/useAuth";

const validationSchema = yup.object({
  name: yup
    .string("Enter wallet name")
    .min(3, "Wallet should be of minimum 3 characters length")
    .required("Wallet name is required"),
});

function EditWallet() {
  const { setSessionUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { showModal } = useModals();

  const navigate = useNavigate();
  const { id } = useParams();

  const [wallet, loading, error, reloadWallet] = useApi(
    AXIOS_METHOD.GET,
    `/wallet/${id}`
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: wallet?.name,
      description: wallet?.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      saveWalletData(values);
    },
  });

  const onDeleteWallet = () => {
    showModal(MODALS.CONFIRM, {
      message: "Are you sure you want to delete this wallet?",
      onConfirmed: () => {
        doApiCall(
          AXIOS_METHOD.DELETE,
          `/wallet/${id}`,
          (response) => {
            setSessionUser((previousValue) => {
              previousValue.wallets = previousValue.wallets.filter((wallet) => {
                return wallet.id !== response.id;
              });
              return { ...previousValue };
            });
            navigate("/");
            enqueueSnackbar("Wallet successfully deleted!", {
              variant: "success",
            });
          },
          (apiError) => {
            enqueueSnackbar(apiError, { variant: "error" });
          }
        );
      },
    });
  };

  const handleDeleteAccess = (data) => {
    showModal(MODALS.CONFIRM, {
      message: `Are you sure you want to delete ${data.name} access to this wallet?`,
      onConfirmed: () => {
        onDeleteAccess(data);
      },
    });
  };

  const onDeleteAccess = (user) => {
    const walletID = id;

    doApiCall(
      AXIOS_METHOD.POST,
      `/wallet/${walletID}/remove_access`,
      (data) => {
        reloadWallet();
        enqueueSnackbar("Access successfully removed!", { variant: "success" });
      },
      (apiError) => {
        enqueueSnackbar(apiError, { variant: "error" });
      },
      {
        user_id: user.id,
      }
    );
  };

  const onAddAccess = () => {
    reloadWallet();
  };

  const saveWalletData = ({ description }) => {
    doApiCall(
      AXIOS_METHOD.PATCH,
      `/wallet/${id}`,
      (data) => {
        enqueueSnackbar("Wallett data successfully updated", {
          variant: "success",
        });
      },
      (apiError) => {
        enqueueSnackbar(apiError, { variant: "error" });
      },
      { description }
    );
  };

  if (loading === false && error !== false) {
    navigate("/404");
    return null;
  }

  return (
    <Stack pb={5}>
      <MyAppBar />

      <Grid item xs={12}>
        {loading === true && <LinearProgress />}
      </Grid>

      <Container maxWidth="md">
        <Typography variant="h4" my={2} mt={6}>
          Edit wallet
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {wallet && (
              <Stack component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  disabled
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="normal"
                />
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  multiline
                  rows={3}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            )}
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>

        <AddAccessToWallet walletId={id} onAddAccess={onAddAccess} />

        {wallet && (
          <UsersWithAccess
            usersWithAccess={wallet.access || []}
            handleDelete={handleDeleteAccess}
          />
        )}
        <Typography variant="h5" my={2} mt={6}>
          Danger Zone
        </Typography>
        <Button color="error" variant="contained" onClick={onDeleteWallet}>
          Delete wallet
        </Button>
      </Container>
    </Stack>
  );
}

export default EditWallet;
