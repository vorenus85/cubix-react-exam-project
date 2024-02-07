import React, { useState } from "react";
import MyAppBar from "../components/MyAppBar";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AXIOS_METHOD, doApiCall } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";

const validationSchema = yup.object({
  name: yup
    .string("Enter your Username")
    .min(3, "Username should be of minimum 3 characters length")
    .max(20, "Username should be of maximum 20 characters length")
    .required("Username is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

function Login() {
  const navigate = useNavigate();

  const { handleLoginResult } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "test",
      password: "test",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setFieldError, setSubmitting }) => {
      setSubmitting(true);
      doApiCall(
        AXIOS_METHOD.POST,
        "/login",
        (data) => {
          handleLoginResult(data);
          setSubmitting(false);
          navigate("/");
        },
        (apiError) => {
          setFieldError("password", apiError);
          setSubmitting(false);
        },
        values
      );
    },
  });

  return (
    <Stack>
      <MyAppBar showRegister={true} />
      <Container maxWidth="xs" style={{ marginTop: "6rem" }}>
        <Paper style={{ padding: "1rem" }}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Typography variant="h3" mb={3}>
              Login
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              name="name"
              label="Username"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Stack>
  );
}

export default Login;
