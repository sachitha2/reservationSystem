const mysql = require('mysql');
const express = require('express');

var app = express();

const bodyparser = require('body-parser');


app.use(bodyparser.json(),function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});



var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'reser',
    multipleStatements : true
});


mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Database connected successfully");
    }else{
        console.log("Connection filed \n Error "+JSON.stringify(err,undefined,2));
    }
});


app.listen(3000,()=>console.log('Express server is running ar port 3000 '));

//get all rooms
app.get('/rooms',(req,res)=>{
    mysqlConnection.query('SELECT * FROM rooms',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});
//get a room
app.post('/booking/',(req,res)=>{
    
    
    // res.send(req.body);

    
    let booking = req.body;
    
    
    mysqlConnection.query('INSERT INTO customer (id, fName,lName,nic,address,tel,email,rDate) VALUES ("", "a","a","v","grrg","0715591137","shpsachitha@gmail.com", curdate());',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});
//Load Customer bookings
app.get('/myBookings/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM rooms',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

//room/1
app.get('/rooms/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM rooms WHERE room_no = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

//Delete a room
app.delete('/rooms/:id',(req,res)=>{
    mysqlConnection.query('DELETE  FROM rooms WHERE room_no = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send("Deleted successully");
        }else{
            console.log(err);
        }
    });
});

//Insert a room
app.post('/rooms/',(req,res)=>{
    let emp = req.body;
    mysqlConnection.query('INSERT INTO rooms (room_no, room_type, price) VALUES (\'?\', \'?\', \'?\');',[emp.rId,emp.rId,emp.rId],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});