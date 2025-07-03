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

Suivez les instructions dans [l'éditeur en ligne TypeScript](https://www.typescriptlang.org/play/?#code/PTAEE0HsFcHICcCmoC2BDAdmg5gSw9qGqAEaSQDWoAzgC6RI0CediKAdAFCfABUnARnagAYrnh0ANKADGSNLWTVIKZCTTVcM0LSYAHRNQBcnALRFQAQWi0AFgx37kaADa4NoJHqTVEGWviEmEQ29vCgAO64dqAAZuJ0AHJoqkQYACagLhq0yanekAbwAYagABRkMXTwgdQAlFzmxAAKNTLIugZEbh5ePn4BBBbeWojSEbZatrLBJMiI0baI4cQY0Chz4WUAqgDKACJ1oA7E1YHliOzY7NIARLsGMu4uoADysbHLtw2cvMDc3D4nAATMIAMLyRQWbB+ZZaUAAIXIVE6yCiMTsyFikBcLkgUSGBSKJWMZh00RciCMNFoNQIZLQoQYxjSRHg8DQTGOsSsTPgZJG7WprVGv3+AKBAGZhAAVJYYWSQjpLUDpXAfZYDUjIxwGag6WwKbovRAAD0UGQNyBhGDh2iRlF1VIZoGaaCK6hkFAdVHR00xcRxeIJhCJyxJJlAUfMehwhmpaw2yxdAFEfZFFlbA7j8ecw8VcPHOFHQOZ4pSRAx0LRqbdmvsRLdjuFbinmtsEU2HLcALKvBEASVuxejqvxGDxaHSABl8BRqWd6U0FdY1ZB036s9icyHQPmIyPS6roByApAMAvaYFD+YsOyFAxL3TsGKATxeKAACzCAcZM2ITJLBkdpqH1GUnE4CFEAUZwFV-AA3AYGC5VEDSNPpDAGfViDVGQzzvLkJk1UAKEQFg2WQAddgRRIaWffUKh1Ad9nqNJMng1xoFKNBGEwLkKHwTJIB5H1hG2XxWUE-9MjQYDDH1VD6FVRB4ltUBoi4P43z4UAAFZhAAaTI4TjiKB9+SgmCLCuminVAaBNCGANSKYEzCmWczjgVAMEKQ+AUKcYREkgAJ2lAewIlARNNmw3iXGUIg5L0RRMnwA1cAUwLODlPxFWgqFiB9X9dnoRhFMNWh1Ow7VHTQDjcGyEhKXU7yVXwRD-GQ18JQ-AA2WUnD3JBcJg-VOH2RAZGyMrBu8ACtCs2JoAwPDcHPfUMrdD1ZIoRjKDqaQMpTMhKD2igjkwVLqFXNafTOo47CNGQli9dSeUKnUMu5LNqEedVC0yVCSC5PFKHOI1MXEGg-vibR90LahhG6wEPwAdnBc81Xw1wnWoSClQsGRMeiNasBeVCfUreBqwAHhlUAzQtdJ9R9AA+NDKsZjk8IUlVbmxamFCbfABerUnIkmZ7QA4mpSnSRADAyc4TIDE6UScEwqb3d1lk9Kg1eoaQA1Fo0voDaLlm+2MYUR0AcqQAWxjeu2qtdHX4D1n1pEpqsFDp9nqHsaAXEyOYovWTZOC1xADaNlUTcqs344arFfdoWUlgdhgnfVF2vrTZFveRKnaZlAOg5D0hkDrBsmwAH1AVt207UAG97fshyjk5oDXWOtzT12A3SE8FFJjPNUdw6eXpr6bvXQvEWLtP-ZoCvQ6UK96S1vjjkxcI1adaQkFoE9Wur21EPgJtFMgA14HxCxUOWe-+S0nrQAADgGrpknZXN6QAOo1AKnEZaq1zygBhLQH2gtaD3Q5iYcw4lSioTvPfXcm4AxzXgmtByLguTyymjxACdk5ojUUPqJaK18IKVvvLRQ1N8DKiUDDeEB9USNFAAAJUQCfeAGBeap1gS1BO4tZJE3gGqJyt8AwwOrKQpAOCYDUHwcpIhw1AzhAWHvN220vRe1AMdHUDg54+jJHKdBrJn4OFztEMchgMCwEqtWKWO8VZLAkpKXGxY34o1AAANVcLgdIVlNxmhSHoZqITaBoGyvHIM-9CDhJQJE5ARN5arxgJXDAIVPAKwYJVHe1iJAZhiK4cmKpUT6lctANR00ALdSJgIxOGAOqlSYNSXynV-KgAALygAAN4jluAATlRh-AADJKT8ulJQjIEJMyUtxqRDJLOSWglJaw5VAAACWiM9SYpF4CwH1AAcWgMEjoMiVSnNcGgU0TBbiSEPCEOwzJqQAG0BlxASLkFIVJG77BgNgbI1AnlZByHkAFtxLAhJQGC0AABfAAus8tZgoAUCH0iMkZaKSzW3jKAYEwJPwjkRXi0Z4yJkCHmbpCZIyJkf1RsswZLyAgbOhSKDJl1XRIAAFY91GE8l5jI3kSE+d8+IEg-mqFrAAKUwIgcFoKZXQusKwDATYUV4qjBi2sDxJrPDeBqK+OqfkVjTrWNsHZhVrPSOOScM45y1lsLQWgehjAgGSak9gRMUDABGPLUwl1TBzQFbhS4CtoAkGHFGclwyxmTOBL1AQAgplMomSy1ZJZ2WbMbts6cDAhI8gDFw2otqSyirCCyL5PzpVQvlewLhTb2DKshf8rZOIBJ+C1ail5eqiUjPYCM3SZrh6nlJrWVN4UYAlJmagfANhDAVqjGg8ytZLAZC5LsZYAkwVkopYmiZn5PyptRsCVGNKs1sopNC-Yy0lVmqre80AtapVJA7Y3EQHIMAUDbR+2Vjcdm63DL2s1A6FnsDpeBuMLJeq6Q-mSzgiLuBNLoAzA21IfQfORX0t4JA+WTXThxFwXFqBlHan5JgDRywMLOn09mR01b3TqJwNDlVpyvBlFwzp1FaL9KPcm1N6bUYTM4FAuRCgKOtKox8zj3HkV1CAA)
