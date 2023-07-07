import { describe, expect, it } from "vitest";
import PackageFileReader from "../src/packageFileReader";

describe("Verify Depedencies", () => {
  it("Verify Dev Dependency", () => {
    // Arrange
    const packageObject = { devDependencies: { A: "1.0.1", B: "2.3" } };
    const key = "devDependencies";

    // Act
    let command = PackageFileReader.GetDependencies(packageObject, key);

    // Assert
    expect(command.dependencyType).equals("Dev Dependency");
    expect(command.Dependency).deep.equals(["A", "B"]);
    expect(command.TypesDependency).deep.equals([]);
  });

  it("Verify Dev Dependency Types", () => {
    // Arrange
    const packageObject = {
      devDependencies: { "@types/A": "1.0.1", "@types/B": "2.3" },
    };
    const key = "devDependencies";

    // Act
    let command = PackageFileReader.GetDependencies(packageObject, key);

    // Assert
    expect(command.dependencyType).equals("Dev Dependency");
    expect(command.Dependency).deep.equals([]);
    expect(command.TypesDependency).deep.equals(["@types/A", "@types/B"]);
  });

  it("Verify Dependency", () => {
    // Arrange
    const packageObject = { dependencies: { A: "1.0.1", B: "2.3" } };
    const key = "dependencies";

    // Act
    let command = PackageFileReader.GetDependencies(packageObject, key);

    // Assert
    expect(command.dependencyType).equals("Dependency");
    expect(command.Dependency).deep.equals(["A", "B"]);
    expect(command.TypesDependency).deep.equals([]);
  });

  it("Verify Dependency Types", () => {
    // Arrange
    const packageObject = {
      dependencies: { "@types/A": "1.0.1", "@types/B": "2.3" },
    };
    const key = "dependencies";

    // Act
    let command = PackageFileReader.GetDependencies(packageObject, key);

    // Assert
    expect(command.dependencyType).equals("Dependency");
    expect(command.Dependency).deep.equals([]);
    expect(command.TypesDependency).deep.equals(["@types/A", "@types/B"]);
  });

  it("Verify Dependency Types With Version", () => {
    // Arrange
    const packageObject = {
      dependencies: { "@types/A": "1.0.1", "@types/B": "2.3" },
    };
    const key = "dependencies";

    // Act
    let command = PackageFileReader.GetDependencies(packageObject, key, true);

    // Assert
    expect(command.dependencyType).equals("Dependency");
    expect(command.Dependency).deep.equals([]);
    expect(command.TypesDependency).deep.equals([
      "@types/A@1.0.1",
      "@types/B@2.3",
    ]);
  });
});
