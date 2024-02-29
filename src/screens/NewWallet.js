import MyAppBar from "../components/MyAppBar";
import {
  Stack,
  Typography,
  Container,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { doApiCall } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AXIOS_METHOD } from "../constants";

const validationSchema = yup.object({
  name: yup
    .string("Enter wallet name")
    .min(3, "Wallet should be of minimum 3 characters length")
    .required("Wallet name is required"),
});

function NewWallet() {
  const { setSessionUser } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      setSubmitting(true);
      doApiCall(
        AXIOS_METHOD.PUT,
        "/wallet",
        (data) => {
          setSubmitting(false);
          setSessionUser((previousValue) => {
            previousValue.wallets.push({ id: data.id, name: data.name });
            return { ...previousValue };
          });

          navigate(`/wallet/edit/${data.id}`);
        },
        (apiError) => {
          setFieldError("name", apiError);
          setSubmitting(false);
        },
        values
      );
    },
  });
  return (
    <Stack pb={5}>
      <MyAppBar />
      <Container maxWidth="md">
        <Typography variant="h4" my={2} mt={6}>
          Add new wallet
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
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
          </Grid>
          <Grid item xm={12} md={6}></Grid>
        </Grid>
      </Container>
    </Stack>
  );
}

export default NewWallet;
