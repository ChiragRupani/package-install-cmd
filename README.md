## Package Install Command generator (pic)

Read package.json file and generates npm install commands for installed packages. It generates seperate commands for dev dependency, dependency and types.

> Sample Output:

```
Generating commands ...
Dev Dependency:
npm i -D @angular-devkit/build-angular @angular/cli @angular/compiler-cli @angular/language-service axe-core codelyzer jasmine-core jasmine-spec-reporter karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter protractor ts-node tslint typescript

npm i -D @types/jasmine @types/jasminewd2 @types/node

Dependency:
npm i @angular/animations @angular/common @angular/compiler @angular/core @angular/forms @angular/http @angular/platform-browser @angular/platform-browser-dynamic @angular/router @ngrx/effects @ngrx/store bootstrap core-js rxjs zone.js

Done!
```

<hr/>

Usage as CLI:

> Installation

```sh
npm build   # Builds the project
npm pack    # Generate package in tgz format
npm install -g <path/to/tgz> # Provide path to tgz file generated in earlier step
```

> Use Command

```sh
# Navigate to folder containing package.json and execute below command:
pic
```

<hr/>

Usage as Library:

```TypeScript
import {
  Commands,
  DependencyType,
  PackageFileReader
} from 'package-install-cmd';

PackageFileReader.GetInstallCommands()
  .then((alldependency: Commands[]) => {
    PackageFileReader.DisplayDependency(alldependency);
  })
  .catch(error => {
    console.error(error.message);
  });
```
