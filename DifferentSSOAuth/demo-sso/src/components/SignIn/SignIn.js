import React from "react";
import GoogleLogin from "react-google-login";
import GitHubLogin from "react-github-login";
import classes from "./SignIn.module.css";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

const GoogleClient_ID =
  "741279870944-n5ajq9vp9ego8nnrl8lpt4ovbhuc83va.apps.googleusercontent.com";

const GithubClient_ID = "f83a147b4078334aac1b";
const Github_Client_Secret = "4b1630c24767e92b9f7be431c23c0d6b6f51854c";

const responseGoogle = (response) => {
  console.log(response);
};

const onSuccess = (response) => {
  console.log(response);
};
const onFailure = (response) => console.error(response);

const Signin = (props) => {
  return (
    <React.Fragment>
      <GoogleLogin
        clientId={GoogleClient_ID}
        buttonText="Login With Google"
        render={(renderProps) => (
          <GoogleLoginButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ display: "block", width: "100%" }}
          >
            Login From Google
          </GoogleLoginButton>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        className={classes.Google_btn}
      />

      <GitHubLogin
        clientId={GithubClient_ID}
        client_secret={Github_Client_Secret}
        redirectUri=""
        onSuccess={onSuccess}
        onFailure={onFailure}
        className="Github"
      >
        <GithubLoginButton style={{ display: "block", width: "100%" }} />
      </GitHubLogin>
    </React.Fragment>
  );
};

export default Signin;
