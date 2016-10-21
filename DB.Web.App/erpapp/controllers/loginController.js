'use strict';
app.controller('loginController', ['$scope', '$location', 'authService', 'ngAuthSettings', function ($scope, $location, authService, ngAuthSettings) {

    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: false
    };

    $scope.message = '';

    $scope.login = function () {

        try {
            authService.login($scope.loginData).then(function (response) {

                $location.path('/index');
            },
             function (response) {
                 console.log(response);
                 $scope.message = response.error_description || 'something went wrong';
             });
        } catch (e) {

            $scope.message = e.message;
        }
    };

   
}]);
