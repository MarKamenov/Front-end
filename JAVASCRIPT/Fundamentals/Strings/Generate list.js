/*Write a function that creates a HTML <ul> using a template for every HTML <li>.
The source of the list should be an array of elements.
Replace all placeholders marked with –{…}– with the value
 of the corresponding property of the object.*/
 
var people = [{name: 'Peter', age: 14}],
    template = '<strong>-{name}-</strong> <span>-{age}-</span>';

function generateList(people, template) {
    var result = '';
    
    result += '<ul>';

    for (var i = 0; i < people.length; i += 1) {
        result += '<li>';

        var currentListItem = template.replace('-{name}-', people[i].name);
        currentListItem = currentListItem.replace('-{age}-', people[i].age);

        result += currentListItem;
        result += '</li>';
    }
    result += '</ul>';
    return result;
}

console.log(generateList(people, template));
