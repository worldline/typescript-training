# Pour aller plus loin

## Fonctionnalités omises volontairement

- [enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)

Ces quatre fonctionnalités ont été exclues volontairement de cette formation, car elles sont toutes de la **syntaxe non-effaçable** qui est réécrite en JavaScript et par conséquent ne sont pas supportées en l'état par les moteurs d'éxécution JavaScript.

Les enums (énumérations) sont essentiellement des ensembles finis de valeurs. Elles peuvent être utiles mais ont aussi beaucoup de bizarreries qui leur ont donné une mauvaise réputation dans la communauté TypeScript. Elles peuvent être remplacées par des unions de types ou des objets utilisés comme dictionnaires. [Plus d'infos ici](https://www.youtube.com/watch?v=0fTdCSH_QEU)

Les décorateurs entrent en conflit avec une autre proposition de décorateurs faite pour JavaScript à travers le standard ECMAScript, par conséquent nous suggérons de les éviter pour prévenir de futurs conflits entre les spécifications JavaScript et TypeScript. [Lien vers la proposition](https://www.proposals.es/proposals/Decorators)

Les *namespaces* (espaces de noms) étaient utilisés à l'origine pour organiser le code, mais ils sont maintenant largement remplacés par les modules EcmaScript. [Plus d'infos ici](https://www.youtube.com/watch?v=jrda9_zzPpI)

Les interfaces sont une façon de définir des objets avec une certaine structure, mais elles peuvent être remplacées par des alias de types avec [quelques différences mineures](https://blog.logrocket.com/types-vs-interfaces-typescript/).

## Types utilitaires intégrés

TypeScript fournit une liste de [Types utilitaires](https://www.typescriptlang.org/docs/handbook/utility-types.html) qui sont tous des types génériques qui peuvent être utilisés pour manipuler d'autres types. Tous ces types peuvent être écrits de zéro dans votre projet, mais ils sont fournis par l'équipe TypeScript pour vous faire gagner du temps et éviter des erreurs courantes. Certains peuvent être utiles à connaître, comme `Partial`, `Readonly`, `Record`, `ReturnType`, `InstanceType`...

## Fichiers de déclaration pour les projets non-TypeScript

**TypeScript peut vous aider même dans les bases de code JavaScript vanilla**. En effet, des fichiers de déclaration peuvent être créés pour fournir des définitions TypeScript pour toute bibliothèque JavaScript, permettant la vérification de type et un meilleur support IDE dans les bases de code JS qui utilisent ces bibliothèques. Ces fichiers de déclaration ont l'extension `.d.ts` et peuvent être trouvés à côté des fichiers JavaScript ou dans le dossier `@types` dans le répertoire `node_modules`. Ils contiennent seulement des définitions de types et aucun code d'implémentation, avec le nom des types correspondant aux noms de variables dans les fichiers JavaScript.

Le dépôt [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) est un projet dirigé par la communauté qui fournit des définitions TypeScript pour des milliers de bibliothèques JavaScript. Elles peuvent être installées avec npm, par exemple `npm install --save-dev @types/lodash`.

De nos jours, la plupart des bibliothèques sont directement écrites en TypeScript et fournissent leurs propres définitions TypeScript, donc vous n'avez pas à compter sur ce projet communautaire pour les fournir ; elles seront directement importées et utilisées dans votre IDE.
