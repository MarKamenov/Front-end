/*Write a script that converts a number in the range [0…999] to words,
 corresponding to its English pronunciation.*/
 
var number = prompt('Enter number') | 0,
	digitOnes,
	digitTens,
	digitHundreds,
	textOnes,
	textTens,
	textHundreds;

if (number < 0 || number > 999) {
	console.log('Out of range!');
} else {

	digitOnes = number % 10;
	digitTens = ((number % 100) / 10) | 0;
	digitHundreds = ((number % 1000) / 100) | 0;

	textOnes = onesOrHundreds2text(digitOnes);
	textHundreds = onesOrHundreds2text(digitHundreds);
	textTens = tens2text(digitTens);

	if (digitTens === 1) {
		textTens = '';
		textOnes = teens2text(digitOnes);
	} else if (digitTens === 0) {
		textTens = '';
		if (digitOnes === 0 && digitHundreds !== 0) {
			textOnes = '';
		}
	} else if (digitOnes===0) {
		textOnes = '';
	}
	else {
		textTens += ' ';
	}

	if (digitHundreds !== 0) {
		if (digitTens !== 0 || digitOnes !== 0) {
			textHundreds += ' hundred and ';
		} else if (digitTens === 0 && digitOnes === 0) {
			textHundreds += ' hundred';
		}
	} else {
		textHundreds = '';
	}

	console.log(textHundreds + textTens + textOnes);
}

function onesOrHundreds2text(onesOrHundreds) {
	switch (onesOrHundreds) {
		case 0:
			return 'zero';
		case 1:
			return 'one';
		case 2:
			return 'two';
		case 3:
			return 'three';
		case 4:
			return 'four';
		case 5:
			return 'five';
		case 6:
			return 'six';
		case 7:
			return 'seven';
		case 8:
			return 'eight';
		case 9:
			return 'nine';
	}
}

function tens2text(tens) {
	switch (tens) {
		case 1:
			return 'ten';
		case 2:
			return 'twenty';
		case 3:
			return 'thirty';
		case 4:
			return 'fourty';
		case 5:
			return 'fifthy';
		case 6:
			return 'sixty';
		case 7:
			return 'seventy';
		case 8:
			return 'eighty';
		case 9:
			return 'ninety';
		default:
			return '';
	}
}

function teens2text(teens) {
	switch (teens) {
		case 0:
			return 'ten';
		case 1:
			return 'eleven';
		case 2:
			return 'twelve';
		case 3:
			return 'thirteen';
		case 4:
			return 'fourteen';
		case 5:
			return 'fifteen';
		case 6:
			return 'sixteen';
		case 7:
			return 'seventeen';
		case 8:
			return 'eighteen';
		case 9:
			return 'nineteen';
	}
}
