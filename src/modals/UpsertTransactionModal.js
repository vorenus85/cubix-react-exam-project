import React from "react";
import {
  Dialog,
  DialogTitle,
  Box,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth";

const validationSchema = yup.object({
  amount: yup
    .number()
    .positive("Amount must be positive number")
    .required("Transaction amount is required"),
});

const validationSchemaForAdmin = yup.object({
  amount: yup.number().required("Transaction amount is required"),
});

export default function UpsertTransactionModal({
  onClose,
  onConfirmed,
  id,
  amount,
  title,
}) {
  const { isAdmin } = useAuth();

  const formik = useFormik({
    initialValues: {
      amount: amount,
      title: title,
    },
    validationSchema: isAdmin ? validationSchemaForAdmin : validationSchema,
    onSubmit: (values) => {
      onConfirmed(values);
      onClose();
    },
  });

  return (
    <Dialog onClose={onClose} open={true}>
      <DialogTitle align="center">
        {id ? <div>Edit transaction</div> : <div>Add new transaction</div>}
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          type="number"
          fullWidth
          id="amount"
          name="amount"
          label="Amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && !!formik.errors.amount}
          helperText={formik.touched.amount && formik.errors.amount}
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        <TextField
          size="small"
          variant="outlined"
          fullWidth
          id="title"
          name="title"
          label="Title of transaction"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          margin="normal"
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
