/*Write a function that returns the index of the first element in array that is larger than its neighbours or  -1 , if there’s no such element.*/

var array = [],
    loops = 10,
    position,
    i;

array = randomNumbers(loops);
position = Math.random() * loops | 0;

console.log('Initial array is: ' + array.join(', '));
position = firstPosition(array);
console.log('The index of the first element that is larger than its neighbours is ' + position);

function firstPosition(array) {

    var loops = array.length;

    for (i = 1; i < loops - 1; i+=1) {

        if (array[i] > array[i - 1] && array[i] > array[i + 1]) {

            return i;            
        }
    }

    return -1;
}

function randomNumbers(loops) {

    for (i = 0; i < loops; i += 1) {

        array.push((Math.random() * 10 + 1) | 0);
    }

    return array;
}