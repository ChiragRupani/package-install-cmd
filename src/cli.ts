#!/usr/bin/env node
import { colors } from './colorFormat';
import { Commands } from './commands';
import PackageFileReader from './packageFileReader';

console.log(colors.GreenFormat, '[PIC] Generating commands ...');

// Get process.argv
let includeVersion = false;
let isListPackages = false;

if (process.argv.length > 2) {
  let versionArg = process.argv[2].toUpperCase();
  if (versionArg == '--list'.toUpperCase()) {
    isListPackages = true;
  } else if (
    versionArg == '--WithVersion'.toUpperCase() ||
    versionArg == '-WV'
  ) {
    includeVersion = true;
  }
}

function showCommands() {
  PackageFileReader.GetInstallCommands(includeVersion)
    .then((alldependency: Commands[]) => {
      PackageFileReader.DisplayDependency(alldependency);
    })
    .then(() => console.log(colors.GreenFormat, 'Done!'))
    .catch((error) => {
      console.error(error.message);
    });
}

function listPackages() {
  console.log(
    colors.GreenFormat,
    'Fetching package info from npm registry ...'
  );

  PackageFileReader.GetInstallCommands(true)
    .then((alldependency: Commands[]) => {
      PackageFileReader.showPackageInfo(alldependency);
    })
    .then(() => console.log(colors.GreenFormat, 'Done!'))
    .catch((error) => {
      console.error(error.message);
    });
}

if (isListPackages) {
  listPackages();
} else {
  showCommands();
}
