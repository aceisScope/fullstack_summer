var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const { check, validationResult } = require('express-validator');

var app = express();

// View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Static path
// app.use(express.static(path.join(__dirname, 'public')))

//setup global variables
app.use(function(req, res, next){
  res.locals.errors = null;
  next();
});

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

app.post('/user/add', [
  // email must be an email
  check('email').isEmail(),
  // firstname must be at least 5 chars long
  check('firstName').isLength({ min: 5 }),
  // lastname can't be empty
  check('lastName').not().isEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('index', {
      title: 'Customers',
      users: users,
      errors: errors.array()
    })
  } else {
    var newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    res.json(newUser)
  }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});