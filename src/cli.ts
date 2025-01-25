#!/usr/bin/env node
import * as fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { colors } from "./colorFormat.ts";
import { Commands } from "./commands.ts";
import { PackageFileReader } from "./packageFileReader.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")
);

let version = packageJson.version;

const helptext = {
  "--WithVersion (-wv)": "Includes version of the package",
  "--list (-L)": "Lists the packages line by line",
};

let args = process.argv;
let includeVersion = false;
let listMode = false;

if (args.some((x) => x == "--help" || x == "-h")) {
  let maxLength = 22;
  for (var key of Object.keys(helptext)) {
    maxLength = Math.max(maxLength, key.length);
  }

  console.log(colors.Green, `[PIC ${version}] Help`);

  for (var kv of Object.entries(helptext)) {
    console.log(colors.Blue, `${kv[0].padEnd(maxLength)} ${kv[1]}`);
  }
} else {
  run();
}

function run() {
  console.log(colors.Green, `[PIC ${version}] Generating commands ...`);
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

  PackageFileReader.GetPackageInstallCommands()
    .then((alldependency) => {
      let npmCommands = Commands.GetDependencyCommand(
        alldependency,
        listMode,
        includeVersion
      );
      Commands.DisplayDependency(npmCommands, listMode);
    })
    .then(() => console.log(colors.Green, "Done!"))
    .catch((error) => {
      console.error(colors.Red, error.message);
    });
}
