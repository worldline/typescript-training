// Create a type Card that matches any string composed of a number followed by a suit (♠️, ♦️, ♣️, ♥️)
// for example "3♠️", "J♦️", "A♣️", "10♥️"

const colors = ['♠️', '♥️', '♣️', '♦️'];
const deck = [...range(1, 10), "J", "Q", "K", "A"].flatMap(n => colors.map(color => `${n}${color}`));

console.log(deck);

function range(start, end, step) {
    const out = []
    for (let i = start; i <= end; i += step) {
        out.push(i);
    }
    return out
}