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
//add supplier
app.post('/supplier/',(req,res)=>{
        let supplier = req.body;
        console.log(supplier.name);
        // res.send(supplier);
        mysqlConnection.query("INSERT INTO suppliers (s_id, s_name, s_company, s_phone, s_email, s_comaddress, s_comphone) VALUES (NULL, '"+supplier.name+"', '"+supplier.cName+"', '"+supplier.tel+"', '"+supplier.email+"', '"+supplier.address+"', '')",(err,rows,fields)=>{
            if(!err){
                res.send(rows);
            }else{
                console.log(err);
            }
        }); 
    
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
//Load suppliers
app.get('/suppliers/',(req,res)=>{
    var bookings;
    mysqlConnection.query('SELECT * FROM suppliers',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});



//Load A supplier
app.get('/supplier/:id',(req,res)=>{
    
    mysqlConnection.query('SELECT * FROM suppliers WHERE s_id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});
//Edit A supplier
app.post('/editSupplier/',(req,res)=>{
    var data = (req.body);

    mysqlConnection.query("UPDATE suppliers SET s_name = '"+data.name+"', s_company = '"+data.compName+"', s_phone = '"+data.tp+"', s_email = '"+data.Email+"', s_comaddress = '"+data.compAddress+"', s_comphone = '' WHERE suppliers.s_id = ?;",[data.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});


//update room data
app.post('/roomUpdate/',(req,res)=>{
    var data = (req.body);
    mysqlConnection.query("UPDATE room_reservation SET no_singleroom = '"+data.sR+"', no_doubleroom = '"+data.dR+"' WHERE room_reservation.r_rid =  ?;",[data.id],(err,rows,fields)=>{
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

//Load a room bookings
app.get('/roomBooking/:id',(req,res)=>{
    var bookings;
    mysqlConnection.query('SELECT * FROM room_reservation WHERE r_rid = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    });
});




//delete room booking
app.delete('/roomCancel/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM room_reservation WHERE room_reservation.r_rid =  ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send("Deleted successully");
        }else{
            console.log(err);
        }
    });
});
//delete supplier
app.delete('/supplier/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM suppliers WHERE suppliers.s_id =  ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send("Deleted successully");
        }else{
            console.log(err);
        }
    });
});
//delete hall booking
app.delete('/hallCancel/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM hall_reservation WHERE hall_reservation.h_rid =  ?;',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send("Deleted successully");
        }else{
            console.log(err);
        }
    });
});


