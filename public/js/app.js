// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var collabmedi = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ui.router', 'ngCookies', 'ui.bootstrap', 'angular.filter', 'angucomplete-alt'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $stateProvider

      // setup an abstract state for the tabs directive
        .state('login', {
          url: '/login',
          templateUrl: 'login.html',
          controller: "MainController"
        })
        .state('registration', {
          url: '/registration',
          templateUrl: 'registration.html',
          controller: "MainController"
        })
        .state('home', {
            url: '/home',
            templateUrl: 'newsfeed.html',
            controller: "MainController"
        })
        .state('timeline', {
            url: '/timeline',
            templateUrl: 'timeline.html',
            controller: "MainController"
        })
        .state('userprofile', {
            url: '/profile',
            templateUrl: 'profile.html',
            controller: "MainController"
        })
        .state('connections', {
            url: '/connections',
            templateUrl: 'users.html',
            controller: "MainController"
        })
        .state('messages', {
            url: '/messages',
            templateUrl: 'messages.html',
            controller: "MainController"
        })
        .state('groups', {
            url: '/groups',
            templateUrl: 'groups.html',
            controller: "MainController"
        })
        .state('groupprofile', {
            url: '/groupprofile',
            templateUrl: 'groupprofile.html',
            controller: "MainController"
        })
        .state('blogs', {
            url: '/blogs',
            templateUrl: 'blogs.html',
            controller: "MainController"
        })
        .state('blogprofile', {
            url: '/blogprofile',
            templateUrl: 'blogprofile.html',
            controller: "MainController"
        })
        .state('recommenddoc', {
            url: '/recommenddoc',
            templateUrl: 'doctorrecommendations.html',
            controller: "MainController"
        })
        .state('recommendpharma', {
            url: '/recommendpharma',
            templateUrl: 'pharmarecommendations.html',
            controller: "MainController"
        });

    $urlRouterProvider.otherwise('/login');
    // if none of the above states are matched, use this as the fallback
  });
