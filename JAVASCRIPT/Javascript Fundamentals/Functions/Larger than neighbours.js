/*Write a function that checks if the element at given position 
in given array of integers is bigger than its two neighbours (when such exist).*/

var array = [],
    loops = 10,
    position,
    i;

array = randomNumbers(loops);
position = Math.random() * loops | 0;

console.log('Initial array is: ' + array.join(', '));
isElementBigger(array, position);

function isElementBigger(array, position) {

    if (position < 1 || position > array.length - 2) {

        return console.log('The element at position ' + position + ' does not have 2 neighbours!!!');
    } else {
        if (array[position] > array[position - 1] && array[position] > array[position + 1]) {

            return console.log('The element at position ' + position + ' -> ('
                + array[position] + ') IS larger than its neighbours');
        } else {
            return console.log('The element at position ' + position + ' -> ('
                + array[position] + ') is NOT larger than its neighbours');
        }
    }
}

function randomNumbers(loops) {

    for (i = 0; i < loops; i += 1) {

        array.push((Math.random() * 20 + 1) | 0);
    }

    return array;
}