'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        hideMenu : true,
        userName: "",
        firstName: "",
        lastName: "",
        email:""
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var _saveRegistration = function (registration) {

       // _logOut();

        return $http.post(serviceBase + 'api/accounts/create', registration).then(function (response) {
            return response;
        });

    };

    var _getToken = function () {

      
        var authData = localStorageService.get('authorizationData');

        if (authData) {
            _authentication.isAuth = true;
            _authentication.hideMenu = false;
            _authentication.userName = authData.userName;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
            _authentication.firstName = authData.firstName;
            _authentication.lastName = authData.lastName;
            _authentication.email = authData.email;
            _authentication.token = authData.token;
        }

        return _authentication;
    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        if (loginData.useRefreshTokens) {
            data = data + "&client_id=" + ngAuthSettings.clientId;
        }

        var deferred = $q.defer();

        $http.post(serviceBase + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            if (loginData.useRefreshTokens) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true, firstName: response.firstname, lastName: response.lastname, email: response.email });
            }
            else {
                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false, firstName : response.firstname, lastName : response.lastname , email : response.email });
            }
            _authentication.isAuth = true;
            _authentication.hideMenu = false;
            _authentication.userName = loginData.userName;
            _authentication.useRefreshTokens = loginData.useRefreshTokens;
            _authentication.firstName = response.firstname;
            _authentication.lastName = response.lastname;
            _authentication.email = response.email;

            deferred.resolve(response);

        }).error(function (response) {
            //_logOut();
            deferred.reject(response);
        });

        return deferred.promise;

    };

    var _logOut = function () {
        
        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
        }

    };

  
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _getToken;

    return authServiceFactory;
}]);