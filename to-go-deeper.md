# To go deeper

## Features omitted on purpose

- [enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)

These four features have been excluded on purpose from this training, since they are all **non-erasable syntax** that is rewritten into JavaScript and therefore are not supported by JS runtimes.

Enums are basically sets of constrained named values. They can be useful but also have lots of quirks which gave them a bad reputation in the TypeScript community. They can be replaced by union types or objects used as maps. [More info here](https://www.youtube.com/watch?v=0fTdCSH_QEU)

Decorators are conflicting with another decorator proposal made for JavaScript through the ECMAScript standard, therefore we suggest to avoid them to prevent future conflicts. [Link to the proposal](https://www.proposals.es/proposals/Decorators)

Namespaces were used in the past to organize code, but they are now mostly replaced by ES modules. [More info here](https://www.youtube.com/watch?v=jrda9_zzPpI)

Interfaces are a way to define object shapes, but they can be replaced by type aliases with [very few minor differences](https://blog.logrocket.com/types-vs-interfaces-typescript/).

## Built-in utility types

TypeScript provides a list of [Utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) that are all generic types that can be used to manipulate other types. All these types can be written from scratch in your project, but they are provided by the TypeScript team to save time and prevent errors. Some are useful to know, like the `Partial`, `Readonly`, `Record`, `ReturnType`, `InstanceType`...

## Declaration files for non-TS projects

**TypeScript can help even in vanilla JavaScript codebases**. Indeed, declaration files can be created to provide TypeScript definitions for any JavaScript libraries, allowing for type-checking and improved IDE support in JS codebases that use these libraries. These declaration files have the `.d.ts` extension and can be found next to the JavaScript files or in the `@types` folder in the `node_modules` directory. They contain only type definitions and no implementation code, with the name of the types matching the variable names in the JavaScript files.

The [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) repository is a community-driven project that provides TypeScript definitions for thousands of JavaScript libraries. They can be installed with npm, for example `npm install --save-dev @types/lodash`.

Nowadays, most libraries are directly written in TypeScript and provide their own TypeScript definitions, so you don't have to rely on this community project to provide them ; they will be directly imported and used in your IDE.
