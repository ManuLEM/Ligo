'use strict';

app.controller('homeController', function($scope, bankApi){
  bankApi().transactions().all()
  .then(function(data){
    $scope.transactions = data;
  })
  .catch(function(err){
    console.error(err);
  });
  $scope.changePotBalance = function(value) {

  }
});