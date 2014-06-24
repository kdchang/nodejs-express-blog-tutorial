
/**
 * Module dependencies.
 */
require('./models/db')
var express = require('express');
// define the routes
var routes = require('./routes');
var blog = require('./routes/blog');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
// app.use(express.cookieParser('your secret here'));
// app.use(express.session());
//add cookie-based session
app.configure(function(){
	app.use(express.cookieParser());
	app.use(express.cookieSession({
		key: 'node',
		secret: 'thisnodejsexpressblog'
	}));
	app.use(express.bodyParser());
})
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/signup', blog.signup);
app.get('/login', blog.login);
app.get('/logout', blog.logout);
app.get('/create', blog.create);
app.post('/api/signup', blog.api_signup);
app.post('/api/login', blog.api_login);
app.post('/api/create', blog.create_post);
app.get('/update/:postId', blog.update);
app.post('/api/update/:postId', blog.update_post);
app.get('/api/delete/:postId', blog.delete_post);
app.get('/profile', blog.profile);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
