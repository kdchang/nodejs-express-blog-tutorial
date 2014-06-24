nodejs-express-blog-tutorial
============================

This is a Node.js blog tutorial uses the Express Framework

#Prerequisites
1. Node.js
2. Express v3
3. mongodb
4. mongoose 


#Run
		node app.js

check in the browser: http://localhost:3000


#MongoDB
> use nodejs-express-blog-tutorial
switched to db nodejs-express-blog-tutorial
> show collections
members
system.indexes
> db.members.find()
{ "Username" : "mozilla", "Password" : "123", "_id" : ObjectId("53a948c48fd3960000cad9a7"), "__v" : 0 }
>