var mongoose = require('mongoose');
var Member = mongoose.model('Member');
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');

exports.signup = function(req, res){
	if(req.session.logined) {
		res.redirect('/');
		return;
	}
	res.locals.havesignup = req.session.havesignup;
	req.session.havesignup = false;
	if(typeof req.session.alertMessage != 'undefine') {
		res.render('blog/signup', { title: 'Node Express Blog', alertMessage: req.session.alertMessage});
	} else {
		res.render('blog/signup', { title: 'Node Express Blog'});
	}
};

exports.api_signup = function(req, res){
	if(!(req.body.username) || !(req.body.password)) {
		res.redirect('/signup');
		return;
	}

	Member.find({Username: req.body.username, Password: req.body.password}, 
		function(err, member){
			if(member.length == 0) {
				new Member({
					Username:req.body.username,
					Password: req.body.password
				}).save(function(){
					if(err){
						console.log('fail to new member');
					} else {
						req.session.havesignup = false;
						console.log('save member!');
						req.session.username = req.body.username;
						req.session.password = req.body.password;
						req.session.logined = true;
						res.redirect('/');
					}
				});
			} else {
				req.session.havesignup = true;
				console.log('have been signup!!!');
				req.session.alertMessage = '這個帳號已經註冊過囉><';
				res.redirect('/signup');
				return;
			}
	});

};

exports.login = function(req, res) {
	if(req.session.logined) {
		res.redirect('/');
		return;
	}
	res.render('blog/login', { title: 'Log In' });
};

exports.api_login = function(req, res){
	if(!(req.body.username) || !(req.body.password)) {
		res.redirect('/signup');
		return;
	}
	Member.find({Username: req.body.username, Password: req.body.password}, function(err, member){
		if(member.length == 0) {
			console.log('Sorry, No this member');
		} else {
			req.session.username = req.body.username;
			req.session.password = req.body.password;
			req.session.logined = true;
			req.session.alertMessage = '登入成功';
			res.redirect('/');
		}
	})
};

exports.logout = function(req, res) {
	req.session.username = ''
	req.session.password = ''
	req.session.logined = false;
	res.redirect('/');
};

exports.create = function(req, res){
	if(!req.session.logined) {
		res.redirect('/');
		return;
	} else {
		res.locals.username = req.session.username;
  		res.locals.password = req.session.password;
		res.render('blog/create', { title: 'Node Express Blog'});
	}
}

exports.create_post = function(req, res){
	if(!req.session.logined) {
		res.redirect('/');
		return;
	} 	
	new Blog({
		Author: req.session.username,
		Title: req.body.title,
		Content: req.body.content,
		CreatedTime: Date.now()
	}).save(function(err){
		if(err) {
			console.log('fail to add post');
		} else {
			console.log('add post success!');
			res.redirect('/');
			return;
		}
	})
};

exports.profile = function(req, res){
	if(!req.session.logined) {
		res.redirect('/');
		return;
	} 	
	Blog.find({Author: req.session.username}, function(err, blogs){
		if(blogs.length == 0) {
			console.log('you dont have any post');
			res.redirect('/');
			return;
		} else {
			res.locals.username = req.session.username;
  			res.locals.password = req.session.password;
			res.render('blog/profile', {title: 'Node Express Blog', blogs: blogs});
		}
	})
};

exports.update = function(req, res){
	if(!req.session.logined) {
		res.redirect('/');
		return;
	} 	
	res.locals.username = req.session.username;
	res.locals.password = req.session.password;
	Blog.find({_id: req.params.postId}, function(err, blog){
		if(err) {
			console.log('fail to find update');
		} else {
			res.render('blog/update', {title: 'Node Express Blog', blog: blog, postId: req.params.postId});
			console.log('find update post');
		}
	});
};

exports.update_post = function(req, res){
	if(!req.session.logined) {
		res.redirect('/');
		return;
	} 	
	Blog.update({_id: req.params.postId}, {Title: req.body.title, Content: req.body.content}, function(err){
		if(err) {
			console.log('update fail');
		} else {
			console.log('update.success');
			res.locals.username = req.session.username;
  			res.locals.password = req.session.password;			
			res.redirect('/');
			return; 
		}
	});
};

exports.delete_post = function(req, res){
	if(!req.session.logined) {
		res.redirect('/');
		return;
	} 	
	Blog.remove({_id: req.params.postId}, function(err){
		if(err) {
			console.log('remove fail');
		} else {
			console.log('remove success!');
			res.locals.username = req.session.username;
  			res.locals.password = req.session.password;			
			res.redirect('/');
			return; 
		}
	});
}

