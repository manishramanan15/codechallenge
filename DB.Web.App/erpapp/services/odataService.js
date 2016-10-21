'use strict';
app.factory('odataService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var productsData = null;
    var ordersData = null;
    var suppliersData = null;
    var categoriesData = null;

    var odataServiceFactory = {};

    var _getCategories = function () {

        if (categoriesData) {
            // If we've already asked for this data once,
            // return the promise that already exists.
            return categoriesData;
        } else {
            categoriesData = $http.get(serviceBase + 'odata/Categories');
            return categoriesData;
        }
    };

    var _getProducts = function () {

        if (productsData) {
            // If we've already asked for this data once,
            // return the promise that already exists.
            return productsData;
        } else {
            productsData = $http.get(serviceBase + 'odata/Products');
            return productsData;
        }
    };


    var _getOrders = function () {

        if (ordersData) {
            // If we've already asked for this data once,
            // return the promise that already exists.
            return ordersData;
        } else {
            ordersData = $http.get(serviceBase + 'odata/Order_Detail');
            return ordersData;
        }

    };

    var _getSuppliers = function () {
        suppliersData

        if (suppliersData) {
            // If we've already asked for this data once,
            // return the promise that already exists.
            return suppliersData;
        } else {
            suppliersData = $http.get(serviceBase + 'odata/Suppliers');
            //suppliersData = $http.get(serviceBase + 'odata/Products?$expand=Supplier');
            return suppliersData;
        }



    };


    var _saveProducts = function (porduct) {

        productsData = null;
        return $http.post(serviceBase + 'odata/Products', porduct).then(function (response) {
            return response;
        });

    };


    odataServiceFactory.getProducts = _getProducts;
    odataServiceFactory.getOrders = _getOrders;
    odataServiceFactory.getSuppliers = _getSuppliers;
    odataServiceFactory.getCategories = _getCategories;
    odataServiceFactory.saveProducts = _saveProducts;

    return odataServiceFactory;

}]);