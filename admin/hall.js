
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.booking = function(){
        $http({
            method : "GET",
            url : "http://localhost:3000/hallBooking/"
        }).then(function mySuccess(response) {

            booking = response.data;
            $scope.data = booking;
            console.log(booking);
            
            }, function myError(response) {
            // $scope.result = response.statusText;
        });
    }
    $scope.booking();

    $scope.cancel = function(id){
        $http({
            method : "DELETE",
            data:"",
            url : "http://localhost:3000/hallCancel/"+id
        }).then(function mySuccess(response) {

            booking = response.data;
            // $scope.data = booking;
            console.log(booking);
            $scope.booking();
            
            }, function myError(response) {
            // $scope.result = response.statusText;
        });
    }
});


