/*Sort 3 real values in descending order.
Use nested if statements.
 var a, b, c; //set numbers//*/
 if (a < b) {
        if (b < c) {
            console.log ( c + ' ' + b + ' ' + a);
        }
        else {
            if (a < c) {
                console.log ( b + ' ' + c + ' ' + a);
            }
            else {
                console.log ( b + ' ' + a + ' ' + c);
            }
        }
    }
    else {
        if (b > c) {
            console.log ( a + ' ' + b + ' ' + c);
        }
        else {
            if (a > c) {
               console.log (a + ' ' + c + ' ' + b);
            }
            else {
                console.log( c + ' ' + a + ' ' + b);
            }
        }
		
	}
    
