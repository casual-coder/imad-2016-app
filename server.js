var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = { 
    'article-one' : {
        title : 'The Houses Of Hogwarts | Rachna Ramesh',
        content : `
                <p>
                    <h1>GRYFFINDOR!</h1>
                    <h2>Where Dwell the Brave at Heart.<h3>
                    <h2>Their daring nerve and chivalry set Gryffindors apart!<h3>
                </p>
                <p>
                    <h1>HUFFLEPUFF!<h1>
                    <h2>Where they are Just and Loyal.<h2>
                    <h2>Those patient hufflepuffs are true and unafraid of toil!<h2>
                </p>
                <p>
                    <h1>RAVENCLAW!<h1>
                    <h2>Wit Beyond Measure is Man's Greatest Treasure.<h2>
                    <h2>Where those of wit and learning will always find their kind!<h2>
                </p>
                <p>
                    <h1>SLYTHERIN!<h1>
                    <h2>Is where you'll make your real friends.<h2>
                    <h2>Those cunning folks use any means to achieve their ends!<h2>
                </p>`
                   
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

app.get('/:articleName', function(req, res) {
    //articleName == article-one
    //articles[articleName] == {} content object of article-one
    var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
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
