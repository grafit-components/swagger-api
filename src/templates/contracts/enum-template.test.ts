import assert from 'node:assert';
import { describe, it } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { makeEnumType } from './enum-template';

describe('enum-template', () => {
  it('Contract. Enum', () => {
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

  it('Contract. Invalid enum', () => {
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
});
