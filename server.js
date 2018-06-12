const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('inde.txt','server.log: '+log + '\n', (err) => {
    if (err){
      console.log('unable to append');
    }
  });
  next();

});
app.use((req, res, next)=>{
  res.render('maintence.hbs');
});
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
  res.render('home.hbs', {
    pageTitle: 'about page',
    currentYear: new Date().getFullYear(),
    welcomePage: "Gao Ya I love you!"
  });
});

app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle: 'about page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) =>{
  res.send({
    errorMessage : "adss"
  });
});
app.listen(3000);
