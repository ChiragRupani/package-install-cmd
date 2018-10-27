#!/usr/bin/env node
import { colors } from './colorFormat';
import { Commands } from './commands';
import PackageFileReader from './packageFileReader';

console.log(colors.GreenFormat, '[PIC] Generating commands ...');

// Get process.argv
let includeVersion = false;
if (process.argv.length > 2) {
  let versionArg = process.argv[2].toUpperCase();
  if (versionArg == '--WithVersion'.toUpperCase() || versionArg == '-WV') {
    includeVersion = true;
  }
}

PackageFileReader.GetInstallCommands(includeVersion)
  .then((alldependency: Commands[]) => {
    PackageFileReader.DisplayDependency(alldependency);
  })
  .then(() => console.log(colors.GreenFormat, 'Done!'))
  .catch(error => {
    console.error(error.message);
  });
