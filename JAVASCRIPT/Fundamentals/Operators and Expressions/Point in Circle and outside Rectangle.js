/*Write an expression that checks for given point P(x, y) if it is within the circle K( (1,1), 3) 
and out of the rectangle R(top=1, left=-1, width=6, height=2).*/
function isInOut(x, y) {
	var insideCircle = (x - 1) * (x - 1) + (y - 1) * (y - 1) <= 3 * 3;
	var outsideRectangle = !((x >= -1 && x <= -1 + 6) && (y <= 1 && y >= 1 - 2));
	return insideCircle && outsideRectangle;
}
console.log("Inside circle and outside rec = " + isInOut(x, y)); //enter numbers