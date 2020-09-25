import { expect } from 'chai';
import PackageFileReader from '../src/packageFileReader';

describe('Verify List', () => {
  it('verify package details', () => {
    // Arrange
    const packageObject = { dependencies: { A: '1.0.1', B: '2.3' } };
    const key = 'dependencies';

    // Act
    let command = PackageFileReader.GetDependencies(packageObject, key);

    // Assert
    expect(command.dependencyType).equals('Dependency');
    expect(command.Dependency).deep.equals(['A', 'B']);
    expect(command.TypesDependency).deep.equals([]);
  });
});
