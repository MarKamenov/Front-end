/*Write a function that counts how many times given number appears in given array.
• Write a test function to check if the function is working correctly.
*/
var num = 2,
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 23, 5 ,2 ,2, 5, 5, 6, 7, 8, 9];

countDigit(num, numbers);

function countDigit(value, numbers){
    value = value || 0;
    numbers = numbers || 0;

    var len = numbers.length,
        i,
        counter = 0;

    for (i = 0; i < len; i+=1){
        if(value === numbers[i]){
            counter+=1;
        }
    }
   console.log(value + ' ' + 'appears'+' (' + counter + ')times' );
}