import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Switch, withRouter } from "react-router-dom";

import Signup from "./Signup.js";
import Login from "./Login.js";
import Onboarding from "./Onboarding.js";
import { SnackbarError, Home } from "./components";

const Routes = (props) => {
  const [user, setUser] = useState({
    isFetching: true,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post("/auth/login", credentials);
      await localStorage.setItem("messenger-token", data.token);
      setUser(data);
    } catch (error) {
      console.error(error);
      setUser({ error: error.response.data.error || "Server Error" });
    }
  };

  const register = async (credentials) => {
    try {
      console.log("Registering with credentials:", credentials);
      const { data } = await axios.post("/auth/register", credentials);
      console.log("Registration response data:", data);
      await localStorage.setItem("messenger-token", data.token);
      setUser(data);
      props.history.push("/onboarding");
    } catch (error) {
      console.error(error);
      setUser({ error: error.response.data.error || "Server Error" });
    }
  };

  const logout = async (id) => {
    try {
      await axios.delete("/auth/logout");
      await localStorage.removeItem("messenger-token");
      setUser({});
    } catch (error) {
      console.error(error);
    }
  };

  // Lifecycle

  useEffect(() => {
    const fetchUser = async () => {
      setUser((prev) => ({ ...prev, isFetching: true }));
      try {
        const { data } = await axios.get("/auth/user");
        setUser(data);
        if (data.id) {
        }
      } catch (error) {
        console.error(error);
      } finally {
        setUser((prev) => ({ ...prev, isFetching: false }));
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage(user.error);
      } else {
        setErrorMessage("Internal Server Error. Please try again");
      }
      setSnackBarOpen(true);
    }
  }, [user?.error]);

  if (user?.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Switch>
        <Route
          path="/login"
          render={() => <Login user={user} login={login} />}
        />
        <Route
          path="/register"
          render={() => <Signup user={user} register={register} />}
        />
        <Route path="/onboarding" render={() => <Onboarding user={user} />} />
        <Route
          exact
          path="/"
          render={(props) =>
            user?.id ? (
              <Home user={user} logout={logout} />
            ) : (
              <Signup user={user} register={register} />
            )
          }
        />
        <Route
          path="/home"
          render={() => <Home user={user} logout={logout} />}
        />
      </Switch>
    </>
  );
};

export default withRouter(Routes);
