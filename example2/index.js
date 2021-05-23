var server = require('diet')
var app = server();

var ejs=require('diet-ejs')();
var cookies = require('diet-cookies')
var jwt = require('jsonwebtoken');
const axios = require('axios').default;

app.header(cookies);
app.header(ejs);
app.header(Login);


// When http://localhost:8000/ is requested, respond with "Hello World!"
app.get('/', ($) =>  {
    console.log($);
    $.header('content-type', 'text/html')
    $.data.message='John';
    $.render('index');   
    
})


function Login($){

    if($.cookies.tokenEx === undefined){
        if($.query.ssoToken === undefined)
            $.redirect(`http://authsso.com:8087?serviceUrl=${$.app.location.href}`);
        else{
            axios.get(`http://authsso.com:8087/verifyToken?ssoToken=${$.query.ssoToken}`)
                .then((response) => {
                    let Ex1User = {
                        name : response.data.user.name,
                        email : response.data.user.email,
                        id : response.data.user.__id,
                        role : response.data.user.role
                    };
                    exp1Token = jwt.sign(Ex1User, 'secret' , {expiresIn : 60*60});
                    $.cookies.set('tokenEx' , exp1Token);
                    $.return();
                })
                .catch(err => {
                    console.log('Gaand Mar Gayi');
                    console.log(err);
                    $.redirect(`http://authsso.com:8087?serviceUrl=${$.app.location.href}&tokenExpired=1`);
                })
        }
    }else{
        $.return();
    }
}


app.listen('http://myexmp.com:8089')