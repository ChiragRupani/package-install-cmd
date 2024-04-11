#!/usr/bin/env node
import { version } from "../package.json";
import { colors } from "./colorFormat";
import { Commands } from "./commands";

import PackageFileReader from "./packageFileReader";

console.log(colors.GreenFormat, `[PIC ${version}] Generating commands ...`);

// Get process.argv
let includeVersion = false;
if (process.argv.length > 2) {
  let versionArg = process.argv[2].toUpperCase();
  if (versionArg == "--WithVersion".toUpperCase() || versionArg == "-WV") {
    includeVersion = true;
  }
}

let listMode = false;
if (process.argv.length > 3) {
  let versionArg = process.argv[3].toUpperCase();
  if (versionArg == "--list".toUpperCase() || versionArg == "-l") {
    listMode = true;
  }
}

PackageFileReader.GetInstallCommands(includeVersion, listMode)
  .then((alldependency: Commands[]) => {
    PackageFileReader.DisplayDependency(alldependency);
  })
  .then(() => console.log(colors.GreenFormat, "Done!"))
  .catch((error) => {
    console.error(error.message);
  });
