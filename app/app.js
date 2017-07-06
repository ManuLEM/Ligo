var app = angular.module("app", ['ngRoute']);
app.constant('Config', {
  "dataFolder": "assets"
});

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: './app/templates/index.html'
  }).
  when('/data', {
    templateUrl: './app/templates/data.html',
    controller: 'homeController'
  }).
  when('/lending1', {
    templateUrl: './app/templates/lending1.html'
  }).
  when('/lending2', {
    templateUrl: './app/templates/lending2.html',
    controller: 'homeController'
  }).
  when('/pay', {
    templateUrl: './app/templates/pay.html',
    controller: 'homeController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
