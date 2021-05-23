import React from "react";
import GitHubLogin from "react-github-login";
import GoogleLogin from "react-google-login";
import axios from "axios";
import "./demo.css";

const GoogleClient_ID =
  "741279870944-n5ajq9vp9ego8nnrl8lpt4ovbhuc83va.apps.googleusercontent.com";

const GithubClient_ID = "f83a147b4078334aac1b";
const Github_Client_Secret = "4b1630c24767e92b9f7be431c23c0d6b6f51854c";

const responseGoogle = (response) => {
  console.log(response);
};

const onSuccess = (response) => {
  console.log(response);
  axios
    .get("http://localhost:4000/code/" + response.code)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
const onFailure = (response) => console.error(response);

const demo = (props) => {
  return (
    <React.Fragment>
      <GoogleLogin
        clientId={GoogleClient_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />

      <hr />

      <GitHubLogin
        clientId={GithubClient_ID}
        client_secret={Github_Client_Secret}
        redirectUri=""
        onSuccess={onSuccess}
        onFailure={onFailure}
        className="Github"
      />
    </React.Fragment>
  );
};

export default demo;
