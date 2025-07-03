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

Follow instructions in the [following playground](https://www.typescriptlang.org/play/?#code/PTAEE0HsFcHICcCmoC2BDAdmg5gSw9qGqAEaSQDWoAzgC6RI0CediKAdAFCfABUnARnagAYrnh0ANKADGSNLWTVIKZCTTVcM0LSYAHRNQBcnALRFQAQWi0AFgx37kaADa4NoJHqTVEGWviEmEQ29vCgAO64dqAAZuJ0AHJoqkQYACagLhq0yanekAbwAYagABRkMXTwgdQAlFzmxAAKNTLIugZEbh5ePn4BBBbeWojSEbZatrLBJMiI0baI4cQY0Chz4WUAqgDKACJ1oA7E1YHliOzY7NIARLsGMu4uoADysbHLtw2cvMDc3D4nAATMIAMLyRQWbB+ZZaUAAIXIVE6yCiMTsyFikBcLkgUSGBSKJWMZh00RciCMNFoNQIZLQoQYxjSRHg8DQTGOsSsTPgZJG7WprVGv3+AKBAGZhAAVJYYWSQjpLUDpXAfZYDUjIxwGag6WwKbovRAAD0UGQNyBhGDh2iRlF1VIZoGaaCK6hkFAdVHR00xcRxeIJhCJyxJJlAUfMehwhmpaw2yxdAFEfZFFlbA7j8ecw8VcPHOFHQOZ4pSRAx0LRqbdmvsRLdjuFbinmtsEU2HLcALKvBEASVuxejqvxGDxaHSABl8BRqWd6U0FdY1ZB036s9icyHQPmIyPS6roByApAMAvaYFD+YsOyFAxL3TsGKATxeKAACzCAcZM2ITJLBkdpqH1GUnE4CFEAUZwFV-AA3AYGC5VEDSNPpDAGfViDVGQzzvLkJk1UAKEQFg2WQAddgRRIaWffUKh1Ad9nqNJMng1xoFKNBGEwLkKHwTJIB5H1hG2XxWUE-9MjQYDDH1VD6FVRB4ltUBoi4P43z4UAAFZhAAaTI4TjiKB9+SgmCLCominVAaBNCGANSKYEzCmWczjgVAMEKQ+AUKcYREkgAJ2lAewIlARNNmw3iXGUIg5L0RRMnwA1cAUwLODlPxFWgqFiB9X9dnoRhFMNWh1Ow7VHTQDjcGyEhKXU7yVXwRD-GQ18JQ-AA2WUnD3JBcJg-VOH2RAZGyMrBu8ACtCs2JoAwPDcHPfUMrdD1ZIoRjKDqaQMpTMhKD2igjkwVLqFXNafTOo47CNGQli9dSeUKnUMu5LNqEedVC0yVCSC5PFKHOI1MXEGg-vibR90LahhG6wEPwAdnBc81Xw1wnWoSClQsGRMeiNasBeVCfUreBqwAHhlUAzQtdJ9R9AA+NDKsZjk8IUlVbmxamFCbfABerUnIkmZ7QA4mpSnSRADAyc4TIDE6UScEwqb3d1lk9Kg1eoaQA1Fo0voDaLlm+2MYUR0AcqQAWxjeu2qtdHX4D1n1pEpqsFDp9nqHsaAXEyOYovWTZOC1xADaNlUTcqs344arFfdoWUlgdhgnfVF2vrTZFveRKnaZlAOg5D0hkDrBsmwAH1AVt207UAG97fshyjk5oDXWOtzT12A3SE8FFJjPNUdw6eXpr6bvXQvEWLtP-ZoCvQ6UK96S1vjjkxcI1adaQkFoE9Wur21EPgJtFMgA14HxCxUOWe-+S0nrQAADgGrpknZXN6QAOo1AKnEZaq1zygBhLQH2gtaD3Q5iYcw4lSioTvPfXcm4AxzXgmtByLguTyymjxACdk5ojUUPqJaK18IKVvvLRQ1N8DKiUDDeEB9USNFAAAJUQCfeAGBeap1gS1BO4tZJE3gGqJyt8AwwOrKQpAOCYDUHwcpIhw1AzhAWHvN220vRe1AMdHUDg54+jJHKdBrJn4OFztEMchgMCwEqtWKWO8VZLAkpKXGxY34o1AAANVcLgdIVlNxmhSHoZqITaBoGyvHIM-9CDhJQJE5ARN5arxgJXDAIVPAKwYJVHe1iJAZhiK4cmKpUT6lctANR00ALdSJgIxOGAOqlSYNSXynV-KgAALygAAN4jluAATlRh-AADJKT8ulJQjIEJMyUtxqRDJLOSWglJaw5VAAACWiM9SYpF4CwH1AAcWgMEjoMiVSnNcGgU0TBbiSEPCEOwzJqQAG0BlxASLkFIVJG77BgNgbI1AnlZByHkAFtxLAhJQGC0AABfAAus8tZgoAUCH0iMkZaKSzW3jKAYEwJPwjkRXi0Z4yJkCHmbpCZIyJkf1RsswZLyAgbOhSKDJl1XRIAAFY91GE8l5jI3kSE+d8+IEg-mqFrAAKUwIgcFoKZXQusKwDATYUV4qjBi2sDxJrPDeBqK+OqfkVjTrWNsHZhVrPSOOScM45y1lsLQWgehjAgGSak9gRMUDABGPLUwl1TBzQFbhS4CtoAkGHFGclwyxmTOBL1AQAgplMomSy1ZJZ2WbMbts6cDAhI8gDFw2otqSyirCCyL5PzpVQvlewLhTb2DKshf8rZOIBJ+C1ail5eqiUjPYCM3SZrh6nlJrWVN4UYAlJmagfANhDAVqjGg8ytZLAZC5LsZYAkwVkopYmiZn5PyptRsCVGNKs1sopNC-Yy0lVmqre80AtapVJA7Y3EQHIMAUDbR+2Vjcdm63DL2s1A6FnsDpeBuMLJeq6Q-mSzgiLuBNLoAzA21IfQfORX0t4JA+WTXThxFwXFqBlHan5JgDRywMLOn09mR01b3TqJwNDlVpyvBlFwzp1FaL9KPcm1N6bUYTM4FAuRCgKOtKox8zj3HkV1CAA)
