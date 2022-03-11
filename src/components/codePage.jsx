import { jsonEval } from "@firebase/util";
import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { httpsCallable } from "firebase/functions";
import { functions } from "../database";

class CodePage extends Component {
  state = {
    phoneNumber: "",
    name: "",
    inputPhone: "",
    inputName: "",
    code: "",
    showCode: false,
  };

  componentDidMount = () => {};

  fetchApi() {
    console.log(this.state);

    let newObject = {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
    };

    // console.log(newObject)

    const createReferredRefugee = httpsCallable(
      functions,
      "createReferredRefugee"
    );
    createReferredRefugee(newObject).then((result) => {
      console.log(result.data.inviteCode);
      this.setState({code: result.data.inviteCode})
      this.setState({ showCode: true });

    });
    // fetch(
    //   "https://us-central1-gondola-9b941.cloudfunctions.net/createReferredRefugee",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(newObject),
    //   }
    // );
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  }

  handleSubmit = () => {
    this.fetchApi();
    console.log(this.state.phoneNumber);
    console.log(this.state.name);
    
  };

  handleGenerateNewCode = () => {
    this.setState({ name: "" });
    this.setState({ phoneNumber: "" });
    this.setState({ inputName: "" });
    this.setState({ inputPhone: "" });
    this.setState({ showCode: false });
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
            <h1 class="h3 mb-3 fw-normal">Enter Info</h1>

            <div class="form-floating">
              <input
                onChange={(event) => {
                  this.setState({ name: event.target.value });
                  this.setState({ inputName: event.target.value });
                }}
                value={this.state.inputName}
                type="Name"
                class="form-control"
                id="floatingInput"
                placeholder="First and Last Name"
              />
              <label for="floatingInput">First and Last Name</label>
            </div>
            <div class="form-floating" style={{ marginTop: "12px" }}>
              <input
                onChange={(event) => {
                  this.setState({ phoneNumber: event.target.value });
                  this.setState({ inputPhone: event.target.value });
                }}
                value={this.state.inputPhone}
                type="Phone Number"
                class="form-control"
                id="floatingPassword"
                placeholder="Phone Number"
              />
              <label for="floatingPassword">Phone Number</label>
            </div>

            <Button
              variant="success"
              // disabled={true}
              style={{ marginTop: "12px", width: "250px" }}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </form>
          {this.state.showCode ? <h1>Code: {this.state.code}</h1> : null}
          <Button
            // disabled={true}
            style={{ marginTop: "12px", width: "250px" }}
            onClick={this.handleGenerateNewCode}
          >
            Generate Another Code
          </Button>
        </body>
      </div>
    );
  }
}

export default CodePage;
