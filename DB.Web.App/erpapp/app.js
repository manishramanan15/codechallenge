
    'use strict';

    var app = angular.module('HLFErpApp', [
        // Angular modules 
        'ngRoute',
        'ngSanitize',
        
        // Custom modules 
        'LocalStorageModule',
        'angular-loading-bar'
        

        // 3rd Party Modules
        
    ]);


    app.config(function ($routeProvider) {

        $routeProvider.when("/index", {
            controller: "indexController",
            templateUrl: "/erpapp/views/index.html"
        });

       
        $routeProvider.when("/tables_dynamic", {
            controller: "dynamicdataTablesController",
            templateUrl: "/erpapp/views/tables_dynamic.html"
        });

      

        $routeProvider.when("/products", {
            controller: "productController",
            templateUrl: "/erpapp/views/products.html"
        });


        $routeProvider.otherwise({ redirectTo: "/index" });

    });



    //directive to make data table
    app.directive('makeTable', ['$timeout', function ($timeout) {
        return {
            link: function ($scope, element, attrs) {
                $scope.$on('makedatatable', function () {
                    $timeout(function () {
                        jQuery(element).DataTable();
                    }, 0, false);
                })
            }
        };
    }]);

    //directive to make data table
    app.directive('autoComplete', ['$timeout', function ($timeout) {
        return {
            scope: {
                // creates a scope variable in your directive
                // called `autodatat` bound to whatever was passed
                // in via the `autodata` attribute in the DOM
                autodata: '=autodata'
            },
            link: function ($scope, element, attrs) {
                $scope.$watch('autodata', function (autodata) {

                    var productsArray = $.map(autodata, function (value, key) {
                        return {
                            label: value.ProductID,
                            value: value.ProductName
                        }
                    })
                  
                    jQuery(element).autocomplete({
                        lookup: productsArray
                    });
                });
            }
        };
    }]);



  
    //var serviceBase = "http://localhost:49650/";
    var serviceBase = 'http://dkservice.azurewebsites.net/';
    app.constant('ngAuthSettings', {
        apiServiceBaseUri: serviceBase
    });



    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    //app.run(['authService', function (authService) {
    //    authService.fillAuthData();
    //}]);

