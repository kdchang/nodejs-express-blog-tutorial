var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Database Schema
var Member = new Schema({
	Username: String,
	Password: String
});

var Blog = new Schema({
	Author: String,
	Title: String,
	Content: String,
	CreatedTime: Date
});

var Comment = new Schema({
	Author: String,
	Content: String,
	MessageID: Schema.Types.ObjectId,
	CreatedTime: Date
});

// in the mongodb the collection is members
mongoose.model('Member', Member);
mongoose.model('Blog', Blog);
mongoose.model('Comment', Comment);
mongoose.connect('mongodb://localhost/nodejs-express-blog-tutorial');
