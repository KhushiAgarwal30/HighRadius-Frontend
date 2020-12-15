import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { InputLabel, TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import humanHand from "./assets/human-machine-hand-homepage.svg";

const URL = "http://localhost:8080/1705588/login";

const useStyles = makeStyles((theme) => ({
  flip: {
    transform: "scale(-1,1)",
    width: "100%",
  },
  wrapper: {
    transform: "translateY(-10%)",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  formWrapper: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  targetText: {
    padding: "1rem 1rem 1rem 2.75rem",
    background: "#8FD163",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    color: "white",
    alignSelf: "flex-start",
    [theme.breakpoints.down("md")]: {
      padding: "1rem 0",
      marginTop: "2rem",
      width: "100vw",
      textAlign: "center",
    },
  },
  formStyles: {
    flex: "1",
    "& form": {
      width: "50%",
      margin: "0 auto",
      transform: "translateY(-70%)",
      [theme.breakpoints.down("md")]: {
        width: "60%",
        transform: "translateY(0)",
        marginTop: "3rem",
      },
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
  },
  button: {
    display: "block",
    marginTop: "1rem",
    marginLeft: "auto",
    color: "white",
    [theme.breakpoints.down("md")]: {
      margin: "1rem auto",
    },
  },
}));

export default function UnauthenticatedApp({
  setUser,
  isAuthenticated,
  children,
}) {
  const [error, setError] = React.useState("");

  const styles = useStyles();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.elements.username.value.trim().length === 0) {
      return setError("Please provide a valid username");
    } else if (e.target.elements.password.value.trim().length === 0) {
      return setError("Please provide a valid password");
    }
    setError(null);
    fetch(
      `${URL}?name=${encodeURIComponent(
        e.target.elements.username.value
      )}&password=${encodeURIComponent(e.target.elements.password.value)}`
    )
      .then((res) => res.json())
      .then(
        (user) => {
          if (user.message === "Success") {
            setUser(user);
            window.localStorage.setItem("token", JSON.stringify(user));
            history.push("/");
          } else {
            setError("Please provide correct credentials!");
          }
        },
        (err) => setError(err.message)
      );
  }

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <>
      {children}
      <div className={styles.wrapper}>
        <img className={styles.flip} src={humanHand} alt="Human Hand" />
      </div>{" "}
      <div className={styles.formWrapper}>
        <Typography className={styles.targetText} variant="h4">
          ORDER MANAGEMENT APPLICATION{" "}
        </Typography>{" "}
        <div className={styles.formStyles}>
          <form onSubmit={handleSubmit}>
            <Typography
              display="block"
              style={{
                marginBottom: "2rem",
                color: "#666666",
              }}
              variant="h5"
            >
              Sign In{" "}
            </Typography>{" "}
            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              <InputLabel
                style={{
                  marginBottom: "0.5rem",
                }}
                htmlFor="username"
              >
                Username{" "}
              </InputLabel>{" "}
              <TextField
                fullWidth
                id="username"
                style={{
                  background: "#DBF3FA",
                  borderRadius: "5px",
                  paddingTop: "0.75rem",
                }}
                required
              />
            </div>{" "}
            <div>
              <InputLabel
                style={{
                  marginBottom: "0.5rem",
                }}
                htmlFor="password"
              >
                Password{" "}
              </InputLabel>{" "}
              <TextField
                style={{
                  background: "#DBF3FA",
                  borderRadius: "5px",
                  paddingTop: "0.75rem",
                }}
                fullWidth
                id="password"
                type="password"
                required
              />
            </div>{" "}
            {!!error ? (
              <Typography
                variant="body1"
                color="primary"
                style={{ marginTop: "0.8rem" }}
              >
                {error}
              </Typography>
            ) : null}
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              className={styles.button}
            >
              Sign In
            </Button>
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
