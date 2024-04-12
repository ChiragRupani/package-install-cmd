#!/usr/bin/env node
import * as fs from "fs";
import path from "path";
import { colors } from "./colorFormat";
import { Commands } from "./commands";
import PackageFileReader from "./packageFileReader";

const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")
);

let version = packageJson.version;

console.log(colors.GreenFormat, `[PIC ${version}] Generating commands ...`);

let args = process.argv;
let includeVersion = false;
let listMode = false;

for (var i = 0; i < args.length; i++) {
  var arg = args[i];
  if (
    arg.toUpperCase() === "--WithVersion".toUpperCase() ||
    arg.toUpperCase() == "-WV"
  ) {
    includeVersion = true;
  } else if (
    arg.toUpperCase() == "--list".toUpperCase() ||
    arg.toUpperCase() == "-L"
  ) {
    listMode = true;
  }
}

PackageFileReader.GetInstallCommands(includeVersion, listMode)
  .then((alldependency: Commands[]) => {
    PackageFileReader.DisplayDependency(alldependency, listMode);
  })
  .then(() => console.log(colors.GreenFormat, "Done!"))
  .catch((error) => {
    console.error(error.message);
  });
