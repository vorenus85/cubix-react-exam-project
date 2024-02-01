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
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  termsAndConditions: yup
    .bool()
    .oneOf([true], "You need to accept the terms and conditions"),
  username: yup
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
  const [validFormData, setValidFormData] = useState(null);

  const navigate = useNavigate();
  const navigateToWallets = () => {
    navigate("/");
  };

  const updateValidFormData = (previousValue) => {
    setValidFormData({
      ...previousValue,
    });
    // call login backend endopint
    navigateToWallets();
  };

  const formik = useFormik({
    initialValues: {
      termsAndConditions: false,
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateValidFormData(values);
    },
  });

  return (
    <div>
      <MyAppBar />
      <Container maxWidth="xs" style={{ marginTop: "6rem" }}>
        <Paper style={{ padding: "1rem" }}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Typography variant="h3" mb={3}>
              Register
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
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
    </div>
  );
}

export default Register;
