import os from "node:os";
import { describe, expect, test } from "vitest";
import { Commands } from "../src/commands";
import { Dependencies } from "../src/models";

describe("Verify Commands", () => {
  test("Verify display when there are no dependency", async () => {
    // Arrange
    const alldependency: Dependencies = { Dependency: [], DevDependency: [] };

    // Act
    const commands = Commands.GetDependencyCommand(alldependency, false, false);

    // Assert
    expect(commands).toEqual([]);
  });

  test("Verify display when there is only dev dependency", async () => {
    // Arrange
    const alldependency: Dependencies = {
      Dependency: [],
      DevDependency: [{ name: "A", version: "1.1", isTypeDependency: false }],
    };

    // Act
    const commands = Commands.GetDependencyCommand(alldependency, false, false);

    // Assert
    expect(commands).toEqual([
      {
        dependencyType: "Dev Dependency",
        installCommand: "npm i -D ",
        packages: "A",
        isTypes: false,
      },
    ]);
  });

  test("Verify display when there is only dependency", async () => {
    // Arrange
    const alldependency: Dependencies = {
      DevDependency: [],
      Dependency: [{ name: "A", version: "1.1", isTypeDependency: false }],
    };

    // Act
    const commands = Commands.GetDependencyCommand(alldependency, false, false);

    // Assert
    expect(commands).toEqual([
      {
        dependencyType: "Dependency",
        installCommand: "npm i ",
        packages: "A",
        isTypes: false,
      },
    ]);
  });

  test("Verify display when there is only type dev dependency", async () => {
    // Arrange
    const alldependency: Dependencies = {
      Dependency: [],
      DevDependency: [
        { name: "@types/A", version: "1.1", isTypeDependency: true },
      ],
    };

    // Act
    const commands = Commands.GetDependencyCommand(alldependency, false, false);

    // Assert
    expect(commands).toEqual([
      {
        dependencyType: "Dev Dependency",
        installCommand: "npm i -D ",
        packages: "@types/A",
        isTypes: true,
      },
    ]);
  });

  test("Verify display when there is only type dependency", async () => {
    // Arrange
    const alldependency: Dependencies = {
      DevDependency: [],
      Dependency: [
        { name: "@types/A", version: "1.1", isTypeDependency: true },
      ],
    };

    // Act
    const commands = Commands.GetDependencyCommand(alldependency, false, false);

    // Assert
    expect(commands).toEqual([
      {
        dependencyType: "Dependency",
        installCommand: "npm i ",
        packages: "@types/A",
        isTypes: true,
      },
    ]);
  });

  test("Verify display when in list mode and with version", async () => {
    // Arrange
    const alldependency: Dependencies = {
      DevDependency: [
        { name: "@types/C", version: "6", isTypeDependency: true },
        { name: "D", version: "7.2", isTypeDependency: false },
      ],
      Dependency: [
        { name: "A", version: "1.1", isTypeDependency: false },
        { name: "B", version: "2.1", isTypeDependency: false },
      ],
    };

    // Act
    const commands = Commands.GetDependencyCommand(alldependency, true, true);

    // Assert
    expect(
      commands.map((x) => x.packages).map((x) => x.replace(/[ \t]+/g, " "))
    ).toEqual(["D 7.2", "@types/C 6", "A 1.1" + os.EOL + "B 2.1"]);
  });
});
