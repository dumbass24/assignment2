(function () {
    'use strict';
    
    
    var toBuyList = [
        { name: "beers", quantity: 20 },
        { name: "cookies", quantity: 10 },
        { name: "pizzas", quantity: 2 },
        { name: "snacks", quantity: 5 }
    ];
    
    var boughtList = [];
    
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var toBuyCtrl = this;
      toBuyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();
      toBuyCtrl.bought = function (index) {
        ShoppingListCheckOffService.buyItem(index);
      };
    }
    
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var boughtCtrl = this;  
      boughtCtrl.items = ShoppingListCheckOffService.getBougthItems();
      boughtCtrl.buy = function (index){
        ShoppingListCheckOffService.boughtItem(index);
      };
    }
    
    function ShoppingListCheckOffService() {
      var service = this;
      
      // List of shopping items to buy
      var itemsToBuy = toBuyList;
      // List of shopping items bought
      var boughtItems = boughtList;
      
      //Move item to bougth list
      service.buyItem = function (itemIndex) {
        var item =  itemsToBuy[itemIndex];
        service.addBoughtItem(item);
        removeFromItemsToBuy(itemIndex);
      };

      service.boughtItem = function(itemIndex){
        var item = boughtList[itemIndex];
        service.removeBoughtItem(item);
        removeFromItemsToBought(itemIndex);

      };
    
      service.getItemsToBuy = function () {
        return itemsToBuy;
      };
      
      service.getBougthItems = function () {
        return boughtItems;
      };
      
      service.addBoughtItem = function (item) {
        boughtItems.push(item);
      };

      service.removeBoughtItem = function(item){
        itemsToBuy.push(item);
      };

      function removeFromItemsToBought(itemIndex){
        boughtItems.splice(itemIndex, 1);
      };
      
      //private functions
      function removeFromItemsToBuy(itemIndex) {
          itemsToBuy.splice(itemIndex, 1);
      };
    }
    
    })();