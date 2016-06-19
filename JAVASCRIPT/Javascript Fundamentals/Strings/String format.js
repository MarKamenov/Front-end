/*Write a function that formats a string using placeholders.
The function should work with up to 30 placeholders and all types.*/

function appendHolders (input, arr) {
		for (var i = arr.length - 1; i >= 0; i-=1) {
			while (input.indexOf('{'+i+'}') !== -1)
			{
				input = input.replace('{'+i+'}', arr[i]);
			}
		}
		return input;
	}
	var placeholders = [1, 'gosho', 'pesho'];
	var textHolders = 'ala {0} bala {1} nica {2} ala {0}';
	console.log('Original text : '+textHolders);
	console.log('Replaced placehodlers: '+appendHolders(textHolders, placeholders));
