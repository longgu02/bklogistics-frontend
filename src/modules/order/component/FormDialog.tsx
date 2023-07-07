import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
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
      ) : null}
    </DialogTitle>
  );
}

export interface DialogBodyProps {
  children?: React.ReactNode;
  confirm: () => void;
  isDisabled: boolean;
}

function BootstrapDialogBody(props: DialogBodyProps) {
  const { children, confirm, isDisabled, ...other } = props;
  return (
    <>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={confirm} disabled={isDisabled}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
}

export interface DialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children?: React.ReactNode;
  confirm: () => void;
  isDisabled: boolean;
}

export default function FromDialog(props: DialogProps) {
  const { open, handleClose, title, children, confirm, isDisabled} = props;
  return (
    <>
      <BootstrapDialog onClose={handleClose} open={open} maxWidth='xl'>
        <BootstrapDialogTitle onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <BootstrapDialogBody confirm={confirm} isDisabled={isDisabled}>{children}</BootstrapDialogBody>
      </BootstrapDialog>
    </>
  );
}
