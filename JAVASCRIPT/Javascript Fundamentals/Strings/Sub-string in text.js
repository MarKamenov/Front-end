/*Write a JavaScript function that finds how many times a substring is contained
 in a given text (perform case insensitive search).
*/
var countSubtext = function (input, sub) {
		var count = 0;
		for (var i = 0; i < input.length - sub.length + 1; i++) {
			if (input.substr(i, sub.length).toLowerCase() === sub.toLowerCase()) {
				i += sub.length;
				count +=1;
			}
		}
		return count;
	};

	var subText = 'in';
	var sampleText = 'We are living in an yellow submarine. We don\'t have anything else.inside the submarine is very tight. So we are drinking all the day. We will move out of it in 5 days.';
	console.log('Appereance of [in] in the sample text: '+countSubtext(sampleText, subText));


