import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import hrcLogo from "../assets/hrc-logo.svg";
import abcLogo from "../assets/abc-logo.png";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    margin: "0.8rem",
  },
  button: {
    [theme.breakpoints.down("md")]: {
      margin: "0.8rem auto 0 auto",
    },
  },
  hrcimage: {
    paddingLeft: "0.8rem",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "0",
      margin: "0 auto",
    },
  },
  abcimage: {
    transform: "translateY(-20px)",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default function NavBar({ isAuthenticated, setUser }) {
  const classes = useStyles();

  function handleClick() {
    window.localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <nav className={classes.nav}>
      <img className={classes.hrcimage} src={hrcLogo} alt="High Radius Logo" />
      {isAuthenticated ? (
        <>
          <img className={classes.abcimage} src={abcLogo} alt="Abc Logo" />
          <Button
            className={classes.button}
            onClick={handleClick}
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            Logout
          </Button>
        </>
      ) : null}
    </nav>
  );
}
