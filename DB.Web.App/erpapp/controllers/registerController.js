(function () {
    'use strict';


    app.controller('registerController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {


        var _registration = {
            email: "",
            username: "",
            firstName: "",
            lastName: "",
            roleName: "",
            password: "",
            confirmPassword: ""
        };

        $scope.registration = _registration;

        $scope.savedSuccessfully = false;
        $scope.message = '';

        $scope.authentication = authService.authentication();

        $scope.register = function () {


            authService.saveRegistration($scope.registration).then(function (response) {

                $scope.savedSuccessfully = true;
                $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                //startTimer();

                $location.path("/tables");
            },
             function (response) {
                 var errors = [];
                 for (var key in response.data.modelState) {
                     for (var i = 0; i < response.data.modelState[key].length; i++) {
                         errors.push(response.data.modelState[key][i]);
                     }
                 }
                 $scope.message = "Failed to register user due to:" + errors.join(' ');
             });

        };

    }]);


})();
