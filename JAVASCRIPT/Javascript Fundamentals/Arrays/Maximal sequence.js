/*Write a script that finds the maximal sequence of equal elements in an array*/
function maxSeq() {
    var elements = [2, 1, 1, 2, 3, 3, 2, 2, 2, 1];
    var count1 = 1;
    var count2 = 0;
    var currentNumber;
    var result = [];
debugger;
    for (var i = 1; i < elements.length; i++) {
        if (elements[i] === elements[i - 1]) {
            count1++;
        } else {
            if (count1 >= count2) {
                count2 = count1;
                currentNumber = elements[i - 1];
            }
            count1 = 1;
        }
    }

    for (var i = 0; i < count2; i++) {
        result[i] = currentNumber;
    }
    console.log('Maximal sequence: ' + result.join(', '));
}
