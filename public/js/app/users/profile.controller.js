(function() {
  'use strict';

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$http", "$scope", "$log"];

  function ProfileController($http, $scope, $log) {
    var vm = this;

    vm.all    = [];
    vm.category;
    vm.submit = submit;
    vm.orders  = [];
    vm.total   = [];

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
        vm.orders.push(item);
        vm.total.push(item.cost);
        // getTotal();
      }
    }



    function getTotal(){
        var total = 0;
        for(var i = 0; i < order.item.length; i++){
            var item = order.item[i];
            total += (order.cost);
            vm.total.push(order.cost);
        }
        return total;
    }



    document.getElementById("category-selection").addEventListener("change", function (evt) {
      document.getElementById('order').value = ''
      vm.item = null
    })

  }

})();


console.log("PROFILE CONTROLLER HERE!");



