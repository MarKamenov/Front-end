/*Write a function that calculates the average age of all females,
 extracted from an array of persons
 ◦ Use Array#filter
◦ Use only array methods and no regular loops (for, while)
*/
function Person(fname, lname, age, gender) {
	this.firstName = fname;
	this.lastName = lname;
	this.age = age;
	this.gender = !gender ? 'male' : 'female';
}

function averageAgefemale(arr) {
	 return arr.filter(function(item) {
        return item.gender;
    })
	.reduce(function(sum, item, i, arr) {
        var count = arr.length;
        return (sum + item.age / count);
    }, 0);
}

var arr = [
	new Person('Doncho', 'Minkov', 25, false),
	new Person('Nikolay', 'Kostov', 24, false),
	new Person('Ivaylo', 'Kenov', 26, false),
	new Person('Pavel', 'Kolev', 25, false),
	new Person('Teodor', 'Kurtev', 23, false),
	new Person('Blagovest', 'Chavdarov', 125, false),
	new Person('Anna', 'Ivanova', 16, true),
	new Person('Iliana', 'Simeonova', 45, true),
	new Person('Svetlana', 'Dragoeva', 18, true),
	new Person('Elica', 'Stoyanova', 13, true)
];

console.log(averageAgefemale(arr));