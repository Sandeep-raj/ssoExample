var server = require('diet')
var app = server();
var cookies = require('diet-cookies')
var ejs=require('diet-ejs')();
var jwt = require('jsonwebtoken');
const __db = require('./mockDb/Users');

app.header(ejs);
app.header(cookies)

app.get('/', ($) =>  {
    if($.cookies.token === undefined || $.query.tokenExpired === 1){
        $.redirect(`/login?serviceUrl=${$.query.serviceUrl}`); //3. Checks if valid global session exists and i fnot then redirects to login
    }else{
        $.redirect(`${$.query.serviceUrl}?ssoToken=${$.cookies.token}`);
    }
     
});

//4. Redirected to login page with service url set to the page requested by the user
app.get('/login',($) =>{
    console.log('/login');
    $.data.signin=`/signin?serviceUrl=${$.query.serviceUrl}`;
    $.render(`login`)
})

//5. User authenticates and global session established b/w user and sso server and browser is redirected to the page requested with token as query param to identify user in underlying application
app.post('/signin', ($) => {
    console.log('sign in........................');
    $.data.message = $.body.email;
    let token = jwt.sign({
        email : $.body.email,
        userid : 'qwerty12345uiop67890'
      }, 'secret', { expiresIn: 60 * 60 });
    $.cookies.set('token',token);
    $.redirect(`${$.query.serviceUrl}?ssoToken=${$.cookies.token}`);
})

app.get('/verifyToken', ($) => {
    console.log('/verify');
    let decoded = jwt.verify($.query.ssoToken,'secret');
    let user = __db.users.find(x => x.__id === decoded.userid);
    $.data.user = user;
    $.json();
})

app.listen('http://authsso.com:8087')