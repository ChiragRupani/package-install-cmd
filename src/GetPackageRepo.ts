import myfetch from 'node-fetch';
import { DependencyType } from './commands';
import packageInfo from './models/packageInfo';

export default async function GetPackageRepo(
  name: string,
  version: string,
  dependencyType: DependencyType
) {
  let url = `https://registry.npmjs.org/${name}/${version}`;
  let data = await myfetch(url);
  let jsonData: packageInfo = await data.json();
  return new packageInfo(jsonData, dependencyType);
}
