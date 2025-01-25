import os from "node:os";
import { colors } from "./colorFormat.ts";
import {
  Dependencies,
  DependencyInfo,
  DependencyType,
  npmCommand,
} from "./models.ts";

export class Commands {
  public static GetDependencyCommand(
    alldependency: Dependencies,
    listMode: boolean,
    includeVersion: boolean
  ): npmCommand[] {
    let result: npmCommand[] = [];
    let maxLength = 0;
    if (listMode) {
      maxLength = Math.max(
        maxLength,
        Commands.GetMaxLength(alldependency.DevDependency)
      );
      maxLength = Math.max(
        maxLength,
        Commands.GetMaxLength(alldependency.Dependency)
      );

      maxLength += 20;
    }

    if (alldependency.DevDependency.length > 0) {
      let installCommand = "npm i -D ";

      const packageCommands = Commands.GetDisplayDependencyAndTypes(
        alldependency.DevDependency,
        listMode,
        includeVersion,
        installCommand,
        "Dev Dependency",
        maxLength
      );

      result.push(...packageCommands);
    }

    if (alldependency.Dependency.length > 0) {
      let installCommand = "npm i ";

      const packageCommands = Commands.GetDisplayDependencyAndTypes(
        alldependency.Dependency,
        listMode,
        includeVersion,
        installCommand,
        "Dependency",
        maxLength
      );

      result.push(...packageCommands);
    }

    return result;
  }

  private static GetDisplayDependencyAndTypes(
    dependencyInfo: DependencyInfo[],
    listMode: boolean,
    includeVersion: boolean,
    installCommand: string,
    dependencyType: DependencyType,
    maxLengthForListName: number
  ): npmCommand[] {
    let packageCommands: npmCommand[] = [];

    let dependencyWithoutType = dependencyInfo
      .filter((x) => !x.isTypeDependency)
      .map((dependency) => {
        return Commands.GetDisplayDependency(
          listMode,
          includeVersion,
          dependency,
          maxLengthForListName
        );
      })
      .join(listMode ? os.EOL : " ");

    if (dependencyWithoutType.length > 0) {
      packageCommands.push({
        packages: dependencyWithoutType,
        installCommand,
        dependencyType,
        isTypes: false,
      });
    }

    let dependencyWithType = dependencyInfo
      .filter((x) => x.isTypeDependency)
      .map((dependency) => {
        return Commands.GetDisplayDependency(
          listMode,
          includeVersion,
          dependency,
          maxLengthForListName
        );
      })
      .join(listMode ? os.EOL : " ");

    if (dependencyWithType.length > 0) {
      packageCommands.push({
        packages: dependencyWithType,
        installCommand,
        dependencyType,
        isTypes: true,
      });
    }

    return packageCommands;
  }

  private static GetDisplayDependency(
    listMode: boolean,
    includeVersion: boolean,
    dependency: DependencyInfo,
    maxLengthForListName: number
  ) {
    let displayDependency;
    if (listMode) {
      displayDependency = includeVersion
        ? dependency.name.padEnd(maxLengthForListName) +
          " " +
          dependency.version
        : dependency.name;
    } else {
      displayDependency = includeVersion
        ? dependency.name + "@" + dependency.version
        : dependency.name;
    }

    return displayDependency;
  }

  private static GetMaxLength(dependencyInfo: DependencyInfo[]): number {
    let maxLength = 0;
    for (let dependency of dependencyInfo) {
      maxLength = Math.max(maxLength, dependency.name.length);
    }

    return maxLength;
  }

  public static DisplayDependency(
    commands: npmCommand[],
    listMode: boolean
  ): void {
    if (commands.length == 0) {
      console.log(colors.Yellow, `No dependencies are installed`);
      return;
    }

    for (let command of commands) {
      console.log(
        colors.GreenUnderscoreFormat,
        command.dependencyType + (command.isTypes ? " (@types)" : "") + ":"
      );

      if (listMode) {
        let index = 0;
        let packages = command.packages.split(os.EOL);
        for (let currentPackage of packages) {
          console.log(
            index % 2 == 0 ? colors.LightBlue : colors.LightCyan,
            currentPackage
          );

          index++;
        }
      } else {
        console.log(command.installCommand + command.packages);
      }

      console.log();
    }
  }
}
