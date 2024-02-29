import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ConfirmModal({ onClose, onConfirmed, message }) {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        Confirmation required
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
      <DialogContent>
        <Typography variant={"body1"}>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant={"outlined"} onClick={onClose}>
          No
        </Button>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={() => {
            onConfirmed();
            onClose();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
