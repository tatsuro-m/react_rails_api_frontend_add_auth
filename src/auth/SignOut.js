import React from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import awsConfiguration from "../awsConfiguration";
import Button from "@material-ui/core/Button";

export default class SignOut extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  get userPool() {
    return new CognitoUserPool({
      UserPoolId: awsConfiguration.UserPoolId,
      ClientId: awsConfiguration.ClientId,
    });
  }

  signOut() {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      localStorage.clear();
      this.props.onSignOut();
    } else {
      localStorage.clear();
    }
  }

  render() {
    return (
      <Button variant="contained" color="secondary" onClick={this.signOut}>
        SignOut
      </Button>
    );
  }
}
