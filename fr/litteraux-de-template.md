# Types de littéraux de template

Les types de littéraux de template sont une définition de type plus précise pour les chaînes de caractères afin de correspondre à leur contenu, construits sur les bases des *template strings* (chaînes de template) en JavaScript.

```typescript
type Color = "White" | "Black";
type Quality = "Basic" | "Premium";
type Finition = "Matte" | "Glossy";

type Paint = `${Color} ${Quality} ${Finition}`;
```

Dans cet exemple, `Paint` est un type qui ne peut être que l'une des chaînes suivantes :

- `"White Basic Matte"`
- `"White Basic Glossy"`
- `"White Premium Matte"`
- `"White Premium Glossy"`
- `"Black Basic Matte"`
- `"Black Basic Glossy"`
- `"Black Premium Matte"`
- `"Black Premium Glossy"`

Les types de littéraux de template peuvent utiliser n'importe quel type interpolé dans la chaîne, par exemple :

```typescript
type RgbCssString = `rgb(${number}, ${number}, ${number})`;

const rgb: RgbCssString = "rgb(255, 255, 255)";
```

Ils peuvent aussi inclure des parties statiques dans la chaîne et des transformations sur les types interpolés, par exemple :

```typescript
type EventName = "click" | "mousedown" | "mouseup";
type Element = {
  [K in EventName as `on${Capitalize<EventName>}`]: (event: Event) => void;
} & {
  addEventListener(eventName: EventName): void;
};
/* équivalent à
type Element = {
  onClick(e: Event): void;
  onMousedown(e: Event): void;
  onMouseup(e: Event): void;
  addEventListener(eventName: EventName): void;
};
*/
```

::: info

Le type utilitaire `Capitalize<StringType>` est un type utilitaire TypeScript intégré qui met en majuscule la première lettre d'une chaîne. Les types de littéraux de template sont venus avec de tels helpers utiles, tels que `Uppercase<StringType>`, `Lowercase<StringType>`, `Uncapitalize<StringType>`

:::

## Exercice

Créez un type `Card` qui correspond à n'importe quelle chaîne composée d'un nombre suivi d'une couleur (♠️, ♦️, ♣️, ♥️).
Vous pouvez partir de [ce code JavaScript](https://www.typescriptlang.org/play/?target=9#code/PTAEGECcFMEMBdqlqeBPADk8tIBNUALBUAWwQGNDoBnZAOzVBvkgEt6BzUCge1Iy8a0ArwBmoAFAhkoegFdSAI2iRQvNQClgARWABpYAEFQY3gBtzvAO4jQSpihry28UAApABmSB4P4A0oQDMyP1BAYzJgwFMybwBKaTAzNWgAD1gBcyQAIgBmH3T-dM0g3NB0ozCi9IBGAAZI9MlJPnoWHgsNOgBeUABtAHIfHv8eyIHQHrCRnqCegF0AbgbeJrc8aAoAa1BOroAmX0zfABZfAFZfADZfAHZfAA5fAE5farzNcp1y-XKjdOnJUH-QAA6MTmBAAWVgGHc9E2AD4WlZIDRAeQoXxEXDQAADAAkAG96ABffHojSErFRKLzBZNCzQQFWTjuFbrKmSIA)
