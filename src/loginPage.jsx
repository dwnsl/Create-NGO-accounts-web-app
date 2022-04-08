import "./App.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./database";
import CodePage from "./components/codePage";
import React from "react";

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setPassword] = useState("");
  const [showForm, setShowForm] = React.useState(false);
  const [showLogin, setLogin] = React.useState(true);
  const [showError, setError] = React.useState(false);
  // const[loginError, setLoginError] = React.useState(true)

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    setError(false)
    let newUser = null;
    try {
      newUser = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      console.log(newUser)

      // console.log(user);
    } catch (error) {
      setError(true)
      console.log(error.message);
    }

    console.log(user);
    if (newUser != null) {
      setShowForm(true);
      setLogin(false);
      setLoginEmail("");
      setPassword("");
    }
  };

  const logout = async () => {
    await signOut(auth);
    console.log();
    setShowForm(false);
    setLogin(true);
  };

  return (
    <div>
      {showForm ? (
        <body class="text-center">

          <CodePage />
          <Button
            variant="danger"
            style={{ width: "150px", marginLeft: "80px",marginRight:"80px"}}
            onClick={logout}
          >
            Sign Out
          </Button>
        </body>
      ) : null}

      {showLogin ? (
        <body class="text-center">
          <main class="form-signin">
            <form>
              <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

              <div class="form-floating">
                <input
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Email</label>
              </div>
              <div class="form-floating" style={{ marginTop: "12px" }}>
                <input
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Password</label>
              </div>

              <Button
                // disabled={true}
                style={{ marginTop: "12px", width: "250px" }}
                onClick={login}
              >
                Sign in
              </Button>
              {showError ? <p>Password or Username is incorrect</p> : null}

              
            </form>
  
          </main>
        </body>
      ) : null}
    </div>
  );
}

export default LoginPage;
