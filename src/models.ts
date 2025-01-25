interface DependencyInfo {
  name: string;
  version: string;
  isTypeDependency: boolean;
}

interface Dependencies {
  DevDependency: DependencyInfo[];
  Dependency: DependencyInfo[];
}

interface KeyValue {
  [key: string]: string;
}

export type DependencyType = "Dev Dependency" | "Dependency";

interface npmCommand {
  installCommand: string;

  packages: string;

  dependencyType: DependencyType;

  isTypes: boolean;
}

export type { Dependencies, DependencyInfo, KeyValue, npmCommand };
