import { OpenAPIV3 } from 'openapi-types';
import { Options } from '../../generate/options';
import { makeContract, makeRefBuilder } from '../contracts/contract-template';

export function getMethodBody(
  options: Options,
  requestBody?: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined,
) {
  if (requestBody && !('$ref' in requestBody)) {
    const schema = requestBody.content['application/json']?.schema;
    if (schema) {
      const makeRef = makeRefBuilder(options);
      return `body: ${makeContract({ component: schema, makeRef })}${requestBody.required ? '' : ' | undefined'}, `;
    } else if (requestBody.content['multipart/form-data']) {
      return `body: FormData${requestBody.required ? '' : ' | undefined'}, `;
    } else {
      throw 'Unknown content type.';
    }
  }

  return '';
}

export function getJsDocBody(requestBody?: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined) {
  if (requestBody && !('$ref' in requestBody)) {
    return `\n@param body ${requestBody.description}`;
  }
  return '';
}
