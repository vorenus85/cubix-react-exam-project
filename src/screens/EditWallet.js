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
import React, { useState } from "react";
import * as yup from "yup";
import UsersWithAccess from "../components/UsersWithAccess";
import { useNavigate, useParams } from "react-router-dom";
import { AXIOS_METHOD, doApiCall, useApi } from "../hooks/useApi";
import { useModals, MODALS } from "../hooks/useModal";
import { AddAccessToWallet } from "../components/AddAccessToWallet";

const validationSchema = yup.object({
  name: yup
    .string("Enter wallet name")
    .min(3, "Wallet should be of minimum 3 characters length")
    .required("Wallet name is required"),
});

function EditWallet() {
  const { showModal } = useModals();
  const [setValidFormData] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const [wallet, loading, error] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);
  const [users, usersLoading, usersError] = useApi(
    AXIOS_METHOD.POST,
    `/user/list`,
    {
      prefix: "",
      limit: 10,
      cursor: "",
    }
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: wallet?.name,
      description: wallet?.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateValidFormData(values);
    },
  });

  const handleUserClick = (event) => {
    navigate(`/user/${event}`);
  };

  const onDeleteWallet = () => {
    showModal(MODALS.CONFIRM, {
      message: "Are you sure you want to delete this wallet?",
      onConfirmed: () => {
        doApiCall(
          AXIOS_METHOD.DELETE,
          `/wallet/${id}`,
          (_unusedResponse) => {
            navigate("/");
          },
          (apiError) => {
            console.log(apiError);
          }
        );
      },
    });
  };

  const handleDeleteAccess = (event) => {
    showModal(MODALS.CONFIRM, {
      message: "Are you sure you want to delete access to this wallet?",
      onConfirmed: () => {
        console.log(
          "Delete user access to this wallet, then refresh module",
          event
        );
      },
    });
  };

  const updateValidFormData = (previousValue) => {
    setValidFormData({
      ...previousValue,
    });

    console.log("handle edit  wallet");
  };

  if (loading === false && error !== false) {
    navigate("/404");
    return null;
  }

  return (
    <Stack pb={5}>
      <MyAppBar />
      {loading === true && (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      )}
      <Container maxWidth="md">
        <Typography variant="h4" my={2} mt={6}>
          Edit wallet
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {loading === false && wallet && (
              <Stack component="form" onSubmit={formik.handleSubmit}>
                <TextField
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

        <AddAccessToWallet />

        {loading === false && wallet && (
          <UsersWithAccess
            usersWithAccess={wallet.access || []}
            handleClick={handleUserClick}
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
