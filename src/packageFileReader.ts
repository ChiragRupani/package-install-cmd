import * as fs from "fs";
import os from "os";
import util from "util";
import { colors } from "./colorFormat";
import { Commands, DependencyType } from "./commands";

const readFile = util.promisify(fs.readFile);

export default class PackageFileReader {
  private static async GetPackageFile() {
    var obj = null;
    var data;
    try {
      data = await readFile("package.json", "utf8");
    } catch (err) {
      throw err;
    }
    obj = JSON.parse(data);
    return obj;
  }

  public static GetDependencies(
    obj: any,
    key: string,
    includeVersion: boolean,
    listMode: boolean
  ): Commands {
    let dependencies: string[] = [];
    let typeDependencies: string[] = [];
    let dependencyType: DependencyType;

    if (key.startsWith("dev")) {
      dependencyType = "Dev Dependency";
    } else {
      dependencyType = "Dependency";
    }

    if (!key || !obj[key]) {
      return new Commands([], [], dependencyType);
    }

    Object.keys(obj[key]).map((value, index) => {
      let dependencyValue;

      if (listMode) {
        dependencyValue = includeVersion
          ? value.padEnd(50, " ") + obj[key][value]
          : value;
      } else {
        dependencyValue = includeVersion
          ? value + "@" + obj[key][value]
          : value;
      }

      if (value.startsWith("@types")) {
        typeDependencies.push(dependencyValue);
      } else {
        dependencies.push(dependencyValue);
      }
    });

    let commandObj = new Commands(
      dependencies,
      typeDependencies,
      dependencyType
    );
    return commandObj;
  }

  private static Log(message: any): void {
    message && console.log(message + os.EOL);
  }

  public static async GetInstallCommands(
    includeVersion: boolean,
    listMode: boolean
  ): Promise<Commands[]> {
    var obj = await PackageFileReader.GetPackageFile();
    let alldependency: Commands[] = [];
    if (obj != null) {
      let devDependencies = PackageFileReader.GetDependencies(
        obj,
        "devDependencies",
        includeVersion,
        listMode
      );

      let dependencies = PackageFileReader.GetDependencies(
        obj,
        "dependencies",
        includeVersion,
        listMode
      );
      alldependency = [devDependencies, dependencies];
    }
    return alldependency;
  }

  public static DisplayDependency(commands: Commands[], listMode: boolean) {
    if (commands.length == 0) {
      console.log(`No dependencies are installed`);
      return;
    }

    commands.forEach((command) => {
      let npmCommands = listMode
        ? command.ListDependencyCommand
        : command.DependencyCommand;
      if (npmCommands.length > 0) {
        console.log(colors.cyanUnderscoreFormat, command.dependencyType + ":");
        for (let index = 0; index < npmCommands.length; index++) {
          console.log(npmCommands[index]);
          if (!listMode) {
            console.log();
          }
        }
        console.log();
      }
    });
  }
}
