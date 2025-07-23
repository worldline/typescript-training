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

```typescript
type T = "hello" extends string ? true : false; // T = true
```

In the context of generics, `extends` will give more control to the developer and raise errors if the type does not match the constraint. Here are a few examples:

```typescript
type HasLength = { length: number };

function longest<A extends HasLength, B extends HasLength>(a: A, b: B): A | B {
  return a.length >= b.length ? a : b;
}

longest("string", ["a", "r", "r", "a", "y"]);

longest([1, 2, 3], new Set([4, 5, 6]));
// Error: Property 'length' is missing in type 'Set<number>'
// but required in type 'HasLength'
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

Follow instructions in the [following playground](https://www.typescriptlang.org/play/?#code/PTAEEFQcwUwOxgJwJYGNQEUCuyBeoBlATwGcAXGAWwChqQJQBHHfZE0SgQwBMZQB7AGahOoEkmQx2Qplillk-OCQB0oAKKdUAC1nzFcUGxGH+AIwBWMVGTphU-SgAd+47gOFltfZvqWgFMgAbGAAaEVAgtjIPUCdEfhcSZAUldk44dy8+GAAPJ2sKdwySAHckFTtQAAUEpJSDdlQM0DM+UWTnEIDEOWBBTiDxcP5ECKjyWPIUOCgSEbHRCZiZOCxKNsQYdx1+NCkqgBVvLcFR9uVyxCaWtrEyGbnwtY2kaTGzfn4Qktp6AEY1AARGCCZAIALeAJEArscCXJAmdzYPxwNRHKG+cgGOJ1VwNNJibSDIKgYkANz42TEnEoVJh7XY1JKV1i1KxqTgfzAACY1ABhRxOEIUSH0gomOD8MicTnsM5jLzGbB4UCoIKcEgkKoAVXE0HgEnQ4JMZSQKOx-gyO28qAA1vCzWNBFg4DZGmJkFA4LKsFsqmR+KB4CQ-VSoSzEcSmVC8gUbNtoRKFWK9JbDE5NW4ROlEFB1vBbNR1VnMCxQABvaigGtpuUALlArrtUtKXNrpquJEbzdbXOrtYcygeWBsowAFBzGgBKSsDjs1pWqKeEgC8dcaAG55wulypI9dQOuANoAXW3HYAvrQOweLZzJ3J0+ED7OqwvB2kYuDeLkj5C2BUFdlBUH88gAeUER9UWnC8PyMYRxzAv8AD51wABjfHd4IA1QDxIY9kNPf8Dzgj9ryvG9B1tB0EUQaDn07JAsJwrYyD9QxgP3Oij1XddSJ3a8d1gMgADFwUGAgHC2ccWPgodJjgMx7w9dc92A1QQlmLwyIXBSYiUwVEC2Gx-3Up85RUMEggoejgKPFDcJUHRrFop0GM5cIuNfacVC0qAdOw2s2I40AAAMABIK0M0YTLIS9QDAKKlJUtJLzC3TryE-TZFVdcEFKMs8HHY8d3feDAhCRsACIAHViW-GM+C4E02gQMEVmEQ4GSklAnBWSkxgAKU4clOF65B+oAfmq0IgpreJEnxBtQGPaqgSIH1KDQJNwSgWbQGqggZQUdAyBhPaDuq0TNVs4NcmsLBOWq085pwg8auO2UdvOpxLsEt7a3Kj9KpgGqAElDFKbQ0F0IgYE4MZuoKCb+rJTVWhgeBQC2H5sycLAzCidUiBmwGP0W+oVuPHl0P+Hlwlp-4AGZGbpgAWV75qYxBGyZnkAbK7nQZq+rYbZKEziCIJ+FKPajHSUAxqidxSk4IgAiDXgSy2CJpnlsaUE4ImYDJ7nKeWxpG1KnCO2qsKRVALawcIB55fXABycBiZgD2wtm7m7YdmADNpF39dmf8vZ9v2A9t2t7eOx4nbDqPvf2WPyYXLn3romrg9DulGwjqA05j-3BY7YHdxSKrDsh0BkZgVGyHCIh+CwNUWizL1DDWaWkSbTJQXBRNAxMDXDeQY3ujMDXeAGLAbNAOWvA7mIsGSSP9dM-vSRc+1VDj+CLeSamRzCUABiGGAc-gj6r8GcRBaFnCRcO+rZQV1MCcQJI+BkNSD25I9jcA9kmPgJom4tzNjhU+BJlDW2qocLW8BpTtDMOIN0ADPAMiuigowmQ0CynaFfV07p-DcH4FIOAHsYghUQIYUQys5BXQAELSm0C9LOt486HQ4V4aqlcgbC1ri7OqDVQBUKkOFNh90KCZDhGFIwXQNawJPniM+VtVrVUgFPGeOCIGgDkU-IM0ZUy-T4OAY+8ddFK0RtPE2bIGQMFMejJqRi2E2NtsghkcJB4mN1tSEgYduHcwfnY-RTjAEuJMUMMxGNqSWIgEIyi1BTywVoMwPA3EnSpTgI+HJGljzoVeodL6p1dqzGqpk7JuBclXHyYU+pxT-hlP5rUlgDTzQWQMM0oCvS0g0zKfbR2zti5u0jp7dOqBfb+06Tku8gyCl1IGaiAizMynX3EAs+pSzUT9OKZzcI1UBFcN2d0xATTVnFIAKwjL0Q4gxziJRxJIAkjxyTrGZOLGkb4MA-L8CgP0kS4kfRBCkucWSsFEpgAAGyJVAHCoAA) for a practice exercise on generics.

## Generic types defaults

A generic type can have a default value, which will be used if the type is not specified when using the type. Example:

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

const stack = createStack(); // stack is of type Stack<string> and is empty
const numberStack = createStack<number>([1, 2]); // Stack<number> containing [1, 2]
```

## The `infer` keyword

The `infer` keyword is used in conditional types to infer a type from another type. It is also used in generics to infer a type from a value. For example, here is how you can infer the type of an array element:

```typescript
type ElementType<A> = A extends (infer E)[] ? E : never;

type T = ElementType<string[]>; // T is string
type U = ElementType<number[]>; // U is number
```

Here is how you can infer the return type of a function:

```typescript
type ReturnType<F> = F extends (...args: any[]) => infer R ? R : never;
type T = ReturnType<typeof Math.max>; // T is number
```
Or the type of the first argument of a function:

```typescript
type FirstArg<F> = F extends (first: infer A, ...args: any[]) => any ? A : never;

type T = FirstArg<typeof String.fromCharCode>; // T === number
```

In this example, `FirstArgument` is a generic type that takes a function type `F` as a parameter. It checks if `F` is a function that takes at least one argument, and if so, the `infer` keyword is used to extract the type of the first argument from the function type.

Note the `never` keywords in the second part of the conditional. It is a special type that matches no value at all. It's basically an empty set used to raise an error if the argument passed to `FirstArgument` is not a function with one argument at least.

## Exercise 2

Follow instructions in the [following playground](https://www.typescriptlang.org/play/?#code/PQKgUAmg9grg5AJwKYAIC2BDAdhg5gSy1xQxQAd8AvS0gZwBcpkV6ALDekgGy6gHdaKAMYwGUNEgSDGw0YzRVUbJPgTkqNFH1ZIsKJgBNJhYvnpgAguuqkh2FOwBuqWkmcIMXFlDIUigqD0zADowABUdWTEJNTs9IVYoKFcWVmQlHz9cQQw0QOJlFAA2EkcMfC4MACMuVB96fEDaUJBgMDB6AE8yVDDMkxQAXhQ4KowhQLgUAB8RhKQkVynZuB7fSWWRtFE0pLRaTbgoLnxnA5mRwMasA4BuduBgFABhZA5UUi6elAAFDU-2JxkGRkK4sPQcnoMAgPJ1hIF6OUsAMkAAPcb0LhwgDM3l8JloHW6qD+NgeT1eSHeJBQMAaJy6LGJKD6+KIAHkAGakzRsDgoZBCFRnGk8z7M7AGFBgR4CpD0GAIG6pVAwZGBJnfYGg3QNIj6LB1Tkq8jJWj4GoZNnZfTGwoUMlfXr9Dnc-7tJ0oACynTFQxQAG04NtaLtxAcADRzHSLJBwKOrJDrBBwAC6909PtZWUEw2zJi5YoAPD6xQA+W4oWVonpCehIKUyKqoYM7BB7c4reaxw5rHop9oyp4AIQwrilGtIJwYtrxOajyAVSppnsw9ASA08Xnt-2kgOE9mb6AwRi0ZlYKpSjGthM9PzNFtqYsJRO+AEksABlRhCADW-vvWhzUtZ8iwDAAiMYJiwcCo3A7tXFglBwOOU5FiQlD1RucDUzLdpoJnB0aAARgALhQD9vygP9-Qgq4mgwhCkAw1CzhwsACM4IiMAAJnIyif3-YYIKYliTjYuCoMCdjOOsGhsX4r9BNoyDxmkuDRLgkMw32HCqyeIsAFpDJQUNYC4KUsCgTgjzKE4DEHWUvQwX8Pj0Cwygqaon13TUlH3RdFT0QpAOAnybEEPhz1KcpKktOcCXIMdxxIQQyGhXJ5UkQlZQiEl-lMxhmHYSEUEITlCDMFwYF8LFZyYkgsAncTFijWgoEvD5mE8PgME6HJPLi2pGqlMyYAslAj0KIxOQwcbODsmAkFfVAPNi7ykGffCmi4-4ABZyLWryQN84T4JjRCNIu5iroWRDUw4na5IwABWQ7Bo258VPo7DbtjDCpJg1N9JQIyTLGiarJs1A7PwBzZO4op3vWk6IrA8DtPbcMAbUoGyxUwGMMxjtGOumSnu4gB2ZHjvCmhaHRvtJFgzDrloHD8eE5DNNZhiI3ApmEHJm5dpsAAOGmhs23d0Z54nsf5wn+Z+9ncNo5D5d0-mecFvTZTB0zEnGyzrMmmHPDh9ogA)

::: info TRIVIA

Generics allow TypeScript to be a turing-complete type system, meaning that it can express any computation that can be computed. This has been brillantly demonstrated recently by someone who managed to [run the video game Doom in the TypeScript type system](https://www.youtube.com/watch?v=0mCsluv5FXA).

:::
