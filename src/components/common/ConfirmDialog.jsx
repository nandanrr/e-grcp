import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export default function ConfirmDialog({

  open,

  title = "Confirmation",

  message,

  onConfirm,

  onClose,

}) {

  return (

    <Dialog
      open={open}
      onClose={onClose}
    >

      <DialogTitle>
        {title}
      </DialogTitle>

      <DialogContent>

        <DialogContentText>
          {message}
        </DialogContentText>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Confirm
        </Button>

      </DialogActions>

    </Dialog>

  );

}