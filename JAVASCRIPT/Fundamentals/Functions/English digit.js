/*Write a function that returns the last digit 
of given integer as an English word*/
function getLastDigitAsWord(number){
    switch (number % 10){
        case 0: return 'zero';
		break;
        case 1: return 'one';
		break;
        case 2: return 'two';
		break;
        case 3: return 'three';
		break;
        case 4: return 'four';
		break;
        case 5: return 'five';
		break;
        case 6: return 'six';
		break;
        case 7: return 'seven';
		break;
        case 8: return 'eight';
		break;
        case 9: return 'nine';
		break;
		default: return 'invalid number';
    }
}
getLastDigitAsWord(0);
getLastDigitAsWord(512);
getLastDigitAsWord(1024);
getLastDigitAsWord(12309);
