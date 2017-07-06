'use strict';

app.service('bankApi', function($http){
  return function () {
    return {
      accounts: function(){
        return {
          get: function(){},
          post: function(){}
        }
      },
      transactions: function(account_id){
        return {
          get: function(transaction_id){},
          all: function(){
            return $http.get('app/mocks/transactions.json')
            .then(function(response) {
              return response.data.transactions;
            });
          },
          post: function(){}
        }
      },
      pot: function(){
        return {
          get: function(){
            return $http.get('mocks/pot.json').success(function(response) {
              return response;
            });
          }
        }
      }
    }
  }
});