angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'vAccordion', 'angularMoment', 'ngCordova', 'ui.router', 'uiRouterStyles', 'ui.bootstrap', 'ngAside', 'angular-jwt'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    data: {
      css: 'css/login.css'
    }
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.home', {
    cache: false,
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.schedule', {
    url: '/schedule',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/tab-schedule.html',
        controller: 'ScheduleCtrl'
      }
    }
  })

  .state('tab.task-view', {
    url: '/task-view/:pk/:targetDate',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/include/task-view.html',
        controller: 'TaskViewController'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.help', {
    url: '/help',
    views: {
      'tab-help': {
        templateUrl: 'templates/tab-help.html',
        controller: 'HelpCtrl'
      }
    }
  })

  .state('tab.emergency', {
    url: '/emergency',
    views: {
      'tab-emergency': {
        templateUrl: 'templates/tab-emergency.html',
        controller: 'EmergencyCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/login');

});
