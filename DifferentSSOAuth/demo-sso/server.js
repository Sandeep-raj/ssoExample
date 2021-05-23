const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

const GithubClient_ID = "f83a147b4078334aac1b";
const Github_Client_Secret = "4b1630c24767e92b9f7be431c23c0d6b6f51854c";

app.use(cors());

app.get("/code/:code", function (req, res) {
  axios
    .post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GithubClient_ID,
        client_secret: Github_Client_Secret,
        code: req.params.code,
        redirect_uri: "",
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data.access_token);
      axios
        .get("https://api.github.com/user", {
          headers: {
            Authorization: "token " + response.data.access_token,
          },
        })
        .then((user) => {
          console.log(user.data);
          res.send(user.data);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

app.listen(4000);
