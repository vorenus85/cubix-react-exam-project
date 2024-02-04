import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup
    .string("Enter wallet name")
    .min(3, "Wallet should be of minimum 3 characters length")
    .required("Wallet name is required"),
});

function AddNewTransactionModal({ open, onClose }) {
  const [validFormData, setValidFormData] = useState(null);

  const handleClose = () => {
    onClose();
  };

  const updateValidFormData = (previousValue) => {
    setValidFormData({
      ...previousValue,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateValidFormData(values);
    },
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle align="center">
        Add new Wallet
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        style={{ padding: "2rem" }}
      >
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
        />
        <Grid container spacing={2}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default AddNewTransactionModal;
