import assert from 'node:assert';
import { describe, it } from 'node:test';
import { OpenAPIV3 } from 'openapi-types';
import { makeEnumAsObjType, makeEnumType } from './enum-template';

describe('enum-template', () => {
  const objBaseSample: OpenAPIV3.SchemaObject = {
    enum: [0, 1],
    type: 'integer',
    description: 'Список системных объектов.',
    format: 'int32',
  };
  const objSample: OpenAPIV3.SchemaObject & { 'x-enumNames': string[]; 'x-enumSummaries': string[] } = {
    enum: [0, 1],
    type: 'integer',
    description: 'Список системных объектов.',
    format: 'int32',
    'x-enumNames': ['First', 'Second'],
    'x-enumSummaries': ['First summary', 'Second summary'],
  };
  const objError: OpenAPIV3.SchemaObject & { 'x-enumNames': string[] } = {
    enum: [0],
    type: 'integer',
    description: 'Список системных объектов.',
    format: 'int32',
    'x-enumNames': ['First', 'Second'],
  };

  it('Contract. Enum simple', () => {
    const res = makeEnumType(objBaseSample, 'EnumName');

    const exp = `/** Список системных объектов.
@format int32
 */
export enum EnumName {
_0 = 0,
_1 = 1,
}`;

    assert.strictEqual(res, exp);
  });

  it('Contract. Enum', () => {
    const res = makeEnumType(objSample, 'EnumName');

    const exp = `/** Список системных объектов.
@format int32
 */
export enum EnumName {

/** First summary */
First = 0,

/** Second summary */
Second = 1,
}`;
    assert.strictEqual(res, exp);
  });

  it('Contract. Invalid enum', () => {
    const res = makeEnumType(objError, 'EnumName');

    const exp = `/** Список системных объектов.
@format int32
 */
export enum EnumName {
}`;
    assert.strictEqual(res, exp);
  });

  it('Contract. ObjEnum simple', () => {
    const res = makeEnumAsObjType(objBaseSample, 'EnumName');

    const exp = `/** Список системных объектов.
@format int32
 */
export const EnumName = {
"0" : 0,
"1" : 1,
} as const;
/** Список системных объектов.
@format int32
 */
export type EnumName = (typeof EnumName)[keyof typeof EnumName];`;

    assert.strictEqual(res, exp);
  });

  it('Contract. ObjEnum', () => {
    const res = makeEnumAsObjType(objSample, 'EnumName');

    const exp = `/** Список системных объектов.
@format int32
 */
export const EnumName = {

/** First summary */
First : 0,

/** Second summary */
Second : 1,
} as const;
/** Список системных объектов.
@format int32
 */
export type EnumName = (typeof EnumName)[keyof typeof EnumName];`;

    assert.strictEqual(res, exp);
  });

  it('Contract. Invalid Obj enum', () => {
    const res = makeEnumAsObjType(objError, 'EnumName');

    const exp = `/** Список системных объектов.
@format int32
 */
export const EnumName = {
} as const;
/** Список системных объектов.
@format int32
 */
export type EnumName = (typeof EnumName)[keyof typeof EnumName];`;
    assert.strictEqual(res, exp);
  });
});
