import React from "react";
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import awsConfiguration from "../awsConfiguration";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      success: false,
      error: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  get userPool() {
    return new CognitoUserPool({
      UserPoolId: awsConfiguration.UserPoolId,
      ClientId: awsConfiguration.ClientId,
    });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  signUp() {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: this.state.email,
      }),
    ];
    this.userPool.signUp(
      this.state.email,
      this.state.password,
      attributeList,
      [],
      (err) => {
        if (err) {
          console.log(err);
          this.setState({ error: true });
          return;
        }
        this.setState({
          email: "",
          password: "",
          success: true,
        });
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.error && (
          <Alert severity="error">
            サインアップに失敗しました。もう一度試してください。
          </Alert>
        )}
        {this.state.success && (
          <Alert severity="success">
            サインアップが完了しました。メールを確認してください。
          </Alert>
        )}
        <form>
          <Grid container>
            <Grid item xs={12}>
              <h1>SignUp</h1>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <TextField
                label="email"
                type="email"
                fullWidth
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </Grid>
            <Grid item xs={2} />

            <Grid item xs={2} />
            <Grid item xs={8}>
              <TextField
                label="password"
                type="password"
                fullWidth
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </Grid>
            <Grid item xs={2} />

            <Grid item xs={12}>
              <Box mt={5}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.signUp}
                >
                  SignUp
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box mt={5}>
                <Button
                  variant="contained"
                  color="default"
                  onClick={this.props.onClose}
                >
                  or SignIn
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
