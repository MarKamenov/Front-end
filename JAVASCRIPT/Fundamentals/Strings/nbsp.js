function replaceNbsps(text) {

    for (var i = 0; i < text.length; i++) {
        text = text.replace(' ', '&nbsp');
    }
    return text;
}
console.log(replaceNbsps(text));
