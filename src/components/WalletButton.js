import { Button } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { useNavigate } from "react-router-dom";

export function WalletButton({ id, name }) {
  const navigate = useNavigate();

  return (
    <Button
      size="small"
      key={id}
      endIcon={<WalletIcon />}
      variant="outlined"
      onClick={() => {
        navigate(`/wallet/${id}`);
      }}
    >
      {name}
    </Button>
  );
}
