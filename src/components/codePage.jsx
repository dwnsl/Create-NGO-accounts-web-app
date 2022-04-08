import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { httpsCallable } from "firebase/functions";
import { functions } from "../database";
import ClipLoader from "react-spinners/ClipLoader";

class CodePage extends Component {
  state = {
    loading: false,
    emptyInput: false,
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

    if (this.state.inputName ==="" || this.state.inputPhone ==="") {
      this.setState({emptyInput: true})
    } else {
      this.setState({emptyInput: false})
      this.setState({ loading: true });

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
        this.setState({ loading: false });
        this.setState({ code: result.data.inviteCode });
        this.setState({ showCode: true });
      });
    }
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
    this.setState({emptyInput: false})
    
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
                  this.setState({ inputChecker1: true });
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
                  this.setState({ inputChecker2: true });
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
          
          {this.state.loading ? (
            <div>
              {" "}
              <h2>Fetching Code</h2>
              <ClipLoader />{" "}
            </div>
          ) : null}
          {this.state.showCode ? <h1>Code: {this.state.code}</h1> : null}
          {this.state.emptyInput ? <h2>Name or Number cannot be empty</h2> : null}

          <Button
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
