import * as fs from "node:fs";
import util from "node:util";
import type { Dependencies, DependencyInfo, KeyValue } from "./models.ts";

const readFile = util.promisify(fs.readFile);

export class PackageFileReader {
  private static async GetPackageFile(): Promise<any> {
    var obj = null;
    var data;
    try {
      data = await readFile("package.json", "utf8");
    } catch (err) {
      console.log(err);
      throw err;
    }
    obj = JSON.parse(data);
    return obj;
  }

  public static async GetPackageInstallCommands(): Promise<Dependencies> {
    var packageFile = await PackageFileReader.GetPackageFile();
    let alldependency: Dependencies = { Dependency: [], DevDependency: [] };

    var keys = ["dependencies", "devDependencies"];
    for (let key of keys) {
      let dependencyObj = packageFile[key] as KeyValue;
      let dependency = new Array<DependencyInfo>();

      if (dependencyObj) {
        Object.entries(dependencyObj).forEach((val) => {
          let name = val[0];
          let version = val[1];
          let isTypeDependency = val[0].startsWith("@types");
          dependency.push({ name, version, isTypeDependency });
        });

        dependency.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (key === keys[0]) {
        alldependency.Dependency = dependency;
      } else {
        alldependency.DevDependency = dependency;
      }
    }

    return alldependency;
  }
}
