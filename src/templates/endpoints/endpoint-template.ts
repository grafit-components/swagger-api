import { TagGroupItem, TagOperation } from '../../generate/endpoints';
import { toCamelCase, toPascalCase } from '../../utils/string-converters';
import { getJsDocBody, getMethodBody } from './endpoint-body-template';
import { getJsDocParams, getMethodParams, getQueryParams } from './endpoint-params-template';
import { makePaths } from './endpoint-paths-template';
import { getMethodType } from './endpoint-response-template';

export function makeEndpoint(tagGroupItem: TagGroupItem, endpointsUrlPrefix = 'api') {
  const methods = tagGroupItem.operations.map((operation) => {
    if (!operation.path.includes(`/${tagGroupItem.tag}/`)) {
      // Пропускаются все роуты которые не содержат в пути тег (скорее всего они избыточны)
      console.log(`Skip operation: ${operation.path}`);
      return '';
    }
    return `${getMethodJsDoc(operation)}
    ${getMethodName(tagGroupItem.tag, operation)}: ${getMethod(operation, endpointsUrlPrefix)}`;
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

export function getMethod(operation: TagOperation, endpointsUrlPrefix: string) {
  const optionsArr = [];
  const url = endpointsUrlPrefix + operation.path.replace(/\{/g, '${');

  const params = getMethodParams(operation.operationObject.parameters);
  if (params) {
    const paramInOptions = getQueryParams(operation.operationObject.parameters);
    optionsArr.push(paramInOptions);
  }

  const body = getMethodBody(operation.operationObject.requestBody);
  if (body) {
    optionsArr.push('body');
  }
  const additionalParam = `${operation.method === 'get' ? '_noCache=false, ' : ''}_options?: Options`;

  let methodType = getMethodType(operation.operationObject.responses);
  if (methodType === '<string>') {
    methodType = '';
    optionsArr.push(`responseType: 'text'`);
  }

  if (operation.method === 'get') {
    optionsArr.push(`headers: _noCache === true ? this.noCacheHeaders : undefined`);
  }

  const options = optionsArr.length ? `, { ${optionsArr.join(', ')}, ..._options}` : `, _options`;

  return `(${params}${body}${additionalParam}) => this.http.request${methodType}('${operation.method}', \`${url}\`${options}),`;
}

export function getMethodJsDoc(operation: TagOperation) {
  const summary = operation.operationObject.summary ? `${operation.operationObject.summary}\n` : '';
  const description = operation.operationObject.description
    ? `\n@description ${operation.operationObject.description}\n`
    : '';
  const deprecated = operation.operationObject.deprecated ? '\n@deprecated\n' : '';
  const request = `\n@request ${operation.method}: ${operation.path}\n`;
  const params = getJsDocParams(operation.operationObject.parameters);
  const body = getJsDocBody(operation.operationObject.requestBody);
  return `/** ${summary}${description}${deprecated}${request}${params}${body}
   ${operation.method === 'get' ? '@param _noCache Ignore cache.\n' : ''}@param _options Request options. */`;
}
