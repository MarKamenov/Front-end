/*Write a script that finds the greatest of given 5 variables.
Use nested if statements.*/

 var a = prompt("a = "),
        b = prompt("b = "),
        c = prompt("c = "),
        d = prompt("d = "),
        e = prompt("e = "),
        result;

    if ((a >= b) && (a >= c) && (a >= d) && (a >= e)) {
        result = a;
    } else if ((b >= a) && (b >= c) && (b >= d) && (b >= e)) {
        result = b;
    } else if ((c >= a) && (c >= b) && (c >= d) && (c >= e)) {
        result = c;
    } else if ((d >= a) && (d >= b) && (d >= c) && (d >= e)) {
        result = d;
    } else {
        result = e;
    }

    console.log('result = ' + result);
