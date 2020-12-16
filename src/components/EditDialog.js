import React from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import {
  Grid,
  TextField,
  Typography,
  IconButton,
  DialogTitle as MuiDialogTitle,
  Dialog,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  Snackbar,
  Button,
} from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  root: {
    padding: theme.spacing(2),
    width: "50vh",
  },
}));

const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}));

export default function EditDialog(props) {
  const [info, setInfo] = React.useState({
    order_id: "",
    order_amt: "",
    notes: "",
    approved_by: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (props.selectedRow) {
      setInfo({
        order_id: props.selectedRow.order_id,
        order_amt: props.selectedRow.order_amt,
        notes: props.selectedRow.notes,
        approved_by: props.selectedRow.approved_by,
      });
    }
  }, [props.selectedRow]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleEdit = () => {
    props.onChange(!props.edit);
  };

  const handleChangeAmt = (e) => {
    let name = "";
    if (e.target.value < 10000) {
      name = "David Lee";
    } else if (e.target.value >= 10000 && e.target.value < 50000) {
      name = "Laura Smith";
    } else {
      name = "Matthew Vance";
    }
    setInfo({ ...info, approved_by: name, order_amt: e.target.value });
  };

  const handleSaveChanges = () => {
    let nameToBeSent = info.approved_by === "David Lee" ? info.approved_by : "";
    let approval_status =
      nameToBeSent === "David Lee" ? "Approved" : "Awaiting Approval";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_amt: info.order_amt + "",
        notes: info.notes,
        order_id: info.order_id + "",
        approved_by: nameToBeSent,
        approval_status: approval_status,
      }),
    };

    fetch("http://localhost:8080/1705588/update", config)
      .then((res) => res.json())
      .then(({ message }) => {
        if (message === "Success") {
          handleClick();
          handleEdit();
        }
      });
  };

  return (
    <div>
      <Dialog
        onClose={handleEdit}
        aria-labelledby="customized-dialog-title"
        open={props.edit}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleEdit}
          style={{ color: "grey" }}
        >
          Edit Order
        </DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography>Order ID</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField disabled value={info.order_id} />
            </Grid>
            <Grid item xs={4}>
              <Typography>Order Amount</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                error={!info.order_amt.toString().match(/^[0-9]*$/g)}
                value={info.order_amt}
                onChange={(e) => handleChangeAmt(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Notes</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                value={info.notes}
                onChange={(e) => setInfo({ ...info, notes: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Approval By</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField disabled value={info.approved_by} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!info.order_amt.toString().match(/^[0-9]*$/g)}
            autoFocus
            onClick={handleSaveChanges}
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Order Edited
        </Alert>
      </Snackbar>
    </div>
  );
}
