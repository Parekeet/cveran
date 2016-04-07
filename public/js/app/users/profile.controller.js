(function() {
  'use strict';

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$http", "$scope"];

  function ProfileController($http, $scope) {
    var vm = this;

    vm.all = [];
    vm.category;
    vm.submit = submit;
    vm.order = [];

    selectFood();

    function selectFood() {
      $http
        .get('/api/profile')
        .then(function(data) {
          vm.all = data.data;
          vm.categories = []
          vm.all.forEach(function (item) {
            if (vm.categories.indexOf(item.category) < 0) {
              vm.categories.push(item.category);
            }
          })
          console.log(data);
        }, function(err) {
          console.log(err);
        });
    }

    function submit(item) {
      //push stuff to an array
      if (item) {
        console.log(item);
        vm.order.push(item);
      }
    }



    document.getElementById("category-selection").addEventListener("change", function (evt) {
      document.getElementById('order').value = ''
      vm.item = null
    })

  }

})();


console.log("PROFILE CONTROLLER HERE!");



// (function() {
//   "use strict";

//   angular
//     .module('app')
//     .controller('ProfileController', ProfileController);

//   ProfileController.$inject = ["$log", "authService", "userService", "$state"];

//   function ProfileController($log, authService, userService, $state) {
//     var vm = this;

//     vm.formData = {
//       email: authService.currentUser().email, // This just copies the
//       name:  authService.currentUser().name   // string values, instead
//     };                                        // of binding some object.
//     vm.authService  = authService;
//     vm.submitUpdate = submitUpdate;

//     function submitUpdate() {
//       userService
//         .update(vm.formData)
//         .then(function(res) {
//           // Clear the password fields in the view (if they were used).
//           vm.formData.password = '';
//           vm.formData.passwordConfirmation = '';
//         })
//         .then(function() {
//           return authService.refreshToken();
//         })
//         .then(
//           function(newDecodedToken) {
//             $log.debug('User updated and token refreshed:', newDecodedToken);
//           })
//         .catch(function(err) { $log.debug('Error:', err); });
//     }

//     $log.debug('ProfileController loaded!');
//   }

// })();
