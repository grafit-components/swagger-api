import { OpenAPIV3 } from 'openapi-types';
import { TagGroupItem } from '../../generate/endpoints';
import { Options } from '../../generate/options';
import { makeEndpoint } from './endpoint-template';

export function makeService(document: OpenAPIV3.Document, options: Options, groups: TagGroupItem[]) {
  const strings = [
    `import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
     import { Injectable } from '@angular/core';
     
    ${getJsDocForDocument(document)}
    @Injectable({ providedIn: 'root' })
    export class ${options.endpointsServiceName ?? 'Api'}Service {`,
  ];

  groups.forEach((group) => {
    strings.push(
      `${getJsDocForTag(document, group.tag)}
      ${makeEndpoint(options, group)}
      `,
    );
  });

  strings.push(`noCacheHeaders = new HttpHeaders({
                    'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
                });
  constructor(private http: HttpClient) {}    }
  
  export interface Options {
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  }
  `);

  return strings.join('\n');
}

export function getJsDocForDocument(document: OpenAPIV3.Document) {
  const desc = document.info.description ? `\n@description ${document.info.description}` : '';
  return document.info.title ? `/** ${document.info.title} ${desc}*/` : '';
}

export function getJsDocForTag(document: OpenAPIV3.Document, tagName: string) {
  const tag = document.tags?.find((t) => t.name === tagName);
  return tag?.description ? `/** ${tag.description} */` : '';
}
