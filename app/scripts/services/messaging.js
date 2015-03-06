'use strict';

/**
 * @ngdoc function
 * @name iichatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iichatApp
 */

angular
  .module('iichatApp')
  .service('MessageService', ['$window', function(win) {

    var addListener = function(callback){
      win.addEventListener("message", function (m) {
        if(callback)
        {
          callback(m);
        }
      }, false);
    };



    var postMessage = function(m){
      win.parent.postMessage(m, "*");
    };
    return {postMessage:postMessage,addListener:addListener};
  }]);
