import { test } from 'node:test';
import { makeContract } from './contract-template.js';
import { OpenAPIV3 } from 'openapi-types';

test('Contract. Object', () => {
  const obj: OpenAPIV3.SchemaObject = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Наименование поля.',
        nullable: true,
      },
      changeSetId: {
        type: 'integer',
        description: 'Идентификатор изменения.',
        format: 'int64',
      },
      metaType: {
        $ref: '#/components/schemas/Itsk.ER.Grafit.Abstractions.Models.GtMetaType',
      },
      newValue: {
        type: 'string',
        description: 'Новое значение.',
        nullable: true,
      },
      oldValue: {
        type: 'string',
        description: 'Новое значение.',
        nullable: true,
      },
    },
    additionalProperties: false,
    description: 'Изменение поля объекта.',
  };

  const res = makeContract(obj, makeRef);
  console.log('===========================');
  console.log(res);
  console.log('===========================');
});
function makeRef(component: OpenAPIV3.ReferenceObject) {
  if (!component.$ref.startsWith('#/components/schemas/')) {
    throw 'Unknown ref';
  }

  return component.$ref.replace('#/components/schemas/', '');
}
