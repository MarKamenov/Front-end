/*Write a script that prints all the numbers from  1  to  N , 
that are not divisible by  3  and  7  at the same time*/
var n = prompt('N = '),
        i,
        result = 'Not divisible';

    if (n < 1 || isNaN(n)) {
        result = 'Not correct value!';
    } else {
        for (i = 1; i < parseInt(n) + 1; i++) {
            if ((i % 3 !== 0) && (i % 7 !== 0)) {
                result+=' ' + (i);
            }
        }
    }

    console.log(result);

