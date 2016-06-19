/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	
*/
function sum(num) {
	
    if (num === undefined) {
        throw 'Error! Cannot be undefined!';
    } else if (!num.length) {
        return null;
    } else {
        if  (!num.every(function(item) {
                return !isNaN(item);
            }))   {
                        throw 'Error! All array elements must be convertible to numbers.';
                    }
    }
     return num.reduce(function(result, item) {
        return result += item * 1;
    }, 0);
}

module.exports = sum;