
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.IsDisabled = false;
    var hall = {
        //bId:"",
        bknDate :"",
        purpose :"",
        payment :""
    }

    $scope.room = {
        //bId:"",
        aDate:"",
        dDate:"",
        sR:0,
        dR:0

    }
    var customer ={
        fName:"",
        lName:"",
        nic:"",
        address:"",
        tel:"",
        email:""
    }


    $scope.bookingType = 0;
    $scope.bTypeHead = "";
    //0 for null
    //1 for room
    //2 for hall

    $scope.templates = [{
        name: 'Select Your Reservation Type',
        url: 'selectType.html'
    }, {
        name: 'customerForm.html',
        url: 'customerForm.html'
    },
    {
        name:'room',
        url:"room.html"
    },{
        name:"hall",
        url:"hall.html"
    },{
        name:"finish booking",
        url:"finishBooking.html"
    },{
        name:"my bookings",
        url:"myBookings.html"
    }
    ];

    
    $scope.defaultTemplate=function(){
        $scope.template = $scope.templates[0];
        //Set default booking type as null
        $scope.bookingType = 0;
        $scope.bTypeHead = "";
    }
    $scope.defaultTemplate();
    //Load my bookings
    $scope.loadMyBookingsPage = function(){
        $scope.template = $scope.templates[5];
    }

    //this is for room
    $scope.registerCustomerForRoom=function(){
        $scope.bookingType = 1;
        $scope.bTypeHead = "Room";
        $scope.template = $scope.templates[1];
    }
    //this is for hall
    $scope.registerCustomerForHall=function(){
        $scope.bookingType = 2;
        $scope.bTypeHead = "Hall";
        $scope.template = $scope.templates[1];
    }

    //Auto fill data
    //Autofill data for cutomer
    $scope.autoFillDataCustomer  = function(){
        $scope.fName = "Sam";
        $scope.lName = "Dylan";
        $scope.cNic = "987654321v";
        $scope.cAddress = "P.O. Box 200, 7063 Enim Av.";
        $scope.cPhone = "0710000000";
        $scope.cEmail = "imperdiet@acsemut.ca";
        
    }
    //Auto fill room data
    $scope.autoFillDataRoom = function(){
        // $scope.arrive = "10/12/2019";
        // $scope.depart = "20/12/2019";
        $scope.no_doub_rooms = 2;
        $scope.no_sin_rooms = 2;
    }

    $scope.autoFillDataHall = function(){
        // $scope.booking_date = "10/12/2019";
        $scope.purpose = "Wedding";
        $scope.pay_amount = 10000;
    }

    $scope.roomOrHall = function(){




            customer.fName = document.getElementById("fName").value;
            customer.lName = document.getElementById("lName").value;
            customer.nic   = document.getElementById("cNic").value;
            customer.address = document.getElementById("cAddress").value;
            customer.tel = document.getElementById("cPhone").value;;
            customer.email = document.getElementById("cEmail").value;



        if(customer.fName == ""){
            document.getElementById("msg").innerHTML = "Enter First name";
        }else if(customer.lName == ""){
            document.getElementById("msg").innerHTML = "Enter Last Name";
        }else if(customer.nic.length != 10 && customer.nic == ""){
            document.getElementById("msg").innerHTML = "Enter a valid Nic";
        }else if(customer.address == ""){
            document.getElementById("msg").innerHTML = "Enter Address";
        }else if(customer.tel.length == 10 && customer.tel == ""){
            document.getElementById("msg").innerHTML = "Entera a telephone number";
        }else if(customer.email == ""){
            document.getElementById("msg").innerHTML = "Enter emai address";
        }
                else{

        
                    $scope.fName = customer.fName;
                    $scope.lName = customer.lName;
                    $scope.cNic = customer.nic
                    $scope.cAddress = customer.address;
                    $scope.cPhone = customer.tel;
                    $scope.cEmail = customer.email;
            
            if($scope.bookingType == 1){
                //Room
                $scope.template = $scope.templates[2];
            }else if($scope.bookingType == 2){
                //Hall
                $scope.template = $scope.templates[3];
            }else{

            }
        }
    }

    
    

    $scope.finishRoomBkng = function(){
        $scope.room.aDate = document.getElementById('arrive').value;
        $scope.room.dDate = document.getElementById('depart').value;
        $scope.room.sR = document.getElementById('no_sin_rooms').value;
        $scope.room.dR = document.getElementById('no_doub_rooms').value;
        if($scope.room.aDate == ""){
            document.getElementById("msg").innerHTML = "Enter a arrival date";
        }else if($scope.room.dDate == ""){
            document.getElementById("msg").innerHTML = "Enter a depart date";
        }else if($scope.room.sR + $scope.room.dR == 0){
            document.getElementById("msg").innerHTML = "Select a room";
        }
        else{

        
        var temp = {
           data: [
                {
                name:"Arrive Date",
                data:$scope.room.aDate
            },{
                name:"Depart Date",
                data:$scope.room.dDate
            },{
                name:"Number of single rooms",
                data:$scope.room.sR
            },{
                name:"Numer of double rooms",
                data:$scope.room.dR
            }
            ]
        };
        $scope.template = $scope.templates[4];
        $scope.data = temp.data;
    }  
    }
    $scope.finishHallBkng = function(){
       hall.bknDate = document.getElementById('booking_date').value;
       hall.purpose = document.getElementById('purpose').value;
       hall.payment = document.getElementById('pay_amount').value;


        if(hall.bknDate == ""){
            document.getElementById("msg").innerHTML = "Enter date";
        }else if(hall.purpose == ""){
            document.getElementById("msg").innerHTML = "Enter purpose";
        }else if(hall.payment == ""){
            document.getElementById("msg").innerHTML = "Enter payment";
        }
        else {

       


       var temp = {
        data: [
             {
             name:"Booking Date",
             data:hall.bknDate
         },{
             name:"purpose",
             data:hall.purpose
         },{
             name:"payment",
             data:hall.payment
         }
         ]
     };
        $scope.template = $scope.templates[4];
        $scope.data = temp.data;
    }
    }

    $scope.backDesideInFinish = function(){
        if($scope.bookingType == 1){
            //Room
            $scope.template = $scope.templates[2];
        }else if($scope.bookingType == 2){
            //Hall
            $scope.template = $scope.templates[3];
        }else{

        }

    }
    $scope.finish = function(){
        $scope.IsDisabled = true;
        var book = {
            type : $scope.bookingType,
            hall : hall,
            room:$scope.room,
            customer:customer
        }

        // $scope.result = book;


        $http({
            method : "POST",
            data:JSON.stringify(book),
            url : "http://localhost:3000/booking/"
        }).then(function mySuccess(response) {

            reservationId = response.data.insertId;
            console.log(reservationId);
            document.getElementById("result").innerHTML = "<h1>Your reservation is done</h1>Reservation id - "+reservationId;
            
            }, function myError(response) {
            $scope.result = response.statusText;
        });
    }


    $scope.loadMyBookings = function(){

    }

    
    $scope.findMyB = function(id){
        $http({
            method : "GET",
            url : "http://localhost:3000/myBookings/"+id
        }).then(function mySuccess(response) {

            reservationId = response.data;
            console.log(reservationId);
            
            }, function myError(response) {
            // $scope.result = response.statusText;
        });
    }
});


