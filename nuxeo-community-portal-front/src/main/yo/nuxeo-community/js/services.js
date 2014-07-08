'use strict';

/* Services */

var appService = angular.module('appService', ['ngResource']);

appService.factory('User', ['$resource',
  function($resource){
    return $resource('users/:username.json', {}, {
      query: {method:'GET', params:{username:'users'}, isArray:true}
    });
  }]);
