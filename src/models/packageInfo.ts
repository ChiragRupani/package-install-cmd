import URL from 'url';
import { DependencyType } from '../commands';

export default class packageInfo {
  name!: string;
  license!: string;
  version!: string;
  repository?: repositoryInfo;
  dependencyType!: string;
  repositoryURL?: string;
  author!: any;

  constructor(info: packageInfo, dependencyType: DependencyType) {
    let newObj: packageInfo = {
      name: info.name,
      license: info.license,
      version: info.version,
      repositoryURL: parseRepoURL(info.repository?.url ?? ''),
      dependencyType: dependencyType,
      author: info.author.name,
    };

    return newObj;
  }
}

export interface repositoryInfo {
  type: string;
  url: string;
}

function parseRepoURL(repoURL: string) {
  let url = URL.parse(repoURL);
  let parsedURL = 'https://' + url.hostname + url.path;
  let lastIndex = parsedURL.lastIndexOf('.git');
  if (lastIndex >= 0) {
    parsedURL = parsedURL.substring(0, lastIndex);
  }
  return parsedURL;
}
