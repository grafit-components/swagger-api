import { OpenAPIV3 } from 'openapi-types';

/** Получение документации для объекта */
export function makeJsDoc(
  component: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
) {
  const ref = component as OpenAPIV3.ReferenceObject;
  if (ref.$ref) {
    // todo add doc from reference
    return '';
  }

  const object = component as OpenAPIV3.SchemaObject;
  const description = object.description ?? '';
  const deprecated = object.deprecated ? '\n@deprecated\n' : '';
  const format = object.format ? `\n@format ${object.format}\n` : '';
  const minimum = object.minimum ? `\n@min ${object.minimum}\n` : '';
  const maximum = object.maximum ? `\n@min ${object.maximum}\n` : '';
  const pattern = object.pattern ? `\n@pattern ${object.pattern}\n` : '';
  const example = object.example
    ? `\n@example ${JSON.stringify(object.example)}\n`
    : '';

  const summary = `${description}${deprecated}${format}${minimum}${maximum}${pattern}${example}`;

  if (summary) {
    return `/** ${summary} */`;
  }
  return '';
}
