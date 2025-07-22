# Manipuler les types

En TypeScript, vous pouvez manipuler les types de plusieurs façons. Vous pouvez créer de nouveaux types à partir de types existants, combiner des types, et même créer des types qui dépendent d'autres types.

## Mot-clé `type` et alias de types

Vous pouvez déclarer un type en utilisant le mot-clé `type`. Cela s'appelle un **alias de type**. Vous pouvez utiliser les alias de types pour donner un nom à un type, ce qui peut être utile quand vous devez utiliser le même type à plusieurs endroits. Pensez-y comme une déclaration de variable pour les types.

```typescript
type Age = number;
let age: Age = 30;

type Person = { name: string; age: Age };
let person: Person = { name: "Alice", age: 30 };
```

## Union et intersection de types

Vous pouvez combiner des types en utilisant les opérateurs `|` et `&`. L'opérateur `|` crée une **union de types**, ce qui signifie qu'une variable peut contenir une valeur de l'un ou l'autre type. L'opérateur `&` crée un **type intersection**, ce qui signifie qu'une variable doit contenir une valeur qui satisfait les deux types.

```typescript
// Type union
type streetNumber = string | number;
let street: streetNumber = "926B";

// Type union avec des littéraux
type Direction = "left" | "right" | "up" | "down" | number;
let up: Direction = "up";
let diagonal: Direction = 45;

// Type intersection
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged & { alive: true }; // = { name: string, age: number, alive: true }
let alice: Person = { name: "Alice", age: 30, alive: true };
```

## Réduction intelligente des types

TypeScript a un système d'inférence de type assez puissant qui peut affiner le type d'une valeur en fonction des conditions et tests qu'elle passe. Cela s'appelle la **réduction de type**.

Par exemple, TypeScript peut inférer le type d'une valeur en fonction du type d'une propriété :

```typescript
type Person = { name?: string; age: number };
let data: Person | undefined = persons.find((p) => p.name === "Alice");
if (data !== undefined) {
  // data a été réduit au type Person
  if(data.name !== undefined) {
    // data.name a été réduit au type string    
    console.log(data.name.toUpperCase());
  }
}
```

## Assertions de type

Parfois, vous en savez plus sur le type d'une valeur que TypeScript. Cela peut arriver quand la valeur provient d'une source externe, comme une saisie utilisateur ou une bibliothèque tierce, que vous faites confiance pour vous envoyer une valeur du bon type. Ou cela peut être une limitation de l'inférence de type de TypeScript, qui est plutôt bonne mais pas encore parfaite.

Dans de tels cas, vous pouvez utiliser une **assertion de type** pour dire à TypeScript le type d'une valeur, en utilisant le mot-clé `as`.

```typescript
let data = JSON.parse('{"name": "Alice", "age": 30}') as Person;
let age = document.querySelector("input#age").value as number;
```

::: warning

Cela force TypeScript à traiter la valeur comme étant du type spécifié, même si ce n'est pas le cas réellement. Donc cela peut être une source de bugs si vous faites une erreur. Utilisez une assertion de type seulement quand il n'y a pas d'autre moyen de dire à TypeScript le type d'une valeur.

:::

## Prédicats de type

Les assertions de type sont un moyen d'indiquer directement à TypeScript le type d'une valeur. Mais que se passe-t-il si le type de la valeur peut être déduit par une fonction exécutée au moment de l'exécution par exemple ? Vous pouvez utiliser un **prédicat de type** pour cela.

Un prédicat de type est une fonction qui vérifie le type d'une valeur et retourne un booléen. Si la fonction retourne `true`, TypeScript réduira le type de la valeur à l'intérieur du bloc où le prédicat est appelé.

```typescript
type Person = { name: string; age: number };

function isPerson(value: { [key: string]: any }): value is Person {
  return typeof value.name === "string" && typeof value.age === "number";
}

let data = JSON.parse('{"name": "Alice", "age": 30}');
if (isPerson(data)) {
  // peut appeler toUpperCase() car data a été réduit au type Person
  console.log(data.name.toUpperCase());
}
```

## Mot-clé `keyof`

Vous pouvez utiliser le mot-clé `keyof` pour faire référence aux clés d'un type d'objet. Cela peut être utile quand vous voulez créer un type qui est un sous-ensemble des clés d'un autre type.

```typescript
type Person = { name: string; eyes: Color; mustache: boolean };
type PersonFeature = keyof Person; // = 'name' | 'eyes' | 'mustache'
```

## Mot-clé `typeof`

Vous connaissez peut-être déjà l'opérateur JavaScript `typeof` qui retourne le type d'une valeur :

```javascript
typeof 42 === "number";
typeof "Alice" === "string";
```

En TypeScript, vous pouvez utiliser le mot-clé `typeof` dans le contexte d'une annotation de type pour faire référence au type d'une variable ou d'une propriété.

```typescript
let age = 30;
let ageType: typeof age; // = number
```

En soi, ce n'est pas très utile, mais cela peut être utilisé en combinaison avec d'autres fonctionnalités pour créer des types avancés :

```typescript
let person = { name: "Alice", eyes: "blue", mustache: false } as const;

type PersonFeature = keyof typeof person; // = 'name' | 'eyes' | 'mustache'
```

## Types par index

Vous pouvez utiliser l'opérateur `[]` pour accéder au type d'une propriété d'un autre type.

```typescript
type Person = { name: string; age: number };
type Age = Person["age"]; // = number
type PersonField = Person[keyof Person]; // même chose que Person[string | number]
```

## Types conditionnels

Vous pouvez créer un type qui dépend d'un autre type en utilisant des **types conditionnels**. Un type conditionnel est un type qui est défini en utilisant un opérateur ternaire.

```typescript
type Person = { name: string; job: string };
type Animal = { name: string; legs: number };

let alice: Person = { name: "Alice", job: "developer" };

type AlicePronoun = typeof alice extends Person ? "she" | "he" : "it";
type FelixPronoun = typeof felix extends Animal ? "it" : "he" | "she";
```

Notez l'utilisation du mot-clé `extends`. Il est utilisé pour vérifier si un type étend un autre type, c'est-à-dire s'il serait valide s'il était donné ce type comme annotation.

Cela peut être combiné avec les génériques pour créer des types puissants :

```typescript
type Pronoun<T> = T extends Person ? "she" | "he" : "it";
```

Plus d'informations à ce sujet dans le chapitre suivant : [Génériques](./generiques.md).

## Checkpoint

Glissez les blocs de texte dans les [emplacements correspondants](https://ladigitale.dev/digiquiz/q/686530b6978df)

## Exercice

Suivez les instructions dans [l'éditeur en ligne TypeScript](https://www.typescriptlang.org/play/?ssl=23&ssc=8&pln=23&pc=10#code/PTAEE0HsFcHICcCmoC2BDAdmg5gSw9qGqAEaSQDWoAzgC6RI0CediKAdAFCfABUnARnagAYrnh0ANKADGSNLWTVIKZCTTVcM0LSYAHRNQBcnALRFQAQWi0AFgx37kaADa4NoJHqTVEGWviEmEQ29vCgAO64dqAAZuJ0AHJoqkQYACagLhq0yanekAbwAYagABRkMXTwgdQAlFzmxAAKNTLIugZEbh5ePn4BBBbeWojSEbZatrLBJMiI0baI4cQY0Chz4WUAqgDKACJ1oA7E1YHliOzY7NIARLsGMu4uoADysbHLtw2cvMDc3D4nAATMIAMLyRQWABC5ConWcPWokUWOiWcUgLhckCiQwKRRKxjMOmiLkQRhotBqBGJaFCDGMaSI8HgaCYx1iVnp8GJI3aFNao1+-wBQIAzMIACpLDCySEddHpXAfZYDUhwxwGZF2BTdF6IAAeigyaOQsMomvJtNAzTQRXUMgo5qoURidmQsUx2NxhHxy0JJlAQfMehwhgpaw2y2tAFFnSi3ejPVicec-cVcOHOEHQOZ4mSRAx0LQKbdmvsRLdjuFbjHmttoVWHLcALKvaEASVu2eDoHSOIw2LQ6QAMvgKBSzjSmrLrErIPHXdN3RiUz7QOmAz3c33oKyApAMJOqYFt+YsCyFAxj9TsMKATxeKAACzCDsZQ2ITKWGTtajIyUnE4CFEAUZxZXfAA3AYGHZBE0V1PpDAGZFiCVGQDwvdkJlVUAKEQFhmWQDtdmhRJKVvZEKg1Dt9nqNJMkg1xoFKNBGEwdkKHwTJIE5Z1hG2XwmW4z9MjQX9DG1JwdEgPtEHiDBkGiLg-gfPhQAAVmEABpAjeOOIorx5ECwIsEiyMtUBoE0IYV3wph9MKZYjOOWUVygmD4DgpxhESSAAnaUB7AiUBI02VD2JcZQiAkvRFEyfA0VwKSDC4aU-DlUCoWIZ1312ehGHgnVaFAZKLDIC00CY3BshIMlSrc9F8Gg-xYPvUUnwANilaTvC-LQwORTh9kQGRskK3qkHQ0zYmgDAMNwQ9kWS217XEihqMoOppGSmMKo2-ajkwBLqDnRbnU2igjmK2QlkdUrORyjUyv0ldqEeZVM0yeCSHZbFKHOXV3XEGgPvibRN0zahhHawEnwAdnBQ8lUw1xLWoYD5QsGRkeiRasBeeDnULeBiwAHklUBDWNdJkWdAA+BCSup1kMO1dFbk9UmFCrfAueLfHIkmGRpiYmpSnSRADAyc5XvRfbLRMEmNztZYHSofbqGkFd+d1MqVzC5YORV7BDClJYkC5sYHtASmytWtX1udaRiaLBQKcZ6h7GgFxMjmUL1k2ThlcQTXtaTN2Sv1pMao9SPzdVK2ds5O3kTjOEXbhEnyclT3vd90hkDLCsqwAH1AWt60bUBy9bdsu2Dk5oHnMPTQxbmo-Z5B0j3BR8YTy2GGt5VbdK5EzoXDPQFdjuPZofO-aUE8aWVjjjndcIFYRaQkFoPdGqLxToPgKsitkux4BxCx4OWS+eVUjrQAADh6rpkhZVMaQAdRqbK4jmhah5QCm1oDPYsl1rq2AUCYcwglSjwQvJfdcS4259UgotayLh2SSzGmxL8lk+rTUUMiWa81MLalkpLRQpN8AKiUGDLQ6oLQIkaKAAASogPe8AMBd3bsWBqutMIxRxvAJUtlz7ojAUDSaiB0EwGoFguSuCprtyposI2Dt4Dq2dqAPaGoHAT2dMSaUSCmS3wcCPaIfZICGAwLAEqxYRZpHZHLZCoAxTo2zA-OGoAABqrhcDpFMigw0KQ9D1SCbQNAnB0qrm9OcUJKBwnIBxpLeeMAC4YH8p4KWDASpr3MRIBM0xXCE3RAiZEDloBKPGl+dqOMeFRwwC1AqTAKQeVal5UAABeUAABvHstwACc8Mn4AAYxTPg0mKIZAhxliluBSAZOYSS0DJKWWJAAJaIItJj4XgLAZEABxaAgSOgSOQEc1waADRMFuJIbcIQ7AMgpAAbT6XEBIuQUjkgrvsGA2BsjUHuVkHIeRfm3EsEElAwLQAAF8AC6DyVl8l+QILSQyhnIpzKGU2jJgTAmfD2OF2LhmjLGQIWZGkxlDLGU-eGiz+mPICGsiFgo0nHRtEgAAVs3UY9zHl0meRIN5Hz4gSG+aoUsAApTAiAQVAslRC6wrAMBVkRdioMqLSwPFGs8N4KoT6as+QWSOpY6wNgFSs-sERByQGHGODAE4K62FoLQPQxgQCJOSewHGKBgAjElqYY6pg+q8vQpcKW0ASDdiDCSwZIzxnAk6gIAQEz6VjMZcsnMLL1kV1iSOBgPFOQrjYbUK1OYhVhEZO8z5ErwUyvYGwpt7AFVgp+RszEXE-DqqRY87VoBgRDPYEMjSxqe77nxqWVNQUYBFKmagfANhDAVqDIgoypZLAZHZLsZYXFgXEtJYmsZz5nypvhsCeGlKs3MtJBC-Yc15XGqrS80AtbxVJA7RXEQrInVts-VKiumy1b+l7cagdcz2DUvA2GRknUNJP2JZwOF3AGl0CpprCkzpXkIp6W8Eg3LRq0HYExFwLFqBlGap5JgDR8zUMuj0xmu19oQLqJwNDJURyvElGw9ppFyK9OPcm1N6b4ZjM4CAqRtBKPNOo68rjPGEV1CAA)
