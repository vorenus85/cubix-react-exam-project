import MyAppBar from "../components/MyAppBar";
import {
  Stack,
  Typography,
  Container,
  TextField,
  Grid,
  Button,
  Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import UsersWithAccess from "../components/UsersWithAccess";
import { useNavigate } from "react-router-dom";

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

const usersWithAccess = [
  {
    name: "User 1",
    id: 1,
  },
  {
    name: "User 2",
    id: 2,
  },
  {
    name: "User 3",
    id: 3,
  },
];

const validationSchema = yup.object({
  name: yup
    .string("Enter wallet name")
    .min(3, "Wallet should be of minimum 3 characters length")
    .required("Wallet name is required"),
});

function EditWallet() {
  const [user, setUser] = React.useState("");
  const navigate = useNavigate();
  const handleUserClick = (event) => {
    navigate(`/user/${event}`);
  };

  const handleDeleteAccess = (event) => {
    // confirm modal
    console.log("handle delete access user to wallet", event);
  };

  // todo get wallet data
  const wallet = {
    id: 1,
    name: "9. A",
    description: "9. A osztály tárcája",
    access: [
      {
        id: "ODgyNzYzNzEzNTAyNzQzNw",
        name: "test",
      },
    ],
  };

  const handleGrantAccess = () => {
    console.log("grant access to ", user);
  };

  const [validFormData, setValidFormData] = useState(null);

  const updateValidFormData = (previousValue) => {
    setValidFormData({
      ...previousValue,
    });

    console.log("handle edit  wallet");
  };

  const formik = useFormik({
    initialValues: {
      name: wallet.name,
      description: wallet.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateValidFormData(values);
    },
  });

  return (
    <Stack>
      <MyAppBar />
      <Container maxWidth="md">
        <Typography variant="h4" my={2} mt={6}>
          Edit wallet
        </Typography>
        <Grid container spacing={2}>
          <Grid item xm={12} md={6}>
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
            <Autocomplete
              value={user}
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

        <UsersWithAccess
          usersWithAccess={usersWithAccess}
          handleClick={handleUserClick}
          handleDelete={handleDeleteAccess}
        />
      </Container>
    </Stack>
  );
}

export default EditWallet;
