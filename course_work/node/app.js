var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const { check, validationResult } = require('express-validator');
const mongojs = require('mongojs')
const db = mongojs('customerapp', ['users'])
var ObjectId = mongojs.ObjectId

var app = express();

// View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Static path
app.use(express.static(path.join(__dirname, 'public')))

//setup global variables
app.use(function(req, res, next){
  res.locals.errors = null;
  next();
});

app.get('/', function (req, res) {
  db.users.find(function (err, docs) {
    res.render('index', {
      title: 'Customers',
      users: docs
    })
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
    db.users.find((err, users) => {
      res.render('index', {
        title: 'Customers',
        users: users,
        errors: errors.array()
      })
    })
  } else {
    var newUser = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email
    }
    db.users.insert(newUser, (err, result) => {
      if(err) {
        console.log(err)
      }
      res.redirect('/')
    })
  }
})

app.delete('/users/delete/:id', function(req, res){
  db.users.remove({_id: ObjectId(req.params.id)})
  res.redirect('/')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});