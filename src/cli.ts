#!/usr/bin/env node
import { Commands } from './commands';
import PackageFileReader from './packageFileReader';

console.log('Generating commands ...');

PackageFileReader.GetInstallCommands()
  .then((alldependency: Commands[]) => {
    PackageFileReader.DisplayDependency(alldependency);
  })
  .then(() => console.log('Done!'))
  .catch(error => {
    console.error(error.message);
  });
