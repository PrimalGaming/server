const express = require ('express')
const mysql      = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'student',
  database : 'name'
});

db.connect(function(err){
    if (err) throw err
    console.log("My SQL is connected, looking good")
});

const api = express();
// creating db
api.get('/createdb',(req, res) => {
    let sql = 'CREATE DATABASE name'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created ... ');
    });
});
// create a table
api.get("/greatposttable", (req, res) => {
    let sql = 'CREATE TABLE posts (ID int NOT NULL AUTO_INCREMENT, title varchar (255), body varchar (255), PRIMARY KEY (ID) );'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("created the table correctly");
    });
});
// inserts a post into post table
api.get("/addpost/", (req,res) => {
    let post = {title: "My Post", body: "Hello how are you"}
    let sql = 'INSERT INTO SET posts (title, body) values ("hi", "bye")'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("first post added");
    })
});
api.get("/secpost", (req, res) => {
let post = {title: "something", body: "Something else"}
   let sql = 'INSERT INTO posts SET ?';
   db.query( sql, post,  (err, result) => {
       if (err) throw err;
       console.log(result);
       res.send("add the second");
   })
});

// select all post
api.get("/getposts", (req, res) => {
   let sql = 'SELECT * FROM posts';
   db.query( sql,  (err, result) => {
       if (err) throw err;
       console.log(result);
       res.send(result);
   })
});

//select a single post
api.get("/getpost/:id", (req, res) => {
   let sql = 'SELECT * FROM posts WHERE ID ='+ req.params.id;
   db.query( sql,  (err, result) => {
       if (err) throw err;
       console.log(result);
       res.send(result);
   })
});

api.get("/deletepost/:id", (req, res) => {
    let sql = 'DELETE FROM posts WHERE ID ='+ req.params.id;
    db.query( sql,  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
 });

api.listen(5000);

console.log("server is live on port 5000");
