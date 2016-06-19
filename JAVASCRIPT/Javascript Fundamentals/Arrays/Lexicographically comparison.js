/*Write a script that compares two char arrays lexicographically (letter by letter)*/
var arr1 = ['p','e','s','h','o'],
var arr2 = ['g','o','s','h','o'],
	maxIndex = Math.max(arr1.length,arr2.length),
	i;

console.log('arr1 = ' + arr1);
console.log('arr2 = ' + arr2);

for (i = 0; i < maxIndex; i+=1) {
	if (arr1[i] > arr2[i]) {
		console.log('Arr1[' + i + '] > arr2[' + i + ']');}
	if (arr1[i] < arr2[i]) {
		console.log('Arr1[' + i + '] < arr2[' + i + ']');
	}else{
		console.log('Arr1[' + i + '] = arr2[' + i + ']');}
	}