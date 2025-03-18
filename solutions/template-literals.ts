// Create a type Card that matches any string composed of a number followed by a suit (♠️, ♦️, ♣️, ♥️)
// for example "3♠️", "J♦️", "A♣️", "10♥️"

type Color = '♠️' | '♥️' | '♣️' | '♦️';
const colors: Color[] = ['♠️', '♥️', '♣️', '♦️'] as const;

type Card = `${number}${Color}`;

const deck: Card[] = [...range(1, 10), "J", "Q", "K", "A"].flatMap(n => colors.map(color => `${n}${color}` as Card));

console.log(deck);

function range(start: number, end: number, step = 1): number[] {
    const out = []
    for (let i = start; i <= end; i += step) {
        out.push(i);
    }
    return out
}

// bonus: if you want to generate a union type with range function, complicated but doable
type ArrayOfLength<N extends number, T extends any[] = []> = T['length'] extends N ? T : ArrayOfLength<N, [...T, any]>
type Increment<N extends number> = [...ArrayOfLength<N>, any]['length']
type Range<Start extends number, End extends number> = Start extends End ? Start : Start | Range<Increment<Start>, End>;
type CardFigure = Range<1, 10> | "J" | "Q" | "K" | "A";