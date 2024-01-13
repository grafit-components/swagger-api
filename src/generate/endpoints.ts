import { OpenAPIV3 } from 'openapi-types';
import { makeEndpoint } from '../templates/endpoint-template';
import { Options } from './options.js';

export function makeEndpoints(document: OpenAPIV3.Document, options: Options) {
  const strings = [
    `import { HttpClient } from '@angular/common/http';
     import { Injectable } from '@angular/core';
     
    ${getJsDocForDocument(document)}
    @Injectable({ providedIn: 'root' })
    class ${options.endpointsServiceName ?? 'Api'}Service {`,
  ];

  const groups = makeTagGroups(document);
  groups.forEach((group) => {
    strings.push(
      `${getJsDocForTag(document, group.tag)}
      ${makeEndpoint(group, options.endpointsUrlPrefix)}
      `,
    );
  });

  strings.push(`constructor(private http: HttpClient) {}    }`);

  return strings.join('\n');
}

export function getJsDocForDocument(document: OpenAPIV3.Document) {
  const desc = document.info.description
    ? `\n@description ${document.info.description}`
    : '';
  return document.info.title ? `/** ${document.info.title} ${desc}*/` : '';
}

export function getJsDocForTag(document: OpenAPIV3.Document, tagName: string) {
  const tag = document.tags?.find((t) => t.name === tagName);
  return tag?.description ? `/** ${tag.description} */` : '';
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

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
//
// /** Test */
// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   /** Справочники ДО. */
//   readonly affiliateDictionary = {
//     /** Urls in controllers. */
//     _paths: {
//       /** Url controller. */
//       controller: '/eraRepairs/AffiliateDictionary',
//
//       /** Получить справочник месторождений ДО пользователя. */
//       getFields: '/eraRepairs/AffiliateDictionary/GetFields',
//     },
//   } as const;
//
//   constructor(private http: HttpClient) {
//     const u = this.affiliateDictionary._paths.controller;
//   }
// }
