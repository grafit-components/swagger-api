import { test } from 'node:test';
import { makeContract } from './contract-template.js';
import { OpenAPIV3 } from 'openapi-types';
import assert from 'node:assert';

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

  const exp = `{
/** Наименование поля. */
name: undefined
/** Идентификатор изменения.
@format int64
 */
changeSetId: number
metaType: Itsk.ER.Grafit.Abstractions.Models.GtMetaType
/** Новое значение. */
newValue: undefined
/** Новое значение. */
oldValue: undefined
}`;
  // assert.strictEqual(res, exp);
});
function makeRef(component: OpenAPIV3.ReferenceObject) {
  if (!component.$ref.startsWith('#/components/schemas/')) {
    throw 'Unknown ref';
  }

  return component.$ref.replace('#/components/schemas/', '');
}
