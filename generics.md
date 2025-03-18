# Generics

If you consider types like variables, then generics could be considered as functions. They allow you to create types that are parameterized by other types.

Generics are a powerful feature of TypeScript that allows you to create reusable types that can work in various contexts.

## Generics in function signatures

A common use case for generics is to create functions and indicate a relation between the arguments and the return type.

Let's take a simple example of a function that returns the first element of an array:

```typescript
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

To declare a generic type, you use the angle brackets syntax `<T>`. Here `T` is a type variable that can be used in the function signature. It is used in the argument type annotation for `arr` as `T[]`, meaning the function expects an array of a generic type, then it is used in return type definition as `T | undefined`, meaning the function will return either an element of that generic type `T` or `undefined` if the array is empty.

Any number of generic types can be used. For example, a function that randomly returns either the first argument or the second:

```typescript
function randomElement<A, B>(a: A, b: B): A | B {
  return Math.random() < 0.5 ? a : b;
}
```

By convention, generic types are most often named with a single uppercase letter, but you can use any name you want.

## Generics in type definitions

Generics can also be used in type definitions. For example, a type that represents a pair of values of different types:

```typescript
type Pair<First, Second> = [First, Second];
```

or a generic collection type:

```typescript
type Stack<T> = {
  length: number;
  push: (item: T) => void;
  pop: () => T | undefined;
};
```

In that case, you will have to specify the type `T` when you use the type `Collection`:

```typescript
const logs: Stack<string> = ["hello world"];
```

## Generics constraints with extends

By default, a generic type can work with any type. However, you can restrict the types that can be used with a generic type by using the `extends` keyword.

We have already seen this keyword `extends` in the previous chapter with conditional types. `U extends T` is used to indicate than the type `U` is `T` or a subtype of `T`, i.e. `U` is a valid `T` but is possibly an even more narrowed type. For example, `string extends string` is valid but also `string extends string | number`, or `"literal" extends string`.

In the context of generics, `extends` will give more control to the developer and raise errors if the type does not match the constraint. Here are a few examples:

```typescript
type Lengthy = { length: number };

function longest<A extends Lengthy, B extends Lengthy>(a: A, b: B): A | B {
  return a.length >= b.length ? a : b;
}

longest("string", ["a", "r", "r", "a", "y"]);

longest([1, 2, 3], new Set([4, 5, 6]));
// Error: Property 'length' is missing in type 'Set<number>'
// but required in type 'Lengthy'
```

```typescript
function getProperty<Obj, Key extends keyof Obj>(obj: Obj, key: Key): Obj[key] {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");
// Error: Argument of type '"m"' is not assignable to parameter
// of type '"a" | "b" | "c" | "d"'.
```

## Exercise 1

Follow instructions in the [following playground](https://www.typescriptlang.org/play/?#code/PTAEEFQcwUwOxgJwJYGNQEUCuyBeoBlATwGcAXGAWwChqQJQBHHfZE0SgQwBMZQB7AGahOoEkmQx2Qplillk-OCQB0oAKKdUAC1nzFcUG1Cp+lAA79x3AcLLa+zfUoA0oOmE6H+5hUs4ANqABbGS2oOaIPlbIfsoicDb2fDAAHuYwqBQ2XiQA7kgqHphy5AbsqF6gZJwA1nzJoIL8iJThgogwDWlkbpRYAQrmAXw6-GgwbmSIcsCCgeJuMGSoRfQAKg6dzZ0J+UgVVQBGfOQocFAkbnBYlCeI0oigR-z8I7m09ACMagAiMIJkAhqg5qkQMuxwMoCk8vDZsM44GpiptHKU4hEopYSLFymJtIEggSAG4NUEkTiUBrgvicdiNXIwlzFOEgtGI-GE55EUC8eYDMJpDJZERiaZAqAidiMwqfMAAJjUAGEzMNlmTqRkEnB+DU4uwdiDjNg8CYAnSSLRUOaSOwTfgAN7UUAuvRlJQkABcoCwcFqOrycGdrplD29vv9-EDtFdJg90ywWRaAAonO7lABKUBO2Ox+xsFRp-WgAC8bv1AG5g7mjapQ+wywBtAC6VdjAF8YyHoUgEenU+iDG5Q1mczW48owkDeKlS7XC4OPSpp2kAPKCAeIjNt8fIYTJlezgB8ZYADKPq+OXfm6z2Ho3D8256GdzXOx2uy6dJlalD9ohN3TYc7wvK9OjILBEEMIsDBUUNSxLMsX0vTtL1gMgADEgUCAhTE6ZNQPHUxJ1AOAjj7YsyxvBdEVUEYLnsV9c2I8hSKOFVEE6EUqO0AsYKXQFBiQQCMRLI952-VBfzvESh3LWCRwzFR6KgRjL1jcDIMMAADAASB0yI4riyHbUAwH0siKPKdttKYztUJYsJmFNMsEDyEo8GTRtLzHGt+Lgb0ACIAHUCSnelQS4IFnngAFYnCdYaVwlBfAEUkngAKU4YlOGS5BfAAfkC5kr0iaIcX1b1G0C34iDgSk0DBcwJWK0BAoIPVGrIcEWrcQKMLpCgnjSTIsDiQLmxK8dQyCjrOAUdBuuai5ApQqaXV83N-KCgBJQw8l4nRQCIGBOCeRKMjy1KCXYE54FATp3msCIsCOEJrSIIr1tzMrsVxD0qvlU8vnlNwga+ABmMHgYAFkm9Tu3-b1wflNafIRl1tra0K0F0GRGmaAIAijCUjGlUAcpCGw8k4HkyH4XlMnNXZRDOUmcpQTg3pgL6Mcxcr-uUKq+djQLtJGMJ6qpb0OvOSUywAcnAd6YAV7TipF10xYl0jKRgb02YuOclZVtWNavUXtNl0mpb4RXlYmM3vtjeGrxmtrxeWXXpbFOXjYd1BVfVtHY022MscCvbQAumArt6Y7+CwEwqgtZAoEMG4iYSGxfT5IEYCSBmvB5DnkC5kZuUZ-lBlAPJYm0ROwiwHEjbZkVM6CSTalUc3x1+mJKtARsE0mJoFhgV3prvb15gCcQ0fRq8I9C+aybZF7EGxPh8dBBXiXGbgFaavhopjuPedKrEB-KKrAvWBneB1CgRCOcQ4ED8IlpgVq74Z6c0HmrSJovosgGF5PwKQcAFZhE0lBUUlM5A-wAEK6m0BNZ2iMYRBRQfYVaHZvph1dMvMK4CpCgG0kg0APR4DcEhNpIwFgAg8gvn3K+FUb5D0CpAUu5dt52BpKAShCwGY3XXl-CAvcLZtW4WdMu3NP4CMgMI0AojGjiKQZIi2d8aSQmzoIkQuxGgUipOgvm7suEU1kbwhRWohFzxEXSMRii8GulQs2bctBnK4DgneKySgBx4BoumEgjZTyTTanNBaTUWoeK8T4-8fi4ABO8f5EJXxwko1iSweJMJEnJKCfqRs8pwnay9rbA24ojb21NurLJgTQx5LiakxsENwmz3EHU7xDTFxJKaT0kJcM+o4LQZ0nJvYen5OaQAVhKTIzm8j8YCLsSQBxEVNR8HAIFDx1AWJvBgMpfgUB8noSwvVAIuEWgwAItuMyYAABsZlQB3KAA) for a practice exercise on generics.

## Generic types defaults

Finally, a generic type can have a default value, which will be used if the type is not specified when using the type. Example:

```typescript
type Stack<T = string> = {
  length: number;
  push: (item: T) => void;
  pop: () => T | undefined;
};

const stack1: Stack = [];
stack1.push("hello world");
stack1.push(42); // Error: Argument of type '42' is not assignable
// to parameter of type 'string'

function createStack<T = string>(initial: T[] = []): Stack<T>;

const stack = createStack(); // stack is of type Stack<string>
```

## The `infer` keyword

The `infer` keyword is used in conditional types to infer a type from another type. It is also used in generics to infer a type from a value. For example:

```typescript
type FirstArgument<F> = F extends (
  first: infer FirstArgument,
  ...args: any[]
) => any
  ? FirstArgument
  : never;

type T = FirstArgument<typeof String.fromCharCode>; // T === number
```

In this example, `FirstArgument` is a generic type that takes a function type `F` as a parameter. It checks if `F` is a function that takes at least one argument, and if so, the `infer` keyword is used to extract the type of the first argument from the function type. The `never` keyword is a special type that matches no value at all. It's basically an empty set used to raise an error if the argument passed to `FirstArgument` is not a function with one argument at least.

Here is another example that infers the type of an array element:

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;

type A = ElementType<string[]>; // A is string
type B = ElementType<number[]>; // B is number
```

## Exercise 2

Follow instructions in the [following playground](https://www.typescriptlang.org/play/?#code/PQKgUAmg9grg5AJwKYAIC2BDAdhg5gSy1xQxQAd8AvS0gZwBcpkV6ALDekgGy6gHdaKAMYwGUNEgSDGw0YzRVUbJPgTkqNFH1ZIsKJgBNJhYvnpgAguuqkh2FOwBuqWkmcIMXFlDIUigqD0zADowABUdWTEJNTs9IVYoKFcWVmQlHz9cQQw0QOJlFAA2EkcMfC4MACMuVB96fEDaUJBgMDB6AE8yVDDMkxQAXhQ4KowhQLgUAB8RhKQkVynZuB7fSWWRtFE0pLRaTbgoLnxnA5mRwMasA4BuduBgFABhZA5UUi6elAAFDU-2JxkGRkK4sPQcnoMAgPJ1hIF6OUsAMkAAPcb0LhwgDM3l8JloHW6qD+NgeT1eSHeJBQMAaJy6LGJKD6+KIAHkAGakzRsDgoZBCFRnGk8z7M7AGFBgR4CpD0GAIG6pVAwZGBJnfYGg3QNIj6LB1Tkq8jJWj4GoZNnZfTGwoUMlfXr9Dnc-7tJ0oACynTFQxQAG04NtaLtxAcADRzHSLJBwKOrJDrBBwAC6909PtZWUEw2zJi5YoAPD6xQA+W4oWVonpCehIKUyKqoYM7BB7c4reaxw5rHop9oyp4AIQwrilGtIJwYtrxOajyAVSppnsw9ASA08Xnt-2kgOE9mb6AwRi0ZlYKpSjGthM9PzNFtqYsJRO+AEksABlRhCADW-vvWhzUtZ8iwDAAiMYJiwcCo3A7tXFglBwOOU5FiQlD1RucDUzLdpoJnB0aAARgALhQD9vygP9-Qgq4mgwhCkAw1CzhwsACM4IiMAAJnIyif3-YYIKYliTjYuCoMCdjOOsGhsX4r9BNoyDxmkuDRLgkMw32HCqyeIsAFpDJQUNYC4KUsCgTgjzKE4DHJFlIj9MRmHYSEUEITlCDMFwYF8LFZyYg1rkhCdxMWIdvQwX8Pj0Cwygqaon13TUlH3RdFT0QpAOAlKbEEPhz0vVBcWvHMSEEIxOQwGAuE4OyYFQTkmBNfN-HIaFcnlSRX1QBLykqEDd3wpouP+AAWciBqS4aCpUzTkMW+CY0Q1MOLGuSMAAVmmxKhvymhaDAlaFkQrS2w7DCpJg3CVJujDtPbcNGNW5j1tk7iij2wbkqQZ8VPo7CNLe661Nu-SUCMkyzLqyzrJQWzPHwBywCAA)

::: info TRIVIA

Generics allow TypeScript to be a turing-complete type system, meaning that it can express any computation that can be computed. This has been brillantly demonstrated recently by someone who managed to [run the video game Doom in the TypeScript type system](https://www.youtube.com/watch?v=0mCsluv5FXA).

:::
