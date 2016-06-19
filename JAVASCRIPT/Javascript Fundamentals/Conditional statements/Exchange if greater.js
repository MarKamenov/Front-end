/*Write an if statement that takes two double variables a and b and exchanges 
their values if the first one is greater than the second.
As a result print the values a and b, separated by a space.*/
var a = 5, 
      b = 2,
	  chng;
if (a > b) {
	        chng = a;
            a = b;
            b = chng;
        console.log (a + ' ' + b);
    }else{
    console.log(a + ' ' + b);
};
