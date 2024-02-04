import MyAppBar from "../components/MyAppBar";
import {
  Stack,
  Typography,
  Container,
  TextField,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

function EditWallet() {
  // todo get wallet data
  const mockedWallet = {
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

  return (
    <Stack>
      <MyAppBar />
      <Container maxWidth="md">
        <Typography variant="h4" my={2} mt={6}>
          Add new wallet
        </Typography>
      </Container>
    </Stack>
  );
}

export default EditWallet;
