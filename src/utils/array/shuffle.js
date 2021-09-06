
/**
 * source http://sedition.com/perl/javascript-fy.html
 * Fisher-Yates (aka Knuth) Shuffle
 * @param array
 * @returns {*}
 */
const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


export default shuffle;