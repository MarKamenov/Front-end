//Write an expression that checks if given point P(x, y) is within a circle K({0,0}, 5). //{0,0} is the centre and 5 is the radius
function inOut(x, y) {
	if ( (x * x + y * y) <= 5 * 5) {
		console.log("It's inside the circle");
	}
	else{
		console.log("It's outside the circle")
	}
}
inOut(); //enter numbers