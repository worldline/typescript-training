# Template literal types

Template literal types are a more narrowed type definition for strings to match their content, built on the fundations of template strings in JavaScript.

```typescript
type Color = "White" | "Black";
type Quality = "Basic" | "Premium";
type Finition = "Matte" | "Glossy";

type Paint = `${Color} ${Quality} ${Finition}`;
```

In this example, `Paint` is a type that can only be one of the following strings:

- `"White Basic Matte"`
- `"White Basic Glossy"`
- `"White Premium Matte"`
- `"White Premium Glossy"`
- `"Black Basic Matte"`
- `"Black Basic Glossy"`
- `"Black Premium Matte"`
- `"Black Premium Glossy"`

Template literal types can use any type interpolated into the string, for example:

```typescript
type RgbCssString = `rgb(${number}, ${number}, ${number})`;

const rgb: RgbCssString = "rgb(255, 255, 255)";
```

They can also include static parts in the string and transformations to the interpolated types, for example:

```typescript
type EventName = "click" | "mousedown" | "mouseup";
type Element = {
  [K in EventName as `on${Capitalize<EventName>}`]: (event: Event) => void;
} & {
  addEventListener(eventName: EventName): void;
};
/* same as
type Element = {
  onClick(e: Event): void;
  onMousedown(e: Event): void;
  onMouseup(e: Event): void;
  addEventListener(eventName: EventName): void;
};
*/
```

::: info

The `Capitalize<StringType>` utility type is a built-in TypeScript utility type that capitalizes the first letter of a string. Template literal types came with such useful helpers, such as `Uppercase<StringType>`, `Lowercase<StringType>`, `Uncapitalize<StringType>`

:::

## Exercise

Create a type `Card` that matches any string composed of a number followed by a suit (♠️, ♦️, ♣️, ♥️).
You can start from [this JavaScript code](https://www.typescriptlang.org/play/?target=9#code/PTAEGECcFMEMBdqlqeBPADk8tIBNUALBUAWwQGNDoBnZAOzVBvkgEt6BzUCge1Iy8a0ArwBmoAFAhkoegFdSAI2iRQvNQClgARWABpYAEFQY3gBtzvAO4jQSpihry28UAApABmSB4P4A0oQDMyP1BAYzJgwFMybwBKaTAzNWgAD1gBcyQAIgBmH3T-dM0g3NB0ozCi9IBGAAZI9MlJPnoWHgsNOgBeUABtAHIfHv8eyIHQHrCRnqCegF0AbgbeJrc8aAoAa1BOroAmX0zfABZfAFZfADZfAHZfAA5fAE5farzNcp1y-XKjdOnJUH-QAA6MTmBAAWVgGHc9E2AD4WlZIDRAeQoXxEXDQAADAAkAG96ABffHojSErFRKLzBZNCzQQFWTjuFbrKmSIA)
