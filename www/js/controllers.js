var mainApp = angular.module('starter.controllers', ['ngMaterial', 'ngCordova', 'ui.bootstrap', 'ngAside'])

.controller('HomeCtrl', function($scope, $http, $interval, $filter) {
  $scope.today = new Date();

  $scope.time = '';
  $scope.timeMorning = false;
  $scope.timeAfternoon = false;
  $scope.timeNight = false;

  $scope.hour = $scope.today.getHours();

  var init = init;
  var monitorhours = monitorhours;
  var resetTimes = resetTimes;

  init();
  monitorhours();

  function init(){
    if ($scope.hour >= 6 && $scope.hour < 12) {
      $scope.timeMorning = true;
      $scope.time="morning";
      console.log('set morning');
    }
    else if ($scope.hour >= 12 && $scope.hour <= 18) {
      $scope.timeAfternoon = true;
      $scope.time="afternoon";
      console.log('set afternoon');
    } else {
      $scope.timeNight = true;
      $scope.time="night";
      console.log('set night');
    }
  }

  function monitorhours(){
    $interval(function (){
      var newHour = new Date().getHours();
      if(newHour != $scope.hour){
        $scope.hour = newHour;
        resetTimes();
        init();
      }
    }, 5000);
  }

  function resetTimes(){
    $scope.timeMorning = false;
    $scope.timeAfternoon = false;
    $scope.timeNight = false;
  }

  $scope.monthNames = {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }

  $scope.days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday']

    if ($scope.targetDate == $scope.currentDate ) {
      $scope.yesToday = true;
    }

  if (!$scope.targetDate) {
    $scope.today = new Date();
    $scope.target = $scope.today
    $scope.tomorrow = new Date();
    $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
    console.log("Getting target date first")
    var m = $scope.today.getMonth() + 1;
    $scope.targetDate = $scope.today.getFullYear() + '-' + m + '-' + $scope.today.getDate();
    $scope.targetDay = $scope.today.getDate();
    $scope.targetMonth = $scope.monthNames[m.toString()];
    $scope.targetYear = $scope.today.getFullYear();

    var req = {
      url: 'https://iamready.herokuapp.com/events/all/day/',
      data: {
        user_pk: 1,
        date: $scope.targetDate
      },
      method: 'POST'
    }

    $http(req).success(function(data){
      $scope.events = data;
    })

    var wreq = {
      url: 'http://iamready.herokuapp.com/events/all/week/',
      data: {
        user_pk: 1,
        date: $scope.targetDate
      },
      method: "POST"
    }

    console.log(wreq)

    $http(wreq).success(function(data) {
      $scope.week = data;
    })
  } else {
    var req = {
      url: 'https://iamready.herokuapp.com/events/all/day/',
      data: {
        user_pk: 1,
        date: $scope.targetDate
      },
      method: 'POST'
    }

    $http(req).success(function(data){
      $scope.events = data;
    })

    var wreq = {
      url: 'http://iamready.herokuapp.com/events/all/week/',
      data: {
        user_pk: 1,
        date: $scope.targetDate
      },
      method: "POST"
    }

    console.log(wreq)

    $http(wreq).success(function(data) {
      $scope.week = data;
    })
  }

  $scope.changeDate = function(n) {
    console.log("Calling change Date")
    $scope.events = {};
    // Get vals for current date
    $scope.currentDate = $filter('date')(new Date(), 'yyyy-M-d');

    var v = $scope.targetDate.split('-');
    var d = parseInt(v[2]) + n;
    $scope.targetDate = v[0] + "-" + v[1] + "-" + d;
    $scope.targetDay = d.toString();
    $scope.targetMonth = $scope.monthNames[v[1]];

    if ($scope.targetDate == $scope.currentDate ) {
      $scope.yesToday = true;
    } else {
      $scope.yesToday = false;
    }

    console.log($scope.targetDate)
    console.log($scope.targetDay)
    var req = {
      url: 'https://iamready.herokuapp.com/events/all/day/',
      data: {
        user_pk: 1,
        date: $scope.targetDate
      },
      method: 'POST'
    }

    $http(req).success(function(data){
      $scope.events = data;
    })

  }
})

.controller('TimeCtrl', function($scope, $http){
  var h = new Date().getHours();
  if (h >= 6 && h < 12) {
    $scope.time="morning"
    $scope.timeBox="morningBox"
    $scope.timeHeader="morningHeader";
  }
  else if (h >= 12 && h <= 18) {
    $scope.time="afternoon";
    $scope.timeBox="afternoonBox";
    $scope.timeHeader="afternoonHeader";
  } else {
    $scope.time="night";
    $scope.timeBox="nightBox";
    $scope.timeHeader="nightHeader";
  }
  console.log(h);
  console.log($scope.time);

  var req = {
        url: "http://iamready.herokuapp.com/events/task/next/",
        data: {
            pk: 1,
        },
        method: "POST"
    }

    $http(req).success(function(data) {
        $scope.event = data
    })
})

.controller('ScheduleCtrl', function($scope) {
  $scope.getTod = true;
  $scope.getTomo = false;
  $scope.showWk = false;
  $scope.showToday = true;

  $scope.currentWeek = true;
  $scope.nextWeek = false;
})

.controller('ProfileCtrl', function($scope, $http) {
  var req = {
    url: 'https://iamready.herokuapp.com/users/user/one/',
    data: {
      pk: 1
    },
    method: 'POST'
  }

  $http(req).success(function(data){
    $scope.user = data
  })


})

.controller('HelpCtrl', function($scope, $cordovaMedia, $ionicLoading, $http) {

  var req = {
    url: 'https://iamready.herokuapp.com/users/user/one/',
    data: {
      pk: 1
    },
    method: 'POST'
  }

  $http(req).success(function(data){
    $scope.user = data
  })

  // TTS For Help Words.
  $scope.sayPhrase = function (index) {
    var tts_req = {
      url: 'https://iamready.herokuapp.com/users/user/one/',
      data: {
        pk: 1
      },
      method: 'POST'
    }

    $http(tts_req).success(function(data){
      $scope.user = data
      var tts = $scope.user.phrases[index].text;
      $scope.speakText(tts);
    })
  }

    $scope.speakText = function(text) {
      TTS.speak({
        text: text,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }
})

.controller('EmergencyCtrl', function($scope, $http){
  var req = {
    url: 'https://iamready.herokuapp.com/users/user/one/',
    data: {
      pk: 1
    },
    method: 'POST'
  }

  $http(req).success(function(data){
    $scope.user = data
  })
})

.controller('PanelController', function ($scope, $ionicPopover, taskService) {
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

.controller('TaskViewController', function ($scope, $ionicPopover, $ionicHistory, taskService, $http, $stateParams, $ionicModal) {
  this.tab = 1;
  $scope.done = false;

  $ionicModal.fromTemplateUrl('templates/include/task_help.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(modal) {
    $scope.modalGetHelpWithTask = modal;
  });

  $scope.openModal = function() {
    $scope.modalGetHelpWithTask.show();
  };

  $scope.closeModal = function() {
    $scope.modalGetHelpWithTask.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalGetHelpWithTask.remove();
  });


  this.selectTab = function(setTab) {
    this.tab = setTab;
  };

  this.isSelected = function (checkTab) {
    return this.tab === checkTab;
  }

  $scope.stepNum = 0;

  var req = {
    url: 'http://iamready.herokuapp.com/events/task/one/',
    data: {
      pk: $stateParams.pk,
    },
    method: "POST"
  }

  console.log(req)

  $http(req).success(function(data){
    $scope.task = data;
    $scope.maxStepNum = $scope.task.steps.length - 1;
  })

  $scope.$on('my-accordion:onReady', function () {
    var firstPane = $scope.panes[0];
    $scope.accordion.toggle(firstPane.id);
  });

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };

  //Fixed for All Steps
  $scope.doneStep = function (pk, stepNum) {
    var sreq = {
      url: "http://iamready.herokuapp.com/events/step/update/",
      data: {
        task_pk: $scope.task.pk,
        step_pk: pk
      },
      method: "POST"
    }

    $http(sreq).success(function(data){
      $scope.task.steps[stepNum].status = "done";
    })
  };


  $scope.undoStep = function (pk, stepNum) {
    var ureq = {
      url: "http://iamready.herokuapp.com/events/step/update/",
      data: {
        task_pk: $scope.task.pk,
        step_pk: pk
      },
      method: "POST"
    }

    $http(ureq).success(function(data){
      $scope.task.steps[stepNum].status = "not_started";
    })
  };

  //TTS For Single Steps.
  $scope.saySingle = function (index) {
    var tts_req = {
      url: 'http://iamready.herokuapp.com/events/task/one/',
      data: {
        pk: $stateParams.pk,
      },
      method: "POST"
    }

    $http(tts_req).success(function(data){
      $scope.task = data;
      var tts = $scope.task.steps[index].title;
      $scope.speakText(tts);
    })

    $scope.speakText = function(text) {
      TTS.speak({
        text: text,
        locale: 'en-US',
        rate: 1.5
      }, function () {
        console.log("SPEAK!!!");
      });
    }
  }

  // TTS For All Steps.
  $scope.sayAll = function (index) {
    console.log(index);
    var tts_req = {
      url: 'http://iamready.herokuapp.com/events/task/one/',
      data: {
        pk: $stateParams.pk,
      },
      method: "POST"
    }

    console.log(tts_req);

    $http(tts_req).success(function(data){
      $scope.task = data;
      var tts = $scope.task.steps[index].title;
      $scope.speakText(tts);
    })
  }

  $scope.speakText = function(text) {
    console.log("Yes");
    TTS.speak({
      text: text,
      locale: 'en-US',
      rate: 1.5
    }, function () {
      console.log("SPEAK!!!");
    });
  }
});
