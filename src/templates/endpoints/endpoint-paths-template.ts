import { TagGroupItem } from '../../generate/endpoints';
import { toCamelCase } from '../../utils/string-converters';

export function makePaths(tagGroupItem: TagGroupItem, endpointsUrlPrefix: string) {
  let controller = '';
  const tag = tagGroupItem.tag;

  const paths = new Set<string>();
  tagGroupItem.operations.forEach((operation) => {
    const path = operation.path;
    if (!controller && path.includes(`/${tag}/`)) {
      controller = `_controller: '${endpointsUrlPrefix}${path.split(`/${tag}/`)[0]}/${tag}', `;
    }
    paths.add(`${getPathName(tag, path)}: '${endpointsUrlPrefix}${path}'`);
  });

  return `_paths: { ${controller}${Array.from(paths).join(', ')} }`;
}
export function getPathName(tag: string, path: string) {
  if (path.includes(`/${tag}/`)) {
    const name = path.split(`/${tag}/`)[1].split('/')[0];
    return toCamelCase(name);
  } else {
    return path.replace(/\//g, '_').replace(/}/g, '$').replace(/-/g, '$').replace(/\{/g, '$');
  }
}
