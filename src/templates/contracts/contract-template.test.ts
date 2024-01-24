import assert from 'node:assert';
import { test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { makeContract, makeEnumType } from './contract-template.js';

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
name: string | null

/** Идентификатор изменения.
@format int64
 */
changeSetId: number


metaType: Itsk.ER.Grafit.Abstractions.Models.GtMetaType

/** Новое значение. */
newValue: string | null

/** Новое значение. */
oldValue: string | null

}`;

  assert.strictEqual(res, exp);
});

function makeRef(component: OpenAPIV3.ReferenceObject) {
  if (!component.$ref.startsWith('#/components/schemas/')) {
    throw 'Unknown ref';
  }

  return component.$ref.replace('#/components/schemas/', '');
}

test('Contract. Enum', () => {
  const obj: OpenAPIV3.SchemaObject & { 'x-enumNames': string[] } = {
    enum: [0, 1],
    type: 'integer',
    description: 'Список системных объектов.',
    format: 'int32',
    'x-enumNames': ['First', 'Second'],
  };

  const res = makeEnumType(obj, 'EnumName');

  const exp = `/** Список системных объектов.
@format int32
 */
export enum EnumName {
First = 0,
Second = 1,
}`;
  assert.strictEqual(res, exp);
});

test('Contract. Invalid enum', () => {
  const obj: OpenAPIV3.SchemaObject & { 'x-enumNames': string[] } = {
    enum: [0],
    type: 'integer',
    description: 'Список системных объектов.',
    format: 'int32',
    'x-enumNames': ['First', 'Second'],
  };

  const res = makeEnumType(obj, 'EnumName');

  const exp = `/** Список системных объектов.
@format int32
 */
export enum EnumName {
}`;
  assert.strictEqual(res, exp);
});
