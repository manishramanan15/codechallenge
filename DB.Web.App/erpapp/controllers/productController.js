(function () {
    'use strict';


    app.controller('productController', ['$scope', '$location', 'odataService', function ($scope, $location, odataService) {


        var _porduct = {
            "ProductID": 0,
            "ProductName": "",
            "SupplierID": 0,
            "CategoryID": 0,
            "QuantityPerUnit": "",
            "UnitPrice": "",
            "UnitsOnOrder": 20
        };

        $scope.suppliers = {};
        $scope.categories = {};

        odataService.getSuppliers().then(function (results) {
            $scope.suppliers = results.data.value;

        }, function (error) {
            //alert(error.data.message);
        });

        odataService.getCategories().then(function (results) {
            $scope.categories = results.data.value;

        }, function (error) {
            //alert(error.data.message);
        });



        $scope.porduct = _porduct;


        $scope.savedSuccessfully = false;
        $scope.errormessage = '';


        $scope.addproducts = function () {

            odataService.saveProducts($scope.porduct).then(function (response) {
                $scope.savedSuccessfully = true;
                $scope.errormessage = "Product Added Successfully";
                //startTimer();

                $location.path("/tables_dynamic");
            },
             function (response) {

                 var errors = [];
                 if (response.data.modelState) {
                     for (var key in response.data.modelState) {
                         for (var i = 0; i < response.data.modelState[key].length; i++) {
                             errors.push(response.data.modelState[key][i]);
                         }
                     }
                 }

                 if (response.data.error) {
                     errors.push(response.data.error.message);
                     if (response.data.error.innererror)
                         errors.push(response.data.error.innererror.message);
                 }

                 $scope.errormessage = "Failed to register Product due to:" + errors.join(' ');
             });

        };

    }]);


})();
