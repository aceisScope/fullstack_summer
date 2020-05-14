var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Static path
// app.use(express.static(path.join(__dirname, 'public')))

var users = [{
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@gmail.com'
},
{
  id: 2,
  first_name: 'Bob',
  last_name: 'Smith',
  email: 'bobsmith@gmail.com'
},
{
  id: 1,
  first_name: 'Charlie',
  last_name: 'Bowl',
  email: 'charliebowl@gmail.com'
}]

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Customers',
    users: users
  })
});

app.post('/user/add', function(req, res){
  var newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };
  console.log(newUser)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});