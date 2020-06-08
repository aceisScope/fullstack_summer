const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Blog = require('../models/blog');
const mongoose = require('mongoose')

var ObjectId = mongoose.Types.ObjectId

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.post('/updateAvatar', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const username = req.body.username
  const newAvatar = req.body.avatar

  User.updateUserAvatar(username, newAvatar, (err, user) => {
    if(err) throw err;
    res.json({user: user});
  })
});

// Blog
router.post('/blog', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const newBlog = new Blog({
    title: req.body.title,
    tag: req.body.tag,
    content: req.body.content,
    author: ObjectId(req.body.userid)
  })
  
  Blog.addBlog(newBlog, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to create new blog'});
    } else {
      res.json({success: true, msg: 'New blog created'});
    }
  })
});

router.get('/blog', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  const author = new ObjectId(req.query.userid)
  console.log(author)

  Blog.getBlogsByAuthor(author, (err, blogs) => {
    res.json({blogs: blogs});
  })
});

module.exports = router;