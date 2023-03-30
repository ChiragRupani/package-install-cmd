export type DependencyType = "Dev Dependency" | "Dependency";

export class Commands {
  public Dependency: string[];
  public TypesDependency: string[];
  public dependencyType: DependencyType;

  constructor(
    dependency: string[] = [],
    typesDependency: string[] = [],
    type: DependencyType
  ) {
    this.Dependency = dependency = null ? [] : dependency;
    this.TypesDependency = typesDependency = null ? [] : typesDependency;
    this.dependencyType = type;
  }

  get DependencyCommand(): string[] {
    let cmd = "npm i ";
    let commands: string[] = [];

    if (this.dependencyType == "Dev Dependency") {
      cmd += "-D ";
    }
    let dependenciesCmd = "";
    let typeDependenciesCmd = "";

    if (this.Dependency.length > 0) {
      dependenciesCmd = cmd + this.Dependency.join(" ");
      commands.push(dependenciesCmd);
    }

    if (this.TypesDependency.length > 0) {
      typeDependenciesCmd = cmd + this.TypesDependency.join(" ");
      commands.push(typeDependenciesCmd);
    }

    return commands;
  }
}
