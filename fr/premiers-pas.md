# Premiers pas

## Ajouter TypeScript à un projet

### Node.js, Bun, Deno

Commençons par la bonne nouvelle. Si vous voulez utiliser TypeScript avec un runtime JavaScript comme [Node.js](https://nodejs.org) (version 23 minimum), [Bun](https://bun.sh) ou [Deno](https://deno.land), ils ont tous un support natif aujourd'hui 🥳

![Support TypeScript dans Node.js, Bun et Deno](../assets/all-love-typescript.png)

Donc vous n'avez rien de particulier à faire pour utiliser TypeScript dans ces environnements. Créez simplement vos fichiers `.ts` et exécutez votre code avec le runtime que vous voulez.

::: warning

**Toutes les fonctionnalités TypeScript ne sont pas supportées par ces runtimes**. Seule la **syntaxe effaçable** est supportée, c'est-à-dire les parties de la syntaxe TypeScript qui peuvent être supprimées sans changer le comportement du code. Cela exclut quelques fonctionnalités comme les décorateurs, les espaces de noms et les enums.

C'est pourquoi **nous ne couvrirons pas ces fonctionnalités** pendant cette formation. Pour en savoir plus sur ces fonctionnalités laissées de côté, vous pouvez aller à la section [Pour aller plus loin](/to-go-deeper).

:::

### Navigateur

Si vous écrivez du code qui s'exécute dans un navigateur web cependant, vous devrez compiler votre code TypeScript en JavaScript. C'est parce que les navigateurs ne comprennent pas directement TypeScript car ce n'est pas partie des standards web.

Il y a un compilateur officiel, `tsc`, et d'autres alternatives plus rapides comme `esbuild`, `swc` ou `oxc` qui sont directement inclus dans de nombreux frameworks web. Tous ces compilateurs s'exécutent dans des runtimes JavaScript comme Node.js, Deno ou Bun.

#### Utilisation du compilateur officiel tsc

Nous supposerons que vous utilisez Node.js et NPM dans votre projet. Si ce n'est pas le cas, vous pouvez installer Node.js depuis [nodejs.org](https://nodejs.org) et NPM sera installé avec.

Installez le compilateur TypeScript dans votre projet :

```bash
npm install typescript --save-dev
```

Ensuite vous pouvez compiler votre code TypeScript avec la commande `tsc` :

```bash
npx tsc
```

Cela cherchera un fichier `tsconfig.json` dans votre projet et compilera tout votre code TypeScript selon les paramètres de ce fichier. Chaque fichier `.ts` individuel sera compilé en un fichier `.js` avec le même nom.

Vous pouvez aussi spécifier un fichier à compiler :

```bash
# Émet du JS pour juste le index.ts avec les paramètres par défaut du compilateur
npx tsc index.ts
# Émet du JS pour tous les fichiers .ts dans le dossier src, avec les paramètres par défaut
npx tsc src/*.ts
```

Puisque vous allez compiler votre code TypeScript à chaque fois que vous le modifiez, vous pourriez vouloir ajouter un flag `watch` à la commande `tsc` qui recompile automatiquement votre code à chaque changement :

```bash
npx tsc --watch
```

Et vous pouvez aussi l'ajouter à la section scripts npm de votre `package.json` :

```json
{
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch"
  }
}
```

Ensuite vous pouvez exécuter `npm run watch` pour compiler votre code TypeScript à chaque fois que vous le modifiez, et ajouter `npm run build` à votre pipeline CI/CD pour compiler votre code avant de le déployer.

#### Utilisation de Vite, un outil de build tout-en-un

Avec [Vite](https://vitejs.dev), vous pouvez rapidement configurer un environnement de développement pour votre projet TypeScript. Vite fournit un processus de build rapide et efficace, exploitant le support natif des modules ES et d'autres fonctionnalités avancées.

Pour commencer à utiliser Vite avec TypeScript, suivez ces étapes :

1. Initialisez un projet Vite avec le template vanilla (sans framework) TypeScript :

   ```bash
   npm init vite@latest my-app --template vanilla-ts
   cd my-app
   npm install
   ```

2. Exécutez le serveur de développement :

   ```bash
   npm run dev
   ```

3. Vite se chargera de compiler vos fichiers TypeScript et de recharger le navigateur lors des changements.

::: info

Vite utilise `esbuild` sous le capot pour compiler TypeScript. C'est très rapide, mais esbuild ne valide pas vos types, il se contente de supprimer les annotations. Donc vous devez soit exécuter `tsc` pour faire ce travail de vérification de type, soit compter sur votre IDE pour le faire pour vous.

:::

## Support dans les frameworks web

La plupart des frameworks web supportent TypeScript et sont même écrits en TypeScript eux-mêmes !

![Support TypeScript dans les frameworks web](../assets/frameworks-love-typescript.png)

Et tous ces frameworks recommandent Vite comme leur outil de build, donc vous devriez être prêt ! Vous pouvez utiliser un des [templates Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite#scaffolding-your-first-vite-project) pour démarrer un nouveau projet TypeScript avec le framework de votre choix.

## Support IDE

La plupart des IDE populaires gèrent parfaitement TypeScript. [Visual Studio Code](https://code.visualstudio.com) est le plus populaire et a le meilleur support pour TypeScript, car les deux sont la propriété de Microsoft. [Webstorm](https://www.jetbrains.com/webstorm/) est aussi un bon choix si vous préférez un IDE plus complet dans l'écosystème Jetbrains.

## TSConfig

Le fichier `tsconfig.json` est le fichier de configuration du compilateur TypeScript. Il est utilisé pour spécifier les options de compilation et d'autres paramètres pour le compilateur TypeScript. Ce fichier doit être situé dans le dossier racine de votre projet.

Voici une configuration de base pour votre fichier `tsconfig.json` recommandée par Matt Pocock, un devrel TypeScript et créateur de contenu : [https://www.totaltypescript.com/tsconfig-cheat-sheet](The TSConfig Cheat Sheet by Matt Pocock)

Les paramètres les plus importants pour tous les projets sont ceux-ci :

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "moduleDetection": "force",
    "verbatimModuleSyntax": true
  }
}
```

::: info

"es2022" peut être remplacé par "esnext" si vous voulez utiliser la dernière version d'ECMAScript supportée par TypeScript. Parce qu'ECMAScript évolue avec le temps, cette valeur de configuration ne correspondra pas à la même chose d'une année à une autre, donc généralement les gens préfèrent la définir comme une valeur statique pour rendre les mises à jour plus prévisibles.

:::

## Checkpoint : exécutez votre premier programme TypeScript

Installez la dernière version de [Node.js](https://nodejs.org) si vous ne l'avez pas déjà fait. [Bun](https://bun.sh) ou [Deno](https://deno.land) peuvent aussi être utilisés, mais dans cet exemple nous utiliserons Node.js.

Ensuite installez TypeScript globalement pour pouvoir utiliser la commande `tsc` :

```bash
npm install -g typescript
```

Créez un fichier nommé `hello.ts` avec le contenu suivant :

```typescript
const greeting: string = "Hello, TypeScript!";
console.log(greeting);
```

Ensuite exécutez la commande suivante pour le compiler en JavaScript :

```bash
tsc hello.ts
```

Regardez le fichier `hello.js` généré dans le même dossier. Il devrait ressembler à ceci :

```javascript
var greeting = "Hello, TypeScript!";
console.log(greeting);
```

Ce code JavaScript généré peut être exécuté avec Node.js ou dans un navigateur web. Mais depuis début 2025, vous n'avez pas besoin de compiler votre code TypeScript pour l'exécuter avec Node.js, Bun ou Deno ! Vous pouvez juste exécuter le fichier `.ts` directement :

```bash
node hello.ts
```


*Bonus*: changer le contenu du script en ceci :

```typescript
function greet(message){
  console.log(message)
}

greet("Hello, TypeScript!");
```

Notez comment l'IDE ne montre pas d'erreur pour le paramètre `message` manquant de type, mais peut vous avertir qu'il est implicitement résolu comme type `any` (nous verrons plus tard de quoi il s'agit). Maintenant, créez un fichier `tsconfig.json` dans le même dossier avec le contenu suivant :

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

L'avertissement devient maintenant une erreur et le compilateur ne vous laissera pas compiler le code tant que vous ne l'aurez pas corrigé. Vous pouvez le corriger en ajoutant une annotation de type au paramètre `message` :

```typescript
function greet(message: string){
  console.log(message);
}
```

Le mode strict que vous venez d'activer est une bonne pratique pour tous les projets TypeScript, car il vous aide à attraper les erreurs de type et à écrire un code plus sûr. Vous pouvez en savoir plus sur le mode strict dans la [documentation officielle](https://www.typescriptlang.org/tsconfig#strict).