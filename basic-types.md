# Types

TypeScript is all about types. A type is bound to a variable using a **static type annotation** or inferred from an expression:

```typescript
let a: number = 1; // static type annotation
let b = 2; // b is inferred to be of type number
let c = a + b; // c is inferred to be of type number
```

Statically anotating a type that can be inferred is redundant, but it can be useful for documentation purposes, or to check that the type is what you expect.

## Primitive Types

Pritimitive types refer to primitive values in JavaScript:

- `undefined`
- `null`
- `boolean`
- `number`
- `string`

## Any and unknown

`any` is a type that can hold any value. By default, when the type cannot be inferred, TypeScript will assign the `any` type to a variable. TypeScript will never complain about type errors when using `any`, but you lose all the benefits of static typing. That's why it's best to avoid using `any` as much as possible, and why the `noImplicitAny` compiler option should be enabled in your `tsconfig.json` if you aim for maximum type safety.

`unknown` is a type that can hold any value, but you must perform a type check before using it. This is useful when you don't know the type of a value, but you still want to ensure type safety. You will be forced to _narrow_ the type of the variable before using it:

```typescript
let value: unknown = userInput;
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Allowed after narrowing
}
```

## never

`never` is a type that represents a value that is never supposed to exist. For example, it can be used for functions that throw an exception or that never return:

```typescript
function throwError(message: string): never {
  throw new Error(message);
}
```

In this case, the TypeScript compiler will **always** show an error if you try to use a variable of type `never`. This is therefore the exact opposite of the `any` keyword. This keyword will be a bit more useful when we talk about conditional types later.

## Arrays, Maps and Sets

Arrays, maps and sets are generic types, which means you can specify the type of their elements:

```typescript
let numbers: number[] = [1, 2, 3];
let map: Map<string, number> = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
]);
let set: Set<number> = new Set([1, 2, 3]);
```

We'll come back to generics later. For now, just know that you can specify the type of the elements in these collections.

## Function signatures, return types and `void` keyword

You can specify the types of the parameters and the return value of a function:

```typescript
function isEmpty(array: unknown[]): boolean {
  return array.length === 0;
}
```

If a function doesn't return anything, you can specify the return type as `void`:

```typescript
function log(message: string): void {
  console.log(message);
}
```

## Object types

In JavaScript, if not a primitive type, everything is an object. In TypeScript, there are several ways to define object types:

When you know exactly what properties an object has, you can define a type inline:

```typescript
let person: { name: string; age: number } = { name: "Alice", age: 30 };
```

If your object can have **optional properties**, you can use the `?` operator:

```typescript
let person: { name: string; age?: number } = { name: "Alice" };
```

This will allow the value `undefined` for this property.

::: info

Another way to define an object type by its structure is the `interface` keyword. There are very few differences in practice, but you can read about it [here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

:::

If your object can have any number of properties, you can use the `index signature`:

```typescript
let ageByPerson: { [key: string]: number } = { alice: 30, bob: 42 };
```

::: info

Another way to define an object with any number of properties is the `Record` utility type. You can read about it [here](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type).

:::

## Class and constructor types

In JavaScript, classes are just functions that refer to a constructor for an object with a prototype. TypeScript lets you define the type of each property of the class, then use the class as a type:

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

Note that it also works with built-in classes like `Date`.

## Literal types

You can specify the exact value a variable can hold using a **literal type**:

```typescript
let name: "Alice" = "Alice";
name = "Bob"; // Error: Type '"Bob"' is not assignable to type '"Alice"'
```

This doesn't look very useful, but it becomes more interesting when combined with union types:

```typescript
let direction: "up" | "down" | "left" | "right" = "up";
```

We'll come back to union types in the next chapter. For now, just know that you can specify the exact value a variable can hold using a literal type.

## Const assertions with `as const`

When you assign a value to a variable, TypeScript will infer the most general type possible. For example:

```typescript
let alice = {
  name: "Alice",
  age: 30,
}; // alice is inferred to be of type { name: string, age: number }
```

If you want to infer the most specific type possible, you can use the `as const` assertion:

```typescript
let alice = {
  name: "Alice",
  age: 30,
} as const;
// alice is inferred to be of type { readonly name: 'Alice', readonly age: 30 }
```

When using the `as const` assertion, TypeScript will make properties `readonly` and use literal types. This is useful for defining constants, or immutable objects, and have the most specific type-checking possible.

## Checkpoint

Try fo fill this [crosswords](https://ladigitale.dev/digiquiz/q/68652a1ba7e06) with the new keywords you learned in this chapter !

## Exercise

Add type annotations to all the variables in the [following code playground](https://www.typescriptlang.org/play/?#code/PTAEEEBNNAXBPADgU1AQwHYYPazbAS2wwGdQAzbAJ3QBtbQA3NKgtAI1uTMxnIFcMAY0LEyBDHAAWqIdkioO2RsgB0AKHVzSsUIirz+IgML5kAc2oFuoALygMyAO6gAyslgAKANoAiclT8BLC+ADSgvirmHhxcYREAtsj4vgC6AJSaQrRoJGQACgaQRroA3uqglaDaJLCBItSeVMjk4UJmlqzc4foEQsjpoOVVI9IEJKrN5HagUxWjlbBS46rtsBZWNvZrG10k8wtLK739MyfIB6AAvuo3WmK6aIiIXDOOLoWGIp6+Ty-I8T8ASCIVS4QADKoAEwAVkyNV0sGwCXw2DezlAn2K318SJRSMB-kCwXikQsMU4ALBoEhAEY4fcdKB2MgWuiPkUSj8WS1CUkUtSAMyqGHgzKM2p6TkmfBoWjYcwzbx-LjhPGo8I88ipLIPUD8EjIGj2YZVDBoJIALlAAHJwLQ+sgbaFLgYuNbfEIDXijfEQNVMMzUJ7vcjfeFftEMCFQNQImhIAkJL5LuxcgBrDzW00LFXIa0ANhdC0WyNR1qhlxudwEwlEkmisAAKrg5YVHZ4DUbBjnZh5+FRJAB5dgAK2QIlUmfgJE7hqoqjTJEzsHSk2Q2OQnk8SLwtHCU0GtgAfENLiMEVKvrp7Ppr6Y9wrVOQJJBPIg7KfEOvprY-33yEyEtqj1ABHfhMEIBAZi7BclxXbwph1YDmlgAdJF3OVQAAaivbFYFUc5QAAKlAcDIOCeAqwhTI7hqbAuFUeVzB+Fs90teJGzYttWH6Odu3SIA)

Then try changing the values passed for the users and the products, and see if TypeScript catches any errors.
