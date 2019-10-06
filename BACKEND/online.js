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
    mysqlConnection.query('SELECT * FROM room_reservation where  room_reservation.r_rid =  ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});


app.get('/myReport/',(req,res)=>{
    


    var content = {
        id:"",
        type:"",
        date:"",
    }

    someJSONdata = [
        
     ];

    mysqlConnection.query('SELECT * FROM room_reservation ;',(err,rooms,fields)=>{
        if(!err){
            
            mysqlConnection.query('SELECT * FROM hall_reservation ;',(err,hall,fields)=>{
                if(!err){
                    
                    

                    lenRoom = rooms.length;

                    for(i = 0;i<lenRoom;i++){
                        content.id = rooms[i]['r_rid'];
                        content.type = "Room";
                        content.date = rooms[i]['r_bookingdate'];
                        someJSONdata.push(content);
                        content = {};
                    }
                    // console.log(someJSONdata);
                    


                    lenHall = hall.length;
                    for(i = 0;i<lenHall;i++){
                        content.id = hall[i]['h_rid'];
                        content.type = "Hall";
                        content.date = hall[i]['h_bookingdate'];
                        someJSONdata.push(content);
                        content = {};
                    }  

                    res.send(someJSONdata);
                }else{
                    console.log(err);
                }
            });


            // res.send(rooms);
           
        }else{
            console.log(err);
        }
    });
});


//delete my booking
app.delete('/booking/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM room_reservation WHERE room_reservation.r_rid =  ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send("Deleted successully");
        }else{
            console.log(err);
        }
    });
});


//edit my booking
app.post('/updateMyBooking/',(req,res)=>{
    var data = (req.body);
    console.log(data);
    mysqlConnection.query("UPDATE room_reservation SET r_cname = '"+data.name+"',r_phone = '"+data.tp+"', r_nic = '"+data.nic+"', r_address = '', r_bookingdate = curdate(), check_in = '"+data.arrive+"', check_out = '"+data.depart+"' WHERE room_reservation.r_rid = ?;",[data.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});