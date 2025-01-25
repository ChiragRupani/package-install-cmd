import { describe, expect, test } from "vitest";
import { PackageFileReader } from "../src/packageFileReader";

describe("Verify Depedencies", () => {
  test("Verify Dev Dependency", async () => {
    // Arrange
    const mockPackageFile = { devDependencies: { A: "1.0.1", B: "2.3" } };

    PackageFileReader["GetPackageFile"] = () =>
      Promise.resolve(mockPackageFile);

    // Act
    let command = await PackageFileReader.GetPackageInstallCommands();

    // Assert
    expect(command).toEqual({
      DevDependency: [
        { name: "A", version: "1.0.1", isTypeDependency: false },
        { name: "B", version: "2.3", isTypeDependency: false },
      ],
      Dependency: [],
    });
  });

  test("Verify Dev Dependency Types", async () => {
    // Arrange
    const mockPackageFile = {
      devDependencies: { "@types/A": "1.0.1", "@types/B": "2.3" },
    };
    PackageFileReader["GetPackageFile"] = () =>
      Promise.resolve(mockPackageFile);

    // Act
    let command = await PackageFileReader.GetPackageInstallCommands();

    // Assert
    expect(command).toEqual({
      DevDependency: [
        { name: "@types/A", version: "1.0.1", isTypeDependency: true },
        { name: "@types/B", version: "2.3", isTypeDependency: true },
      ],
      Dependency: [],
    });
  });

  test("Verify Dependency", async () => {
    // Arrange
    const mockPackageFile = { dependencies: { A: "1.0.1", B: "2.3" } };
    PackageFileReader["GetPackageFile"] = () =>
      Promise.resolve(mockPackageFile);

    // Act
    let command = await PackageFileReader.GetPackageInstallCommands();

    // Assert
    expect(command).toEqual({
      Dependency: [
        { name: "A", version: "1.0.1", isTypeDependency: false },
        { name: "B", version: "2.3", isTypeDependency: false },
      ],
      DevDependency: [],
    });
  });

  test("Verify dependency type", async () => {
    // Arrange
    const mockPackageFile = {
      dependencies: { "@types/A": "1.0.1", "@types/B": "2.3" },
    };
    PackageFileReader["GetPackageFile"] = () =>
      Promise.resolve(mockPackageFile);

    // Act
    let command = await PackageFileReader.GetPackageInstallCommands();

    // Assert
    expect(command).toEqual({
      Dependency: [
        { name: "@types/A", version: "1.0.1", isTypeDependency: true },
        { name: "@types/B", version: "2.3", isTypeDependency: true },
      ],
      DevDependency: [],
    });
  });
});
