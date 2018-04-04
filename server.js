const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const hbs = require('hbs')
const fs = require('fs')

const { Pool, Client } = require('pg')

const app = express();

var dbURL = process.env.DATABASE_URL || "postgres://postgres:thegoodpass@localhost:5432/postgres"; // change this per db name

const pool = new Pool({
    connectionString: dbURL,
})

//pool.query('SELECT username fROM USERS WHERE password= $1', ["isiWoo"], (err, res) => {
//    //console.log(err, res)
//    console.log(res)
//    //console.log(res.rows[0].username)
//    pool.end()
//})

app.use(express.static(__dirname + "/src"))

app.use((request, response, next)=>{
    profile = hbs.compile(fs.readFileSync(__dirname + "/views/radicals/profile.hbs", 'utf8'))
    next();
})


hbs.registerPartials(__dirname + "/views/partials")


app.use(bodyParser.json()) //Needed for when retrieving JSON from front-end
app.set('view engine', 'hbs')
app.use(session({ secret: 'tolkien', saveUninitialized: false, resave: false, cookie: { maxAge: 5 * 60000 } }))


app.get("/", (request, response) => {

    response.sendFile(__dirname + "/front_end.html")
    //response.end('This is a test for stuff')
})

app.post("/login", (request, response, next) => {
    /*if (request.body["request-type"] === "login") {
        if (request.body["name"] === "glenn" && request.body["pass"] === "slit") {
            request.session.myvar = request.body
            response.json({ message: "Login Successful", url: "hub" })
        } else {
            response.json({ message: "Login Failed", url: "Message Failed" })
        }

    } */
    
    pool.query('SELECT password, pk_id FROM USERS where username= $1', [ request.body["name"] ], (err, res) => {
        console.log(res)
        if(res.rows.length === 0){
            response.json({ message: "Login Failed", url: "Message Failed" })
        }else{
            if(res.rows[0].password == request.body["pass"]){
                //---------------------------------------------------------------------
                var sess_pk_id = res.rows[0].pk_id;
                //console.log(request.session)
                //console.log(request.session.cookie._expires)
                //console.log(request.session.cookie.originalMaxAge)
                //console.log(request.sessionID)
                pool.query("Insert into sessions (pk_id, s_id, sess, expire) VALUES ($1, $2, $3, $4)", [sess_pk_id, request.sessionID, request.session, request.session.cookie._expires]);
                request.session.myvar = request.body
                
                //---------------------------------------------------------------------
                response.json({ message: "Login Successful", url: "hub" })
            }else{
                response.json({ message: "Login Failed", url: "Message Failed" })
            }
        }
    })
})

app.get("/hub", (request, response, next) => {
    sessionInfos = request.session.myvar

    response.render("hub.hbs", {
        username: sessionInfos["name"],
        sel: [{
            opt_name: "Profile",
            img_source: "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png",
            layout: profile({
                fname: "Romy",
                lname: "Li",
                comment: "He's Romy Li"
            })
        }, {
            opt_name: "Contacts",
            img_source: "http://www.gaby-moreno.com/administrator/public_html/css/ionicons/png/512/android-contacts.png",
            layout: profile({
                fname: "Romy",
                lname: "Li",
                comment: "He's Romy Li"
            })
        }]
    })
})

app.post("/signup", function(req, resp){
    //var username = req.body.name;
    //var passcode = req.body.pass;
    console.log(request.body["name"])
});

app.listen(3000, (err) => {
    if (err) {
        console.log('Server is down');
        return false;
    }
    console.log('Server is up');
})