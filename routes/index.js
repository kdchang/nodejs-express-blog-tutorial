
/*
 * GET home page.
 */
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

exports.index = function(req, res){
  res.locals.username = req.session.username;
  res.locals.password = req.session.password;
  Blog.find(function(err, blogs){  	
  	res.render('index', { 
  		title: 'Node Express Blog',
  		blogs: blogs
  	});
  });
};