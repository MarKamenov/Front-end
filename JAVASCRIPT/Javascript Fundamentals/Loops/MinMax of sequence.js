/*Write a script that finds the  max  and  min 
 number from a sequence of numbers.*/
var numSeq = [-100, 0, -1, -10, 343, 88, 4, 9,15, 150, 7, 45, 57, 101],
	max = Number.MAX_VALUE * -1,
	min = Number.MAX_VALUE,
	i;

for (i in numSeq) {
	if (max < numSeq[i]) {
		max = numSeq[i];
		}
	if (min > numSeq[i]) {
		min = numSeq[i];
		}
}

console.log('MAX: ' + max);
console.log('MIN: ' + min);