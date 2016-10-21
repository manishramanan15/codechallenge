(function () {
    'use strict';

 
    app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
        
        $scope.logOut = function () {
            authService.logOut();
            $location.path('/index');
        }

        $scope.authentication = authService.authentication();


        $scope.savedSuccessfully = false;
        $scope.message = "";



    }]);


})();
