import { OpenAPIV3 } from 'openapi-types';
import { makeContract, makeRefBuilder } from '../contracts/contract-template';

export function getQueryParams(parameters?: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[]) {
  if (!parameters) {
    return '';
  }
  const params = parameters
    .filter((param): param is OpenAPIV3.ParameterObject => !('$ref' in param) && param.in === 'query')
    .map((p) => `${p.name}${p.required ? '' : `: ${p.name} ?? ''`}`);
  return params.length ? `params: new HttpParams({ fromObject: { ${params.join(', ')} } })` : '';
}

export function getMethodParams(parameters?: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[]) {
  if (!parameters?.length) {
    return '';
  }
  const makeRef = makeRefBuilder();

  return parameters
    .map((param) => {
      if ('$ref' in param) {
        throw 'Unknown param type';
      }
      if (!param.schema) {
        return 'Unknown param type';
      }
      return `${param.name}: ${makeContract({ component: param.schema, makeRef, datesAsString: true })}${
        param.required ? '' : ' | undefined'
      }, `;
    })
    .join('');
}

export function getJsDocParams(parameters?: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[]) {
  return (
    parameters
      ?.filter((param): param is OpenAPIV3.ParameterObject => !('$ref' in param))
      .map((param) => `@param ${param.name} ${param.description} IN:${param.in}${getFormat(param.schema)}`)
      .join('\n') ?? ''
  );
}

function getFormat(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | undefined) {
  if (schema && 'format' in schema && schema.format) {
    return ` format:${schema.format}`;
  }
  return '';
}
