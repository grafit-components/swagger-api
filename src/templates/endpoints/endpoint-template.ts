import { TagGroupItem, TagOperation } from '../../generate/endpoints';
import { Options } from '../../generate/options';
import { toCamelCase, toPascalCase } from '../../utils/string-converters';
import { getJsDocBody, getMethodBody } from './endpoint-body-template';
import { getJsDocParams, getMethodParams, getQueryParams } from './endpoint-params-template';
import { makePaths } from './endpoint-paths-template';
import { getMethodType } from './endpoint-response-template';

export function makeEndpoint(options: Options, tagGroupItem: TagGroupItem) {
  const endpointsUrlPrefix = options.endpointsUrlPrefix ?? 'api';
  const tag = tagGroupItem.tag;
  const methods = tagGroupItem.operations.map((operation) => {
    if (!operation.path.includes(`/${tag}/`)) {
      // Пропускаются все роуты которые не содержат в пути тег (скорее всего они избыточны)
      console.log(`Skip operation: ${operation.path}`);
      return '';
    }
    return getMethod(options, tag, operation, endpointsUrlPrefix);
  });
  const methodStr = methods.filter((f) => f).join('\n\n');
  const paths = makePaths(tagGroupItem, endpointsUrlPrefix);
  const controllerName = toCamelCase(tagGroupItem.tag);

  return `readonly ${controllerName} = {
  ${methodStr}
  ${paths}
  } as const;`;
}

export function getMethodName(tag: string, operation: TagOperation) {
  const name = operation.path.split(`${tag}/`)[1].split('/')[0];
  return `${toCamelCase(name)}${operation.appendMethodToName ? toPascalCase(operation.method) : ''}`;
}

export function getMethod(options: Options, tag: string, operation: TagOperation, endpointsUrlPrefix: string) {
  const optionsArr = [];
  const url = endpointsUrlPrefix + operation.path.replace(/\{/g, '${');

  const params = getMethodParams(options, operation.operationObject.parameters);
  if (params) {
    const paramInOptions = getQueryParams(operation.operationObject.parameters);
    if (paramInOptions) {
      optionsArr.push(paramInOptions);
    }
  }

  const body = getMethodBody(options, operation.operationObject.requestBody);
  if (body) {
    optionsArr.push('body');
  }
  if (operation.method === 'get') {
    optionsArr.push(`headers: _noCache ? this.noCacheHeaders : undefined`);
  }
  let additionalParam = operation.method === 'get' ? '_noCache=false, ' : '';
  let withOptions = false;

  let methodType = getMethodType(options, operation.operationObject.responses);
  switch (methodType) {
    case '':
      withOptions = true;
      additionalParam += '_options?: Options';
      optionsArr.push('..._options');
      break;
    case '<string>':
      methodType = '';
      optionsArr.push(`responseType: 'text'`);
      break;
  }

  const optionsStr = optionsArr.length ? `, { ${optionsArr.join(', ')} }` : '';

  const request = `this.http.request${methodType}('${operation.method}', \`${url}\`${optionsStr})`;

  return `${getMethodJsDoc(operation, withOptions)}
    ${getMethodName(tag, operation)}: (${params}${body}${additionalParam}) => ${request},`;
}

export function getMethodJsDoc(operation: TagOperation, withOptions: boolean) {
  const summary = operation.operationObject.summary ? `${operation.operationObject.summary}\n` : '';
  const description = operation.operationObject.description
    ? `\n@description ${operation.operationObject.description}\n`
    : '';
  const deprecated = operation.operationObject.deprecated ? '\n@deprecated\n' : '';
  const request = `\n@request ${operation.method}: ${operation.path}\n`;
  const params = getJsDocParams(operation.operationObject.parameters);
  const body = getJsDocBody(operation.operationObject.requestBody);
  return `/** ${summary}${description}${deprecated}${request}${params}${body}
   ${operation.method === 'get' ? '@param _noCache Ignore cache.\n' : ''}${
     withOptions ? '@param _options Request options.' : ''
   } */`;
}
