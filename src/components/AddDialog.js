import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
});

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: "absolute",
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//   },
// }));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
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
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "50vh",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AddDialog({ username, onChange, add }) {
  const [info, setInfo] = React.useState({
    order_id: "",
    customer_name: "",
    customer_id: "",
    order_amt: "",
    approval_status: "",
    approved_by: "",
    notes: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    window.location.reload(false);
  };
  const handleAdd = () => {
    onChange(!add);
  };
  const handleAddNew = () => {
    let name = username;
    name = username.split("_");
    name = name[0] + " " + name[1];
    let status;
    if (info.order_amt <= 10000) {
      setInfo({ ...info, approval_status: "Approved", approved_by: name });
      status = "Approved";
    } else {
      setInfo({
        ...info,
        approval_status: "Awaiting Approval",
        approved_by: "",
      });
      name = "";
      status = "Awaiting Approval";
    }
    //console.log(name,status);
    fetch(
      "http://localhost:8080/1705588/add?customer_id=" +
        info.customer_id +
        "&customer_name=" +
        info.customer_name +
        "&order_id=" +
        info.order_id +
        "&order_amt=" +
        info.order_amt +
        "&status=" +
        status +
        "&approved_by=" +
        name +
        "&notes=" +
        info.notes
    )
      .then((res) => res.json())
      .then(({ message }) => {
        if (message === "Success") {
          handleClick();
          handleAdd();
        }
      });
  };

  return (
    <div>
      <Dialog
        onClose={handleAdd}
        aria-labelledby="customized-dialog-title"
        open={add}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleAdd}
          style={{ color: "grey" }}
        >
          Add New Order
        </DialogTitle>
        <DialogContent dividers>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={4}>
              <Typography>Order ID</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                type="number"
                value={info.order_id}
                error={info.order_id.length <= 4}
                onChange={(e) => setInfo({ ...info, order_id: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Customer Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                value={info.customer_name}
                error={info.customer_name.length <= 6}
                onChange={(e) =>
                  setInfo({ ...info, customer_name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Customer ID</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                type="number"
                value={info.customer_id}
                error={info.customer_id.length <= 2}
                onChange={(e) =>
                  setInfo({ ...info, customer_id: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Order Amount</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                value={info.order_amt}
                type="number"
                error={info.order_amt <= 1000}
                onChange={(e) =>
                  setInfo({ ...info, order_amt: e.target.value })
                }
              />{" "}
            </Grid>
            <Grid item xs={4}>
              <Typography>Notes</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                error={info.notes.length <= 5}
                value={info.notes}
                onChange={(e) => setInfo({ ...info, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            disabled={
              info.order_id.length <= 4 ||
              info.customer_name.length <= 6 ||
              info.customer_id.length <= 2 ||
              info.order_amt <= 1000 ||
              info.notes.length <= 5
            }
            onClick={handleAddNew}
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Order Added"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" color="primary" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}