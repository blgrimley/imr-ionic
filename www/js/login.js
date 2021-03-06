mainApp.controller('LoginCtrl', function($scope, $aside, $ionicModal, LoginService, $ionicPopup, $state, $window, $http,
  $rootScope, jwtHelper, $location) {
  // Form data for the login modal
  $scope.loading = false;
  $scope.loginData = {};
  $scope.authToken = localStorage.getItem('authToken');
  if ($scope.authToken) {
    $scope.username = jwtHelper.decodeToken($scope.authToken).username;
    $location.path('/tab/home');
  }

  // Perform logout
  $scope.doLogout = function(data, status, headers, config) {
    console.log("Log out!")
    $rootScope.authToken = null;
    $scope.authToken = null;
    $scope.username= null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');

    $scope.$apply()

    var clearKeys = [
      'authToken',
      'username',
      'userProfile',
      'location.favorites',
    ];

    $window.location.href('/#');

  };

  $scope.getUserData = function(username) {
    user_req = {
      url: 'http://iamready.herokuapp.com/users/user/one/',
      method: 'POST',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      },
      data: {username: $scope.username}
    }
    console.log(user_req);
    return $http(user_req)
      .success(function(data) {
        console.log("User data on login", data)
        localStorage.setItem('first_name', data.first_name);
        localStorage.setItem('last_name', data.last_name);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('pk', data.pk);
      })
      .error(function (data) {
        $scope.errData = data
      });

    }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $scope.loading = true;
    $scope.loginError = '';

    // Handle login
    var tokenAuthURL = 'http://iamready.herokuapp.com/api-token-auth/';
    console.log(tokenAuthURL);
    var responsePromise = $http.post(tokenAuthURL,
      {
        'username': $scope.loginData.username,
        'password': $scope.loginData.password
      });

    responsePromise.success(function(data, status, headers, config) {

        // mixpanel.identify($scope.loginData.username);
        console.log(data)
        $rootScope.authToken = data.token;
        $rootScope.username = $scope.loginData.username;

        localStorage.setItem('authToken', $rootScope.authToken);
        localStorage.setItem('username', $rootScope.username);


        //localStorage.setItem('previousSession', 'logging');
        // localStorage.setItem('score'), $rootScope.score;
        $http.defaults.headers.common.Authorization = 'Token ' + $rootScope.authToken;
        $scope.username = localStorage.getItem('username');
        $scope.authToken = localStorage.getItem('authToken');
        $rootScope.username = $scope.username;
        $scope.getUserData($scope.username).then(function(result) {
            $window.location.reload(true);
            $location.path('/tab/home');
        })


    });

    responsePromise.error(function(data, status, headers, config) {
      $scope.loginError = "Unable to log in with the provided username and password.";
    });

  };

  $scope.loginModal = function () {
    $scope.asideInstance = $aside.open({
      placement: 'bottom',
      animation: true,
      size: 'lg',
      templateUrl: 'templates/include/login.html',
      scope: $scope,
    });

    $scope.asideClose = function() {
      $scope.asideInstance.close();
    }
  };

  $ionicModal.fromTemplateUrl('templates/include/forgot.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(modal) {
    $scope.forgot = modal;
  });

  $scope.openModal = function() {
    $scope.forgot.show();
  };

  $scope.closeModal = function() {
    $scope.forgot.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.forgot.remove();
  });
})
