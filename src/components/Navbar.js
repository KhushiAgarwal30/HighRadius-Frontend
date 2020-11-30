import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import hrcLogo from "../assets/hrc-logo.svg";
import abcLogo from "../assets/abc-logo.png";

const useStyles = makeStyles({
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: "0.8rem",
  },
  hrcimage: {
    paddingLeft: "0.8rem",
  },
  abcimage: {
    transform: "translateY(-20px)",
  },
});

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
