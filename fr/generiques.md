# Génériques

Si vous considérez les types comme des variables, alors les génériques pourraient être considérés comme des fonctions. Ils vous permettent de créer des types qui sont paramétrés par d'autres types.

Les génériques sont une fonctionnalité puissante de TypeScript qui vous permet de créer des types réutilisables qui peuvent fonctionner dans divers contextes.

## Génériques dans les signatures de fonction

Un cas d'usage courant pour les génériques est de créer des fonctions et d'indiquer une relation entre les arguments et le type de retour.

Prenons un exemple simple d'une fonction qui retourne le premier élément d'un tableau :

```typescript
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

Pour déclarer un type générique, vous utilisez la syntaxe des crochets angulaires `<T>`. Ici `T` est une variable de type qui peut être utilisée dans la signature de fonction. Elle est utilisée dans l'annotation de type d'argument pour `arr` comme `T[]`, signifiant que la fonction attend un tableau d'un type générique, puis elle est utilisée dans la définition du type de retour comme `T | undefined`, signifiant que la fonction retournera soit un élément de ce type générique `T` soit `undefined` si le tableau est vide.

N'importe quel nombre de types génériques peut être utilisé. Par exemple, une fonction qui retourne aléatoirement soit le premier argument soit le second :

```typescript
function randomElement<A, B>(a: A, b: B): A | B {
  return Math.random() < 0.5 ? a : b;
}
```

Par convention, les types génériques sont le plus souvent nommés avec une seule lettre majuscule, mais vous pouvez utiliser n'importe quel nom que vous voulez.

## Génériques dans les définitions de type

Les génériques peuvent aussi être utilisés dans les définitions de type. Par exemple, un type qui représente une paire de valeurs de types différents :

```typescript
type Pair<First, Second> = [First, Second];
```

ou un type de collection générique :

```typescript
type Stack<T> = {
  length: number;
  push: (item: T) => void;
  pop: () => T | undefined;
};
```

Dans ce cas, vous devrez spécifier le type `T` quand vous utilisez le type `Stack` :

```typescript
const logs: Stack<string> = ["hello world"];
```

## Contraintes de génériques avec extends

Par défaut, un type générique peut prendre n'importe quel type comme paramètre. Cependant, vous pouvez restreindre les types qui peuvent être utilisés avec un type générique en utilisant le mot-clé `extends`.

Nous avons déjà vu ce mot-clé `extends` dans le chapitre précédent avec les types conditionnels. `U extends T` est utilisé pour indiquer que le type `U` est soit `T`, soit un sous-type de `T`, c'est-à-dire que toute valeur de type `U` est également de type `T` , mais toutes les valeurs de type `T` ne sont pas forcément de type `U`. Par exemple, `string extends string` est valide mais aussi `string extends string | number`, ou `"hello" extends string`.

Dans le cadre des génériques, `extends` donnera plus de contrôle au développeur et lèvera des erreurs si le type ne correspond pas à la contrainte. Voici quelques exemples :

```typescript
type HasLength = { length: number };

function longest<A extends HasLength, B extends HasLength>(a: A, b: B): A | B {
  return a.length >= b.length ? a : b;
}

longest("string", ["a", "r", "r", "a", "y"]);

longest([1, 2, 3], new Set([4, 5, 6]));
// Erreur : Property 'length' is missing in type 'Set<number>'
// but required in type 'HasLength'
```

```typescript
function getProperty<Obj, Key extends keyof Obj>(obj: Obj, key: Key): Obj[key] {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");
// Erreur : Argument of type '"m"' is not assignable to parameter
// of type '"a" | "b" | "c" | "d"'.
```

## Exercice 1

Suivez les instructions dans [l'éditeur en ligne TypeScript](https://www.typescriptlang.org/play/?#code/PTAEEFQcwUwOxgJwJYGNQEUCuyBeoBlATwGcAXGAWwChqQJQBHHfZE0SgQwBMZQB7AGahOoEkmQx2Qplillk-OCQB0oAKKdUAC1nzFcUG1Cp+lAA79x3AcLLa+zfUoA0oOmE6H+5hUs4ANqABbGS2oOaIPlbIfsoicDb2fDAAHuYwqBQ2XiQA7kgqHphy5AbsqF6gZJwA1nzJoIL8iJThgogwDWlkbpRYAQrmAXw6-GgwbmSIcsCCgeJuMGSoRfQAKg6dzZ0J+UgVVQBGfOQocFAkbnBYlCeI0oigR-z8I7m09ACMagAiMIJkAhqg5qkQMuxwMoCk8vDZsM44GpiptHKU4hEopYSLFymJtIEggSAG4NUEkTiUBrgvicdiNXIwlyfMAAJjUAGEzMNlmTqRkEnB+DU4uwdiDjNg8CYAnSSLRULKSOwpfgAN7UUBavRlJQkABcoCwcFqQrycE12sZB0NxtN-HNtG1Jj10ywWRaAAonLrlABKUAa53O+xsFQ+0WgAC8OtFAG5LcGJaprQ9o6AANoAXQTzoAvk6rdCkAjfd70QY3KmA0Gky7lGEgbxUunQ6oI+UVE20gB5QTlxF+3N15DCT3dlsAPhjAAYa4m61q2ypUyQMxOs+nU8OkwX84WtTpMrUoftEAPfVXi4h54vOmQsIhDB2lCvr9GozHtwuCwvYGQADEgUCAhTE6T1bzrUwG1AOAjlLSMY2XF9lBUEYLnsHdg2g8hYKOLlEE6LJW20MMUNUQFBiQC8MSjSdkxUI9UBPa8aMrWMDDfM8-T9ND4CgTCF2de9H0MAADAASNU4IIoiyDzUAwCkuCEPKPMxKwgtfxwsJmGlGMEDyEo8E9DMF1rJMUMNAAiAB1AlG3pUEuCBZ54ABWJwnWGlQJQXwBFJJ4AClOGJThfOQXwAH5rOZRdImiHFRUNDNrN+Ig4EpNAwXMIEoFi0BrIIEVsrIcE8oK6yALpCgnjSTIsDiaysziutUxs4rOAUdAytyi5rJ-VqtQs4MrMKgBJQw8lInRQCIGBOCebyMgi-yCXYE54FATp3msCIsCOEJFSIGKhuDBLsVxPUUtZGcvlZNxbq+ABmR67oAFhaoSizPQ0ntZQbzO+rUxrsmbdBkRpmgCAIHTyox2FEMKQhsPJOCIap+FAXhFUW2kxGmeGwpQThDpgU7gcxRKruUFLKedayxJGMJMqpQ1ivOKB0wAcnAI6YG5sTYvp7VGeZ2DKRgQ0znhmNef5wXhcXBmxI5+HWb4OW+YmRWzudL7F3awqmeWCW2YJzmee11ABaFwHnRG51Qcm0BlpgVbejm-gsBMKo5WQKBDBuGGEhsY1eEBBAkixrwMeJ5BSZGZ4MYjzgBjCPJYm0b2wiwHELgttAWYGIImNqVQlbrC6YmSzM3UmJoFhgA22uvQ15gCcRAaBxdQfsrqEZBPhzEfbE+Eh0FueJcZuG5nK+Fct2PYp+KsRr8oUus9Ysd4IUKBEI5xDgG3wl6mBKu3oxEjQLr8cEY0sgMbH+CkOBubCESnxEUBkbkSqACFhTaGanrH6MIbKAPsANfMZ1Hbaj7g5Z+UhQBiX-qAHo8BuCQjEkYCwAQMYryrmvJKG9MzWUgPHRO487A0lAGghYWN1pD3nhASuytCoUMWgnMmp9aGQAYaAJhjQz50LYcrLeNJIShzoSIXYjQKRUhAZTI25Cf5cKobwgU9DO6MLpMwkR4BoHal-FmIctA9K4C4jCVSShyx4HDBWPUGYZwtUKp1bqOUKpmIsVYksji4B2MseRDMXxXH-W8SwXxiAbEBJ8cE1krixamw1tLQmBctYKyFhE+xqYYmBIcYiNcz1XEd3ENkyxuT-H5OCZ9Nw1lIHAPKVEvJcT-FrgAKyJM4STHhkNaHaJILopy-I+CGLMdQHCbwYBoX4FAfJ-4gKZQCKBFoMAIJDkUmAAAbIpUAWygA) pour un exercice pratique sur les génériques.

## Valeurs par défaut des types génériques

Un type générique peut avoir une valeur par défaut, qui sera utilisée si le type en argument n'est pas spécifié lors de l'utilisation du type générique. Exemple :

```typescript
type Stack<T = string> = {
  length: number;
  push: (item: T) => void;
  pop: () => T | undefined;
};

const stack1: Stack = [];
stack1.push("hello world");
stack1.push(42); // Erreur : Argument of type '42' is not assignable
// to parameter of type 'string'

function createStack<T = string>(initial: T[] = []): Stack<T>;

const stack = createStack(); // stack est de type Stack<string> et est vide
const numberStack = createStack<number>([1, 2]); // Stack<number> contenant [1, 2]
```

## Le mot-clé `infer`

Le mot-clé `infer` est utilisé dans les types conditionnels pour inférer un type à partir d'un autre type. Il est aussi utilisé dans les génériques pour inférer un type à partir d'une valeur. Par exemple, voici comment vous pouvez inférer le type d'un élément de tableau :

```typescript
type ElementType<A> = A extends (infer E)[] ? E : never;

type T = ElementType<string[]>; // T = string
type U = ElementType<number[]>; // U = number
```

Voici comment vous pouvez inférer le type de retour d'une fonction :

```typescript
type ReturnType<F> = F extends (...args: any[]) => infer R ? R : never;
type T = ReturnType<typeof Math.max>; // T = number
```
Ou le type du premier argument d'une fonction :

```typescript
type FirstArg<F> = F extends (first: infer A, ...args: any[]) => any ? A : never;

type T = FirstArg<typeof String.fromCharCode>; // T === number
```

Dans cet exemple, `FirstArgument` est un type générique qui prend un type de fonction `F` comme paramètre. Il vérifie si `F` est une fonction qui prend au moins un argument, et si c'est le cas, le mot-clé `infer` est utilisé pour extraire le type du premier argument du type de fonction.

Notez les mots-clés `never` dans la seconde partie du conditionnel. C'est un type spécial qui ne correspond à aucune valeur du tout. C'est essentiellement un ensemble vide utilisé pour lever une erreur si l'argument passé à `FirstArgument` n'est pas une fonction avec au moins un argument.

## Exercice 2

Suivez les instructions dans [l'éditeur TypeScript en ligne](https://www.typescriptlang.org/play/?#code/PQKgUAmg9grg5AJwKYAIC2BDAdhg5gSy1xQxQAd8AvS0gZwBcpkV6ALDekgGy6gHdaKAMYwGUNEgSDGw0YzRVUbJPgTkqNFH1ZIsKJgBNJhYvnpgAguuqkh2FOwBuqWkmcIMXFlDIUigqD0zADowABUdWTEJNTs9IVYoKFcWVmQlHz9cQQw0QOJlFAA2EkcMfC4MACMuVB96fEDaUJBgMDB6AE8yVDDMkxQAXhQ4KowhQLgUAB8RhKQkVynZuB7fSWWRtFE0pLRaTbgoLnxnA5mRwMasA4BuduBgFABhZA5UUi6elAAFDU-2JxkGRkK4sPQcnoMAgPJ1hIF6OUsAMkAAPcb0LhwgDM3l8JloHW6qD+NgeT1eSHeJBQMAaJy6LGJKD6+KIAHkAGakzRsDgoZBCFRnGk8z7M7AGFBgR4CpD0GAIG6pVAwZGBJnfYGg3QNIj6LB1Tkq8jJWj4GoZNnZfTGwoUMlfXr9Dnc-7tJ0oACynTFQxQAG04NtaLtxAcADRzHSLJBwKOrJDrBBwAC6909PtZWUEw2zJi5YoAPD6xQA+W4oWVonpCehIKUyKqoYM7BB7c4reaxw5rHop9oyp4AIQwrilGtIJwYtrxOajyAVSppnsw9ASA08Xnt-2kgOE9mb6AwRi0ZlYKpSjGthM9PzNFtqYsJRO+AEksABlRhCADW-vvWhzUtZ8iwDAAiMYJiwcCo3A7tXFglBwOOU5FiQlD1RucDUzLdpoJnB0aAARgALhQD9vygP9-Qgq4mgwhCkAw1CzhwsACM4IiMAAJnIyif3-YYIKYliTjYuCoMCdjOOsGhsX4r9BNoyDxmkuDRLgkMw32HCqyeIsAFpDJQUNYC4KUsCgTgjzKE4DEHWUvQwX8Pj0Cwygqaon13TUlH3RdFT0QpAOAnybEEPhz1KcpKktOcCXIMdxxIQQyGhXJ5UkQlZQiEl-lMxhmHYSEUEITlCDMFwYF8LFZyYkgsAncTFijWgoEvD5mE8PgME6HJPLi2pGqlMyYAslAj0KIxOQwcbODsmAkFfVAPNi7ykGffCmi4-4ABZyLWryQN84T4JjRCNIu5iroWRDUw4na5IwABWQ7Bo258VPo7DbtjDCpJg1N9JQIyTLGiarJs1A7PwBzZO4op3vWk6IrA8DtPbcMAbUoGyxUwGMMxjtGOumSnu4gB2ZHjvCmhaHRvtJFgzDrloPThOQzTWYYiNwKZhByZuXabAADhpobNt3dHueJ7G+cJvmfvZ3DaOQuXdL57mBb02UwdMxJxss6zJphzw4faIA)

::: info ANECDOTE

Les génériques permettent à TypeScript d'être un système de types Turing-complet, ce qui signifie qu'il peut être utilisé pour calculer n'importe quoi de calculable. Cela a été brillamment démontré récemment par quelqu'un qui a réussi à [faire tourner le jeu vidéo Doom dans le système de types TypeScript](https://www.youtube.com/watch?v=0mCsluv5FXA).

:::
