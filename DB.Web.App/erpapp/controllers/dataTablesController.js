(function () {
    'use strict';

    
    app.controller('staticdataTablesController', ['$scope', '$location', '$timeout', 'odataService', function ($scope, $location, $timeout, odataService) {

      

        odataService.getSuppliers().then(function (results) {
            $scope.suppliers = results.data.value;

        }, function (error) {
            //alert(error.data.message);
        });


   


    }]);


    app.controller('dynamicdataTablesController', ['$scope', '$location', '$timeout', 'odataService', function ($scope, $location, $timeout, odataService) {

      

        odataService.getProducts().then(function (results) {
            //console.log(results.data.value);
            $scope.products = results.data.value;
            $scope.$broadcast('makedatatable');


        }, function (error) {
            //alert(error.data.message);
        });




    }]);

})();
