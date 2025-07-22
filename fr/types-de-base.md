# Types

TypeScript est entièrement axé sur les types. Un type est lié à une variable en utilisant une **annotation de type statique** ou inféré à partir d'une expression :

```typescript
let a: number = 1; // annotation de type statique
let b = 2; // b est inféré comme étant de type number
let c = a + b; // c est inféré comme étant de type number
```

Annoter statiquement un type qui peut être inféré est redondant, mais cela peut être utile à des fins de documentation, ou pour vérifier que le type est celui que vous attendez.

## Types primitifs

Les types primitifs font référence aux valeurs primitives en JavaScript :

- `undefined`
- `null`
- `boolean`
- `number`
- `string`

## Any et unknown

`any` est un type qui peut contenir n'importe quelle valeur. Par défaut, quand le type ne peut pas être inféré, TypeScript assignera le type `any` à une variable. TypeScript ne se plaindra jamais d'erreurs de type lors de l'utilisation de `any`, mais vous perdez tous les avantages du typage statique. C'est pourquoi il est préférable d'éviter d'utiliser `any` autant que possible, et pourquoi l'option de compilateur `noImplicitAny` devrait être activée dans votre `tsconfig.json` si vous visez une sécurité de typage maximale.

`unknown` est un type qui peut contenir n'importe quelle valeur, mais vous devez effectuer une vérification de type avant de l'utiliser. C'est utile quand vous ne connaissez pas le type d'une valeur, mais que vous voulez toujours assurer un typage sûr. Vous serez contraint de _réduire_ le type de la variable avant de pouvoir l'utiliser :

```typescript
let value: unknown = userInput;
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Autorisé après réduction
}
```

## never

`never` est un type qui représente une valeur qui n'est censée jamais exister. Par exemple, on peut l'utiliser pour les fonctions qui lancent une exception ou qui ne retournent jamais :

```typescript
function throwError(message: string): never {
  throw new Error(message);
}
```

Dans ce cas, le compilateur TypeScript retournera **toujours** une erreur si vous essayez d'utiliser une variable de type `never`. C'est donc l'exact opposé du mot-clé `any`. Ce mot-clé sera un peu plus utile quand nous parlerons des types conditionnels par la suite.

## Arrays, Maps et Sets

Les arrays, maps et sets sont des types génériques, ce qui signifie que vous pouvez spécifier le type de leurs éléments :

```typescript
let numbers: number[] = [1, 2, 3];
let map: Map<string, number> = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
]);
let set: Set<number> = new Set([1, 2, 3]);
```

Nous reviendrons sur les génériques plus tard. Pour l'instant, sachez simplement que vous pouvez spécifier le type des éléments que contiennent ces collections.

## Signatures de fonction, types de retour et mot-clé `void`

Vous pouvez spécifier les types des paramètres et de la valeur de retour d'une fonction :

```typescript
function isEmpty(array: unknown[]): boolean {
  return array.length === 0;
}
```

Si une fonction ne retourne rien, vous pouvez spécifier le type de retour comme `void` :

```typescript
function log(message: string): void {
  console.log(message);
}
```

## Types d'objets

En JavaScript, si quelque-chose n'est pas un type primitif, alors c'est un objet. En TypeScript, il y a plusieurs façons de définir des types pour les objets :

Quand vous savez exactement quelles propriétés un objet a, vous pouvez définir un type avec la notation *inline* :

```typescript
let person: { name: string; age: number } = { name: "Alice", age: 30 };
```

Si votre objet peut avoir des **propriétés optionnelles**, vous pouvez utiliser l'opérateur `?` derrière le nom de la propriété :

```typescript
let person: { name: string; age?: number } = { name: "Alice" };
```

Cela autorisera l'absence de cette propriété, ou une assignation à la valeur `undefined` pour cette propriété.

::: info

Une autre façon de définir un type d'objet par sa structure est le mot-clé `interface`. Il y a très peu de différences en pratique, mais vous pouvez en lire davantage [ici](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

:::

Si votre objet peut avoir n'importe quel nombre de propriétés, vous pouvez utiliser la `signature d'index` :

```typescript
let ageByPerson: { [key: string]: number } = { alice: 30, bob: 42 };
```

::: info

Une autre façon de définir un objet avec n'importe quel nombre de propriétés est le type utilitaire `Record`. Vous pouvez en lire davantage [ici](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type).

:::

## Types de classe et de constructeur

En JavaScript, les classes sont des fonctions servant de constructeur d'objets avec un prototype. Les fonctions déclarées dans le bloc de définition de la classe sont ajoutées au prototype et deviennent ainsi des méthodes des objets construits. TypeScript vous permet de définir le type de chaque propriété de la classe, puis d'utiliser la classe comme un type pour les objets construits :

```typescript
class Person {
  name: string;
  birthDate: Date;

  constructor(name: string, birthDate: Date) {
    this.name = name;
    this.birthDate = birthDate;
  }
}

const bob: Person = new Person("Bob", new Date("1990-04-25"));
```

Notez que cela fonctionne aussi avec les classes intégrées nativement au langage comme `Date`, `Element`, etc.

## Types littéraux

Vous pouvez spécifier la valeur exacte qu'une variable peut contenir en utilisant un **type littéral** :

```typescript
let name: "Alice" = "Alice";
name = "Bob"; // Erreur : Type '"Bob"' is not assignable to type '"Alice"'
```

Cela ne semble pas très utile au premier abord, mais ça devient plus intéressant une fois combiné avec les unions de types:

```typescript
let direction: "up" | "down" | "left" | "right" = "up";
```

Nous reviendrons sur les unions de types dans le chapitre suivant. Pour l'instant, sachez simplement que vous pouvez spécifier la valeur exacte qu'une variable peut contenir en utilisant un type littéral.

## Assertions const avec `as const`

Quand vous déclarez un objet sans annotation de type, TypeScript inférera le type des propriétés de la même façon qu'il infère le type pour une déclaration de variable, c'est à dire de façon assez large. Par exemple :

```typescript
let alice = {
  name: "Alice",
  age: 30,
}; // alice est inféré comme étant de type { name: string, age: number }
```

Si vous voulez inférer le type le plus spécifiquement possible, vous pouvez utiliser l'assertion `as const` :

```typescript
let alice = {
  name: "Alice",
  age: 30,
} as const;
// alice est inféré comme étant de type { readonly name: 'Alice', readonly age: 30 }
```

Quand vous utilisez l'assertion `as const`, TypeScript rendra les propriétés `readonly` et utilisera des types littéraux. C'est utile pour définir des objets regroupant des constantes, ou des objets immuables, et avoir la vérification de type la plus spécifique possible.

## Checkpoint

Essayez de remplir ces [mots croisés](https://ladigitale.dev/digiquiz/q/68652a1ba7e06) avec les nouveaux mots-clés que vous avez appris dans ce chapitre !

## Exercice

Ajoutez des annotations de type à toutes les variables dans [l'éditeur en ligne TypeScript](https://www.typescriptlang.org/play/?#code/PTAEEEBNNAXBPADgU1AQwHYYPazbAS2wwGdQAzbAJ3QBtbQA3NKgtAI1uTMxnIFcMAY0LEyBDHAAWqIdkioO2RsgB0AKHVzSsUIirz+IgML5kAc2oFuoALygMyAO6gAyslgAKANoAiclT8BLC+ADSgvirmHhxcYREAtsj4vgC6AJSaQrRoJGQACgaQRroA3uqglaDaJLCBItSeVMjk4UJmlqzc4foEQsjpoOVVI9IEJKrN5HagUxWjlbBS46rtsBZWNvZrG10k8wtLK739MyfIB6AAvuo3WmK6aIiIXDOOLoWGIp6+Ty-I8T8ASCIVS4QADKoAEwAVkyNV0sGwCXw2DezlAn2K318SJRSMB-kCwXikQsMU4ALBoEhAEY4fcdKB2MgWuiPkUSj8WS1CUkUtSAMyqGHgzKM2p6TkmfBoWjYcwzbx-LjhPGo8I88ipLIPUD8EjIGj2YZVDBoJIALlAAHJwLQ+sgbaFLgYuNbfEIDXijfEQNVMMzUJ7vcjfeFftEMCFQNQImhIAkJL5LuxcgBrDzW00LFXIa0ANhdC0WyNR1qhlxudwEwlEkmisAAKrg5YVHZ4DUbBjnZh5+FRJAB5dgAK2QIlUmfgJE7hqoqjTJEzsHSk2Q2OQnk8SLwtHCU0GtgAfENLiMEVKvrp7Ppr6Y9wrVOQJJBPIg7KfEOvprY-33yEyEtqj1ABHfhMEIBAZi7BclxXbwph1YDmlgAdJF3OVQAAaivbFYFUc5QAAKlAcDIOCeAqwhTI7hqbAuFUeVzB+Fs90teJGzYttWH6Odu3SIA)

Ensuite essayez de changer les valeurs assignées aux utilisateurs et aux produits, et voyez si TypeScript détecte des erreurs.
