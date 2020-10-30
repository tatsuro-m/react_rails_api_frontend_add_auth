import React from "react";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";
import awsConfiguration from "../awsConfiguration";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import SignUp from "./SignUp";
import {Alert} from "@material-ui/lab";


export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      signUpOpen: false,
      error: false,
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignUpOpen = this.handleSignUpOpen.bind(this);
    this.handleSignUpClose = this.handleSignUpClose.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  get userPool() {
    return (
      new CognitoUserPool({
        UserPoolId: awsConfiguration.UserPoolId,
        ClientId: awsConfiguration.ClientId,
      })
    );
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSignUpOpen() {
    this.setState({signUpOpen: true})
  }

  handleSignUpClose() {
    this.setState({signUpOpen: false})
  }

  signIn() {
    const authenticationDetails = new AuthenticationDetails({
      Username: this.state.email,
      Password: this.state.password,
    });

    const cognitoUser = new CognitoUser({
      Username: this.state.email,
      Pool: this.userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        this.props.onSuccess();
      },
      onFailure: (() => {
        this.setState({error: true})
      })
    });
  }

  render() {
    if (this.state.signUpOpen) {
      return (
        <SignUp
          onClose={this.handleSignUpClose}
        />
      )
    } else {
      return (
        <div>
          {this.state.error &&
          <Alert severity="error">メールアドレスかパスワードが間違っています。</Alert>
          }
          <form>
            <Grid container>
              <Grid item xs={12}>
                <h1>SignIn</h1>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={2}/>
              <Grid item xs={8}>
                <TextField
                  label="email"
                  type="email"
                  fullWidth
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />
              </Grid>
              <Grid item xs={2}/>

              <Grid item xs={2}/>
              <Grid item xs={8}>
                <TextField
                  label="password"
                  type="password"
                  fullWidth
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
              </Grid>
              <Grid item xs={2}/>

              <Grid item xs={12}>
                <Box mt={5}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.signIn}
                  >
                    SignIn
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box mt={5}>
                  <Button
                    variant="contained"
                    color="default"
                    onClick={this.handleSignUpOpen}
                  >
                    or SignUp
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </div>
      )
    }
  }
}
