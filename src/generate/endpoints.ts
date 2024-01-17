import { OpenAPIV3 } from 'openapi-types';
import { makeService } from '../templates/endpoints/service-template';
import { Options } from './options.js';

export function makeEndpoints(document: OpenAPIV3.Document, options: Options) {
  const groups = makeTagGroups(document);

  return makeService(document, options, groups);
}

export function makeTagGroups(document: OpenAPIV3.Document) {
  const pathsObj = document.paths;
  const paths = Object.keys(pathsObj);

  const tagGroups = paths.reduce((groups, path) => {
    const pathObj = pathsObj[path]!;
    let group: TagGroupItem | undefined = undefined;
    const methods = Object.keys(pathObj) as OpenAPIV3.HttpMethods[];

    methods.forEach((method) => {
      const operationObject = pathObj[method]!;
      const tag = operationObject.tags?.at(0);
      if (!tag) {
        throw 'Tag in path required';
      }

      if (!group || group.tag !== tag) {
        group = groups.find((g) => g.tag === tag);
        if (!group) {
          group = {
            tag,
            operations: [],
          };
          groups.push(group);
        }
      }

      group.operations.push({
        path,
        method,
        operationObject,
        appendMethodToName: methods.length > 1,
      });
    });

    return groups;
  }, [] as TagGroupItem[]);

  return tagGroups;
}

export interface TagGroupItem {
  tag: string;
  operations: TagOperation[];
}

export interface TagOperation {
  path: string;
  method: OpenAPIV3.HttpMethods;
  operationObject: OpenAPIV3.OperationObject;
  appendMethodToName: boolean;
}
