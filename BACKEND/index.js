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
//add bookings
app.post('/booking/',(req,res)=>{
    
    
    
    let booking = req.body;
    if(booking.type == 1){
        
        //Room booking
        mysqlConnection.query("INSERT INTO room_reservation (r_rid, r_cname, r_phone, r_nic, r_address, r_bookingdate, check_in, check_out, no_singleroom, no_doubleroom, no_trippleroom) VALUES (NULL, '"+booking.customer.fName+" "+booking.customer.lName +"', '"+booking.customer.tel+"', '"+booking.customer.nic+"', '"+booking.customer.address+"', curdate(), '"+booking.room.aDate+"', '"+booking.room.dDate+"', '"+booking.room.sR+"', '"+booking.room.dR+"', '0');",(err,rows,fields)=>{
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        });


    }else if(booking.type == 2){
        mysqlConnection.query("INSERT INTO hall_reservation (h_rid, h_cname, h_phone, h_nic, h_address, h_crowd, h_menu, h_type, h_bookingdate, h_functiondate) VALUES (NULL, '"+booking.customer.fName+" "+booking.customer.lName +"', '"+booking.customer.tel+"', '"+booking.customer.nic+"', '"+booking.customer.address+"', '0', '0', '0', curdate(), '"+booking.hall.bknDate+"');",(err,rows,fields)=>{
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        });
    }else{

       //Nothing here
    }
    
    
});
//Load Customer bookings
app.get('/myBookings/:id',(req,res)=>{
    var bookings;
    mysqlConnection.query('SELECT * FROM rooms',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

//Load hall bookings
app.get('/hallBooking/',(req,res)=>{
    var bookings;
    mysqlConnection.query('SELECT * FROM hall_reservation',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});

//Load room bookings
app.get('/roomBooking/',(req,res)=>{
    var bookings;
    mysqlConnection.query('SELECT * FROM room_reservation',(err,rows,fields)=>{
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