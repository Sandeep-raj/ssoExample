var server = require('diet')
var app = server();

var ejs=require('diet-ejs')();
var cookies = require('diet-cookies')
var jwt = require('jsonwebtoken');
const axios = require('axios').default;

app.header(cookies);
app.header(ejs);
app.header(Login);

app.get('/' , ($) =>  {
    console.log('/');
    $.header('content-type', 'text/html');
    $.data.message='Harry';
    $.render('index'); 
})

function Login($){

    // 1. Checks if token exists for example1
    if($.cookies.tokenEx === undefined){
        if($.query.ssoToken === undefined)
            $.redirect(`http://authsso.com:8087?serviceUrl=${$.app.location.href}`); //2. User redirected to auth sso server with requested url as service url in query params.
        else{
            axios.get(`http://authsso.com:8087/verifyToken?ssoToken=${$.query.ssoToken}`) //6. rest call is made to auth server to verify the token and get the user details for the appliacation.
                .then((response) => {
                    let Ex1User = {
                        name : response.data.user.name,
                        email : response.data.user.email,
                        id : response.data.user.__id,
                        role : response.data.user.role
                    };
                    exp1Token = jwt.sign(Ex1User, 'secret' , {expiresIn : 60*60});
                    $.cookies.set('tokenEx' , exp1Token); //cookie is set to create a local session b/w user and the application 
                    $.return(); // redirected to the requested page
                })
                .catch(err => {
                    console.log('Gaand Mar Gayi');
                    console.log(err);
                    $.redirect(`http://authsso.com:8087?serviceUrl=${$.app.location.href}&tokenExpired=1`);
                })
        }
    }else{
        $.return(); //7. If local session exists then request is directs redirected to the requested page.
    }
}


app.listen('http://mysecondexmp.com:8088')