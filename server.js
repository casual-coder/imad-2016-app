var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user : 'casual-coder',
    database : 'casual-coder',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var articles = { 
    'article-one' : {
        title : 'The Houses Of Hogwarts | Rachna Ramesh',
        content : `
                <div style="float:left; width:60%;">
                    <p id = "gry">
                        <h1 style = "color : red">GRYFFINDOR!</h1>
                        <h3>Where Dwell the Brave at Heart.<h3>
                        <h3>Their daring nerve and chivalry set Gryffindors apart!<h3>
                    </p>
                    <p>
                        <h1 style = "color : yellow">HUFFLEPUFF!<h1>
                        <h3>Where they are Just and Loyal.<h3>
                        <h3>Those patient hufflepuffs are true and unafraid of toil!<h3>
                    </p>
                    <p id = "rav">
                        <h1 style = "color : blue">RAVENCLAW!<h1>
                        <h3>Wit Beyond Measure is Man's Greatest Treasure.<h3>
                        <h3>Where those of wit and learning will always find their kind!<h3>
                    </p>
                    <p>
                        <h1 style = "color : green">SLYTHERIN!<h1>
                        <h3>Is where you'll make your real friends.<h3>
                        <h3>Those cunning folks use any means to achieve their ends!<h3>
                    </p>
                </div>
                <div style="float:right; width:40% ">
                    <p id="demo">
                        <script>
                            var myArray = ['GRYFFINDOR', 'HUFFLEPUFF', 'RAVENCLAW', 'SLYTHERIN'];   
                            var rand = Math.floor(Math.random() * myArray.length);
                            var concat = myArray[rand];
                            function random() {
                                document.getElementById("demo").innerHTML = (concat);
                            }
                        </script>
                        <button onClick="random()">
                            <h3 style = "font-size : 2em">Find your House!</h3>
                        </button>
                    </p>
                </div>`
                   
    },
    'article-two' : {
        title : 'Article Two | Rachna Ramesh',
        content : ` 
                    <p>
                        This is the content for my second article. 
                    </p>`
        },
    'article-three' : {title : 'Article Three | Rachna Ramesh',
        content : ` 
                    <p>
                        This is the content for my third article. 
                    </p>`
        }
};
    
function createTemplate (data) {
    var title = data.title;
    var content = data.content;
    var htmlTemplate = `
        <html>
            <head>
                <title>
                    ${title}
                </title>
                <meta name = "viewport" content = "width=device-width, initial-scale=1" />
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class = "container">
                    <div>
                        <a href = "/">Home</a>
                    </div>
                    <hr/>
                    <div>
                        ${content}
                    </div>
                </div>
            </body>
        </html>
        `;
        return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString()) ;
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});
var counter = 0;
app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) {   // URL: /submit-name?name=xxxxx
    //Get the name of the request
    var name = req.query.name;
    
    names.push(name);
    //JSON = Javascript Object Notation
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function(req, res) {
    //articleName == article-one
    //articles[articleName] == {} content object of article-one
    var articleName = req.params.articleName;
    
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result){
        if(err){
            res.status(500).send(er.toString());
        } else {
            if(result.rows.length === 0){
                res.status(404).send('Article Not found');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    }); 
   
});

function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 512, 10000, 'sha512');  
    return ['pbkdf2', "10000", salt, hashed.toString('hex')].join('$');
} 


app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, 'some-random-string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res) {
   //username, password
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user"(username, password) VALUES($1, $2)',[username, dbString], function(err, result){
        if(err){
            res.status(500).send(err.toString()) ;
        }else{
            res.send('USER successfully created : ' + username);
        }
   });
});

app.post('/login', function(req, res){
   var username = req.body.username;
   var password = req.body.password;

   pool.query('SELECT * from "user" username = $1',[username], function(err, result){
        if(err){
            res.status(500).send(err.toString()) ;
        }else{
            if(result.rows.length === 0){
                res.send(403).send('Username or password is invalid');
            }
            else {
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                if(hashedPassword === dbString){
                    res.send('Credentials Correct!');
                }else{
                     res.send(403).send('Username or password is invalid');
                }
                
            }
        }
   });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/favicon.ico', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
