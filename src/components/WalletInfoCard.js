import {
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
  Button,
} from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function WalletInfoCard({ id, name, description }) {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleNavigate = () => {
    navigate(`/wallet/edit/${id}`);
  };

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="body2" mb={2}>
              {description}
            </Typography>
          </Stack>
          <Stack justifyContent="flex-end" direction="row">
            <Avatar>
              <WalletIcon />
            </Avatar>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack></Stack>
          {isAdmin && (
            <Stack>
              <Button
                variant="contained"
                onClick={handleNavigate}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
