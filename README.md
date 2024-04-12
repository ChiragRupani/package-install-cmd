## Package Install Command generator (PIC)

[![npm (scoped)](https://img.shields.io/npm/v/@chiragrupani/package-install-cmd.svg?style=flat-square)](https://www.npmjs.com/package/@chiragrupani/package-install-cmd) [![npm](https://img.shields.io/npm/dt/@chiragrupani/package-install-cmd.svg?style=flat-square)](https://www.npmjs.com/package/@chiragrupani/package-install-cmd)

[![Build Status](https://dev.azure.com/chiragrupani/Package%20Install%20Command/_apis/build/status/ChiragRupani.package-install-cmd?branchName=master)](https://github.com/ChiragRupani/package-install-cmd)

Read package.json file and generates npm install commands for installed packages. It generates seperate commands for dev dependency, dependency and types.

Available in [NPM Registry](https://www.npmjs.com/package/@chiragrupani/package-install-cmd)

> Installation

```bash
npm i -g @chiragrupani/package-install-cmd
```

> Sample Output from Angular project:

```
[PIC] Generating commands ...
Dev Dependency:
npm i -D @angular-devkit/build-angular @angular/cli @angular/compiler-cli @angular/language-service codelyzer jasmine-core
jasmine-spec-reporter karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter protractor ts-node tslint typescript

npm i -D @types/node @types/jasmine @types/jasminewd2


Dependency:
npm i @angular/animations @angular/common @angular/compiler @angular/core @angular/forms @angular/platform-browser @angular/platform-browser-dynamic @angular/router core-js rxjs tslib zone.js


Done!
```

<hr/>

Usage as CLI:

> Use Command

```sh
# Navigate to folder containing package.json and execute below command:
pic
```

Get version details along with packages

```sh
# Navigate to folder containing package.json and execute below command:
pic --withversion
```

OR

```sh
# Navigate to folder containing package.json and execute below command:
pic -wv
```

Get output in list format

```sh
# Navigate to folder containing package.json and execute below command:
pic --withversion --list
```

or

```sh
# Navigate to folder containing package.json and execute below command, if version is not required:
pic --list
```

OR

```sh
# Navigate to folder containing package.json and execute below command:
pic -l
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

## Build from Source

In case if you want to build package from github source

```sh
# Clone the project
npm run build   # Builds the project
npm pack        # Generate package in tgz format
npm install -g <path/to/tgz> # Provide path to tgz file generated in earlier step
```
