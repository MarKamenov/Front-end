var controllerHelpers = function(){

	 function groupByCategory(item) {
    return item.category;
  }

  function parseGroups(items, category) {
    return {
      category,
      items
    };
  }

  function filterByCategory(category) {
    return function(group) {
      return group.category.toLowerCase() === category.toLowerCase();
    };
  }
	function fixDate(item){
    var newItem = Object.create(item);
    newItem.date = moment(item.date).format(' hh:mm'); 
    newItem.timeRemaining = moment(item.date).fromNow();
    return newItem;
  }
	return {
    groupByCategory,
     parseGroups, 
    filterByCategory, 
    fixDate
  };

}();