import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function ConfirmModal({ onClose, onConfirmed, message }) {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Confirmation required</DialogTitle>
      <DialogContent>
        <Typography variant={"body1"}>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant={"contained"}
          color={"error"}
          onClick={() => {
            onConfirmed();
            onClose();
          }}
        >
          Yes
        </Button>
        <Button variant={"outlined"} onClick={onClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
