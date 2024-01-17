import { test } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { makeJsDoc } from './js-doc-template.js';
import assert from 'node:assert';

test('MakeJsDoc. Object', () => {
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

  const result = makeJsDoc(obj);

  assert.strictEqual(result, '/** Изменение поля объекта. */');
});

test('MakeJsDoc. Field', () => {
  const obj: OpenAPIV3.SchemaObject = {
    type: 'string',
    description: 'Наименование поля.',
    nullable: true,
  };

  const result = makeJsDoc(obj);

  assert.strictEqual(result, '/** Наименование поля. */');
});
