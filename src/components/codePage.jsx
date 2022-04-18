import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { auth, db } from "../database.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

class CodePage extends Component {
  state = {
    loading: false,
    emptyInput: false,
    name: "",
    inputPassword: "",
    confirmPassword: "",
    userCreated: false,
    showError: false,
    notEqual: false,
    inputEmail: "",
    code: "",
    showCode: false,
  };

  componentDidMount = () => {};

  fetchApi = async () => {
    console.log(this.state);
    this.setState({ showError: false });

    if (this.state.inputEmail === "" || this.state.inputPassword === "") {
      this.setState({ emptyInput: true });
    }

    if (this.state.inputPassword !== this.state.confirmPassword) {
      this.setState({ notEqual: true });
    } else {
      this.setState({ emptyInput: false });
      this.setState({ loading: true });
      this.setState({ userCreated: false });

      try {
        let newUser = await createUserWithEmailAndPassword(
          auth,
          this.state.inputEmail,
          this.state.inputPassword
        );

        console.log(newUser);
        try {
          let addUID = await setDoc(doc(db, 'users', newUser.user.uid), {
            userType: "center",
          });
          console.log(addUID)
        } catch (error) {
          console.log(error)
        }

        this.setState({ userCreated: true });
      } catch (error) {
        this.setState({ showError: true });
      }
    }
  };

  handleSubmit = () => {
    this.fetchApi();
  };

  handleGenerateNewCode = () => {
    this.setState({ name: "" });
    this.setState({ phoneNumber: "" });
    this.setState({ inputEmail: "" });
    this.setState({ inputPassword: "" });
    this.setState({ showCode: false });
    this.setState({ emptyInput: false });
    this.setState({ showError: false });
    this.setState({ userCreated: false });
  };

  render() {
    return (
      <div>
        <body
          style={{
            marginLeft: "80px",
            marginRight: "80px",
          }}
        >
          <form>
            <h1 class="h3 mb-3 fw-normal">Enter New User's Info</h1>

            <div class="form-floating">
              <input
                onChange={(event) => {
                  this.setState({ name: event.target.value });
                  this.setState({ inputEmail: event.target.value });
                  this.setState({ inputChecker1: true });
                }}
                value={this.state.inputEmail}
                type="Name"
                class="form-control"
                id="floatingInput"
                placeholder="First and Last Name"
              />
              <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating" style={{ marginTop: "12px" }}>
              <input
                onChange={(event) => {
                  this.setState({ inputPassword: event.target.value });
                  this.setState({ inputChecker2: true });
                }}
                value={this.state.inputPassword}
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Phone Number"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div class="form-floating" style={{ marginTop: "12px" }}>
              <input
                onChange={(event) => {
                  this.setState({ confirmPassword: event.target.value });
                  this.setState({ inputChecker2: true });
                }}
                value={this.state.confirmPassword}
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Phone Number"
              />
              <label for="floatingPassword">Confirm Password</label>
            </div>

            <Button
              variant="success"
              // disabled={true}
              style={{ marginTop: "12px", width: "250px" }}
              onClick={this.handleSubmit}
            >
              Create User
            </Button>
          </form>

          {this.state.emptyInput ? <h2>Input Fields cannot be empty</h2> : null}
          {this.state.showError ? <h2>Error</h2> : null}
          {this.state.notEqual ? <h2>Passwords are not equal</h2> : null}
          {this.state.userCreated ? <h2>User Successfuly Created</h2> : null}

          <Button
            style={{ marginTop: "12px", width: "250px" }}
            onClick={this.handleGenerateNewCode}
          >
            Create Another User
          </Button>
        </body>
      </div>
    );
  }
}

export default CodePage;
