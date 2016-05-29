/*Write a function for extracting all email addresses from given text.
All sub-strings that match the format @… should be recognized as emails.
Return the emails as array of strings.*/

var text = 'sdabhikagathara@rediffmail.com, "assdsdf" <dsfassdfhsdfarkal@gmail.com>, "rodnsdfald ferdfnson" 	   <rfernsdfson@gmal.com>, ' +
    '"Affdmdol Gondfgale" <gyfanamosl@gmail.com>, "truform techno" <pidfpinfg@truformdftechnoproducts.com>, "NiTsdfeSh ThIdfsKaRe" ' +
    '<nthfsskare@ysahoo.in>, "akasdfsh kasdfstla" <akashkatsdfsa@yahsdfsfoo.in>, "Bisdsdfamal Prakaasdsh" <bimsdaalprakash@live.com>,; ' +
    '"milisdfsfnd ansdfasdfnsftwar" <dfdmilifsd.ensfdfcogndfdfatia@gmail.com>';

function extractEmails(text) {
    var i,
        len,
        arr = text.split(' '),
        possibleEmails = [],
        validEmails = [];
    for (i = 0, len = arr.length; i < len; i += 1) {
        if ((arr[i].indexOf('@') > 0) &&
            (arr[i].indexOf('@') < (arr[i].length - 1)) &&
            (arr[i].indexOf('@')) == arr[i].lastIndexOf('@')) {
            possibleEmails.push(arr[i]);
        }
    }
    for (i = 0, len = possibleEmails.length; i < len; i += 1) {
        if ((possibleEmails[i].indexOf('.', possibleEmails[i].indexOf('@')) >
                (possibleEmails[i].indexOf('@') + 1)) &&
            (possibleEmails[i].lastIndexOf('.') <
                (possibleEmails[i].length - 1))) {
            validEmails.push(possibleEmails[i]);
        }
    }
    return [possibleEmails.join(' '), validEmails.join(' ')];
}