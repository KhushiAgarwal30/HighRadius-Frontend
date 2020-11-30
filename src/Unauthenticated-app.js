import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { InputLabel, TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import humanHand from "./assets/human-machine-hand-homepage.svg";
import { Navbar } from "./components";

const URL = "http://localhost:8080/1705588/login";

const useStyles = makeStyles({
  flip: {
    transform: "scale(-1,1)",
    width: "100%",
  },
  wrapper: {
    transform: "translateY(-10%)",
  },
  formWrapper: {
    width: "100vw",
    display: "flex",
    justifyContent: "space-between",
  },
  targetText: {
    padding: "1rem 1rem 1rem 2.75rem",
    background: "#8FD163",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    color: "white",
    alignSelf: "flex-start",
  },
  formStyles: {
    flex: "1",
    "& form": {
      width: "50%",
      margin: "0 auto",
      transform: "translateY(-70%)",
    },
  },
  button: {
    display: "block",
    marginTop: "1rem",
    marginLeft: "auto",
  },
});

export default function UnauthenticatedApp({ setUser, isAuthenticated }) {
  const styles = useStyles();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      `${URL}?name=${encodeURIComponent(
        e.target.elements.username.value
      )}&password=${encodeURIComponent(e.target.elements.password.value)}`
    )
      .then((res) => res.json())
      .then(
        (user) => {
          setUser(user);
          window.localStorage.setItem("token", JSON.stringify(user));
          history.push("/");
        },
        (err) => console.log(err)
      );
  }

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <>
      <Navbar isAuthenticated={false} />
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
