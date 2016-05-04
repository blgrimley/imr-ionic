angular.module('starter.controllers', ['ngMaterial'])

.controller('HomeCtrl', function($scope) {
  $scope.today = new Date();
})

.controller('TimeCtrl', function($scope){
  var h = new Date().getHours();
  if (h >= 6 && h < 12) {
    $scope.time="morning"
  }
  else if (h >= 12 && h <= 18) {
    $scope.time="afternoon";
  } else {
    $scope.time="night";
  }
  console.log(h);
  console.log($scope.time);
})

.controller('ScheduleCtrl', function($scope) {

})

.controller('ProfileCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('HelpCtrl', function(){

})

.controller('EmergencyCtrl', function(){

})

.controller('PanelController', function($scope, $ionicPopover){
  this.tab = 1;
  this.selectTab = function(setTab) {
    this.tab = setTab;
  };
  this.isSelected = function(checkTab) {
    return this.tab === checkTab;
  }

  $scope.$on('my-accordion:onReady', function () {
    var firstPane = $scope.panes[0];
    $scope.accordion.toggle(firstPane.id);
  });
})


.controller('TaskViewController', function($scope, $ionicPopover, $ionicHistory){
  this.tab = 1;
  this.selectTab = function(setTab) {
    this.tab = setTab;
  };
  this.isSelected = function(checkTab) {
    return this.tab === checkTab;
  }

  $scope.$on('my-accordion:onReady', function () {
    var firstPane = $scope.panes[0];
    $scope.accordion.toggle(firstPane.id);
  });
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
});
