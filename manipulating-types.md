## Manipulating types

In TypeScript, you can manipulate types in several ways. You can create new types from existing ones, combine types, and even create types that depend on other types.

### Type keyword, type aliases

You can create a new type using the `type` keyword. This is called a **type alias**. You can use type aliases to give a name to a type, which can be useful when you need to use the same type in multiple places. Think of it like a variable declaration for types.

```typescript
type Age = number;
let age: Age = 30;

type Person = { name: string; age: Age };
let person: Person = { name: "Alice", age: 30 };
```

### Union & Intersection types

You can combine types using the `|` and `&` operators. The `|` operator creates a **union type**, which means that a variable can hold a value of either type. The `&` operator creates an **intersection type**, which means that a variable must hold a value that satisfies both types.

```typescript
// Union type
type streetNumber = string | number;
let street: streetNumber = "926B";

// Union type with literals
type Direction = "left" | "right" | "up" | "down" | number;
let up: Direction = "up";
let diagonal: Direction = 45;

// Intersection type
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged & { alive: true }; // = { name: string, age: number, alive: true }
let alice: Person = { name: "Alice", age: 30, alive: true };
```

## Smart type narrowing

TypeScript has a powerful type inference system that can narrow the type of a value based on the conditions it goes through. This is called **type narrowing**.

For example, TypeScript can infer the type of a value based on the type of a property:

```typescript
type Person = { name?: string; age: number };
let data: Person | undefined = persons.find((p) => p.name === "Alice");
if (data !== undefined) {
  // data has been narrowed down to the type Person
  if(data.name !== undefined) {
    // data.name has been narrowed down to the type string
    console.log(data.name.toUpperCase());
  }
}
```

## Type assertions

Sometimes, you know more about the type of a value than TypeScript does. It can happen when the value comes from an external source, like a user input or a third-party library, that you trust to send you a value of the proper type. Or it can be a shortcoming of TypeScript's type inference, which is really good but not perfect.

In such cases, you can use a **type assertion** to tell TypeScript the type of a value, using the `as` keyword.

```typescript
let data = JSON.parse('{"name": "Alice", "age": 30}') as Person;
let age = document.querySelector("input#age").value as number;
```

::: warning

This is forcing TypeScript to treat the value as the specified type, even if it's not. So this can be a source of bugs if you make a mistake. Use a type assertion only when there is no other way to tell TypeScript the type of a value.

:::

## Type predicates

Type assertions are a way to directly tell TypeScript the type of a value. But what if the type of value is deduced by a function run at runtime for example? You can use a **type predicate** for that.

A type predicate is a function that checks the type of a value and returns a boolean. If the function returns `true`, TypeScript will narrow the type of the value inside the block where the predicate is called.

```typescript
type Person = { name: string; age: number };

function isPerson(value: { [key: string]: any }): value is Person {
  return typeof value.name === "string" && typeof value.age === "number";
}

let data = JSON.parse('{"name": "Alice", "age": 30}');
if (isPerson(data)) {
  // can call toUpperCase() because data has been narrowed down to type Person
  console.log(data.name.toUpperCase());
}
```

## `keyof` keyword

You can use the `keyof` keyword to refer to the keys of an object type. This can be useful when you want to create a type that is a subset of the keys of another type.

```typescript
type Person = { name: string; eyes: Color; mustache: boolean };
type PersonFeature = keyof Person; // = 'name' | 'eyes' | 'mustache'
```

## `typeof` keyword

You may already know the JavaScript `typeof` operator which returns the type of a value:

```javascript
typeof 42 === "number";
typeof "Alice" === "string";
```

In TypeScript, you can use the `typeof` keyword in the context of a type annotation to refer to the type of a variable or a property.

```typescript
let age = 30;
let ageType: typeof age; // = number
```

By itself it is not very useful, but it can be used in combination with other features to create powerful types:

```typescript
let person = { name: "Alice", eyes: "blue", mustache: false } as const;

type PersonFeature = keyof typeof person; // = 'name' | 'eyes' | 'mustache'
```

## Indexed access types

You can use the `[]` operator to create a type that represents the type of a property of another type.

```typescript
type Person = { name: string; age: number };
type Age = Person["age"]; // = number
type PersonField = Person[keyof Person]; // same as Person[string | number]
```

## Conditional types

You can create a type that depends on another type using **conditional types**. A conditional type is a type that is defined using a ternary operator.

```typescript
type Person = { name: string; job: string };
type Animal = { name: string; legs: number };

let alice: Person = { name: "Alice", job: "developer" };

type AlicePronoun = typeof alice extends Person ? "she" | "he" : "it";
type FelixPronoun = typeof felix extends Animal ? "it" : "he" | "she";
```

Note the use of the `extends` keyword. This is used to check if a type extends another type, i.e. if it would be valid if given this type as an annotation.

This can be combined with generics to create powerful types:

```typescript
type Pronoun<T> = T extends Person ? "she" | "he" : "it";
```

More on that in the next chapter: [Generics](./generics.md).

## Checkpoint

Drag the blocks of text in the [matching spots](https://ladigitale.dev/digiquiz/q/686530b6978df)

## Exercise

Follow instructions in the [following playground](https://www.typescriptlang.org/play/?ssl=23&ssc=8&pln=23&pc=10#code/PTAEE0HsFcHICcCmoC2BDAdmg5gSw9qGqAEaSQDWoAzgC6RI0CediKAdAFCfABUnARnagAYrnh0ANKADGSNLWTVIKZCTTVcM0LSYAHRNQBcnALRFQAQWi0AFgx37kaADa4NoJHqTVEGWviEmEQ29vCgAO64dqAAZuJ0AHJoqkQYACagLhq0yanekAbwAYagABRkMXTwgdQAlFzmxAAKNTLIugZEbh5ePn4BBBbeWojSEbZatrLBJMiI0baI4cQY0Chz4WUAqgDKACJ1oA7E1YHliOzY7NIARLsGMu4uoADysbHLtw2cvMDc3D4nAATMIAMLyRQWABC5ConWcPWokUWOiWcUgLhckCiQwKRRKxjMOmiLkQRhotBqBGJaFCDGMaSI8HgaCYx1iVnp8GJI3aFNao1+-wBQIAzMIACpLDCySEddHpXAfZYDUhwxwGZF2BTdF6IAAeigyaOQsMomvJtNAzTQRXUMgo5qoURidmQsUx2NxhHxy0JJlAQfMehwhgpaw2y2tAFFnSi3ejPVicec-cVcOHOEHQOZ4mSRAx0LQKbdmvsRLdjuFbjHmttoVWHLcALKvaEASVu2eDoHSOIw2LQ6QAMvgKBSzjSmrLrErIPHXdN3RiUz7QOmAz3c33oKyApAMJOqYFt+YsCyFAxj9TsMKATxeKAACzCDsZQ2ITKWGTtajIyUnE4CFEAUZxZXfAA3AYGHZBE0V1PpDAGZFiCVGQDwvdkJlVUAKEQFhmWQDtdmhRJKVvZEKg1Dt9nqNJMkg1xoFKNBGEwdkKHwTJIE5Z1hG2XwmW4z9MjQX9DG1JwdEgPtEHiDBkGiLg-gfPhQAAVmEABpAjeOOIorx5ECwIsEiyMtUBoE0IYV3wph9MKZYjOOWUVygmD4DgpxhESSAAnaUB7AiUBI02VD2JcZQiAkvRFEyfA0VwKSDC4aU-DlUCoWIZ1312ehGHgnVaFAZKLDIC00CY3BshIMlSrc9F8Gg-xYPvUUnwANilaTvC-LQwORTh9kQGRskK3qkHQ0zYmgDAMNwQ9kWS217XEihqMoOppGSmMKo2-ajkwBLqDnRbnU2igjmK2QlkdUrORyjUyv0ldqEeZVM0yeCSHZbFKHOXV3XEGgPvibRN0zahhHawEnwAdnBQ8lUw1xLWoYD5QsGRkeiRasBeeDnULeBiwAHklUBDWNdJkWdAA+BCSup1kMO1dFbk9UmFCrfAueLfHIkmGRpiYmpSnSRADAyc5XvRfbLRMEmNztZYHSofbqGkFd+d1MqVzC5YORV7BDClJYkC5sYHtASmytWtX1udaRiaLBQKcZ6h7GgFxMjmUL1k2ThlcQTXtaTN2Sv1pMao9SPzdVK2ds5O3kTjOEXbhEnyclT3vd90hkDLCsqwAH1AWt60bUBy9bdsu2Dk5oHnMPTQxbmo-Z5B0j3BR8YTy2GGt5VbdK5EzoXDPQFdjuPZofO-aUE8aWVjjjndcIFYRaQkFoPdGqLxToPgKsitkux4BxCx4OWS+eVUjrQAADh6rpkhZVMaQAdRqbK4jmhah5QCm1oDPYsl1rq2AUCYcwglSjwQvJfdcS4259UgotayLh2SSzGmxL8lk+rTUUMiWa81MLalkpLRQpN8AKiUGDLQ6oLQIkaKAAASogPe8AMBd3bsWBqutMIxRxvAJUtlz7ojAUDSaiB0EwGoFguSuCprtyposI2Dt4Dq2dqAPaGoHAT2dMSaUSCmS3wcCPaIfZICGAwLAEqxYRZpHZHLZCoAxTo2zA-OGoAABqrhcDpFMigw0KQ9D1SCbQNAnB0qrm9OcUJKBwnIBxpLeeMAC4YH8p4KWDASpr3MRIBM0xXCE3RAiZEDloBKPGl+dqOMeFRwwC1AqTAKQeVal5UAABeUAABvHstwACc8Mn4AAYxTPg0mKIZAhxliluBSAZOYSS0DJKWWJAAJaIItJj4XgLAZEABxaAgSOgSOQEc1waADRMFuJIbcIQ7AMgpAAbT6XEBIuQUjkgrvsGA2BsjUHuVkHIeRfm3EsEElAwLQAAF8AC6DyVl8l+QILSQyhnIpzKGU2jJgTAmfD2OF2LhmjLGQIWZGkxlDLGU-eGiz+mPICGsiFgo0nHRtEgAAVs3UY9zHl0meRIN5Hz4gSG+aoUsAApTAiAQVAslRC6wrAMBVkRdioMqLSwPFGs8N4KoT6as+QWSOpY6wNgFSs-sERByQGHGODAE4K62FoLQPQxgQCJOSewHGKBgAjElqYY6pg+q8vQpcKW0ASDdiDCSwZIzxnAk6gIAQEz6VjMZcsnMLL1kV1iSOBgPFOQrjYbUK1OYhVhEZO8z5ErwUyvYGwpt7AFVgp+RszEXE-DqqRY87VoBgRDPYEMjSxqe77nxqWVNQUYBFKmagfANhDAVqDIgoypZLAZHZLsZYXFgXEtJYmsZz5nypvhsCeGlKs3MtJBC-Yc15XGqrS80AtbxVJA7RXEQrInVts-VKiumy1b+l7cagdcz2DUvA2GRknUNJP2JZwOF3AGl0CpprCkzpXkIp6W8Eg3LRq0HYExFwLFqBlGap5JgDR8zUMuj0xmu19oQLqJwNDJURyvElGw9ppFyK9OPcm1N6b4ZjM4CAqRtBKPNOo68rjPGEV1CAA)
