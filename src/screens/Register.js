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
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Stack,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AXIOS_METHOD, doApiCall } from "../hooks/useApi";

const validationSchema = yup.object({
  termsAndConditions: yup
    .bool()
    .oneOf([true], "You need to accept the terms and conditions"),
  name: yup
    .string("Enter you username")
    .min(3, "Username should be of minimum 3 characters length")
    .max(20, "Username should be of maximum 20 characters length")
    .required("Username is required"),
  password: yup
    .string("Enter your password")
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      "Must Contain 5 Characters, One Uppercase, One Lowercase, One Number"
    ),
  confirmPassword: yup
    .string("Enter your password confirmation")
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function Register() {
  const { handleLoginResult } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      termsAndConditions: false,
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setFieldError, setSubmitting }) => {
      setSubmitting(true);
      const onFailure = (apiError) => {
        setFieldError("name", apiError);
        setSubmitting(false);
      };

      doApiCall(
        AXIOS_METHOD.POST,
        "/reg",
        (_unusedRegData) => {
          doApiCall(
            AXIOS_METHOD.POST,
            "/login",
            (data) => {
              handleLoginResult(data);
              setSubmitting(false);
              navigate("/");
            },
            onFailure,
            values
          );

          setSubmitting(false);
        },
        onFailure,
        values
      );
    },
  });

  return (
    <Stack>
      <MyAppBar showLogin={true} />
      <Container maxWidth="xs" style={{ marginTop: "6rem" }}>
        <Paper style={{ padding: "1rem" }}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Typography variant="h3" mb={3}>
              Register
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
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Password again"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              margin="normal"
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="termsAndConditions"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
                label="I agree to the Terms and Conditions"
              />
              {formik.touched.termsAndConditions &&
                !!formik.errors.termsAndConditions && (
                  <FormHelperText error>
                    You need to accept the terms and conditions
                  </FormHelperText>
                )}
            </FormGroup>
            <Grid container spacing={2} mt={4}>
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} md={6}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Stack>
  );
}

export default Register;
