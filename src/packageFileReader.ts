import * as fs from 'fs';
import os from 'os';
import util from 'util';
import { colors } from './colorFormat';
import { Commands, DependencyType } from './commands';
import GetPackageRepo from './GetPackageRepo';
import packageInfo from './models/packageInfo';

const readFile = util.promisify(fs.readFile);

export default class PackageFileReader {
  static async GetPackageFile() {
    var obj = null;
    var data;
    try {
      data = await readFile('package.json', 'utf8');
    } catch (err) {
      throw err;
    }
    obj = JSON.parse(data);
    return obj;
  }

  static GetDependencies(
    obj: any,
    key: string,
    includeVersion: boolean = false
  ): Commands {
    let dependencies: string[] = [];
    let typeDependencies: string[] = [];
    let dependencyType: DependencyType;
    let commandObj;

    if (key.startsWith('dev')) {
      dependencyType = 'Dev Dependency';
    } else {
      dependencyType = 'Dependency';
    }

    if (!key || !obj[key]) {
      return new Commands([], [], dependencyType);
    }

    Object.keys(obj[key]).map((value, index) => {
      let dependencyValue = includeVersion
        ? value + '@' + obj[key][value]
        : value;

      if (value.startsWith('@types')) {
        typeDependencies.push(dependencyValue);
      } else {
        dependencies.push(dependencyValue);
      }
    });

    commandObj = new Commands(dependencies, typeDependencies, dependencyType);
    return commandObj;
  }

  static Log(message: any): void {
    message && console.log(message + os.EOL);
  }

  static async GetInstallCommands(
    includeVersion: boolean = false
  ): Promise<Commands[]> {
    var obj = await PackageFileReader.GetPackageFile();
    let alldependency: Commands[] = [];
    if (obj != null) {
      let devDependencies = PackageFileReader.GetDependencies(
        obj,
        'devDependencies',
        includeVersion
      );

      let dependencies = PackageFileReader.GetDependencies(
        obj,
        'dependencies',
        includeVersion
      );
      alldependency = [devDependencies, dependencies];
    }
    return alldependency;
  }

  public static DisplayDependency(commands: Commands[]) {
    if (commands.length == 0) {
      console.log(`No dependencies are installed`);
      return;
    }

    commands.forEach((command) => {
      let npmCommands = command.DepedencyCommand;
      if (npmCommands.length > 0) {
        console.log(colors.cyanUnderscoreFormat, command.dependencyType + ':');
        for (let index = 0; index < npmCommands.length; index++) {
          console.log(npmCommands[index]);
          console.log();
        }
        console.log();
      }
    });
  }

  static sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  static async doWork(iterator: any) {
    for (let [index, item] of iterator) {
      console.log({ index, item });
      return await item;
    }
  }

  static async showPackageInfo(commands: Commands[]) {
    if (commands.length == 0) {
      console.log(`No dependencies are installed`);
      return;
    }

    let packageInfoRequests: Promise<packageInfo>[] = [];

    commands.forEach((command) => {
      let npmCommands = command.Dependency;

      if (npmCommands.length > 0) {
        for (let index = 0; index < npmCommands.length; index++) {
          let npmPackage = npmCommands[index];
          let lastIndex = npmPackage.lastIndexOf('@');
          if (lastIndex < 0) {
            continue;
          }

          let name = npmPackage.substring(0, lastIndex);
          let version = npmPackage.substring(lastIndex + 1);
          if (
            version[0] == '^' ||
            version[0] == '~' ||
            version[0] == '>' ||
            version[0] == '<'
          ) {
            if (version[1] == '=') {
              version = version.substring(2);
            } else {
              version = version.substring(1);
            }
          } else if (version == '*' || version == 'latest') {
            version = '';
          }

          packageInfoRequests.push(
            GetPackageRepo(name, version, command.dependencyType)
          );
        }
      }
    });

    // const iterator = Array.from(packageInfoRequests).entries();
    // const workers = new Array(4).fill(iterator).map(this.doWork);
    // let packageInfo: packageInfo[] = await Promise.all(workers);

    let packageInfo = await Promise.all([...packageInfoRequests]);
    console.table(packageInfo);
  }
}
