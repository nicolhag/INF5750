var app = angular.module('CommodityOrder', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeController',
      templateUrl: 'views/home.html'
    })
  	.when('/single/', {
    	controller: 'HomeController',
    	templateUrl: 'views/single.html'
  	})
  	.when('/bulk/', {
    	controller: 'HomeController',
    	templateUrl: 'views/bulk.html'
  	})
    .otherwise({
      redirectTo: '/'
    });
});
