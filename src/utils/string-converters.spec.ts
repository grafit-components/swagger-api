import assert from 'node:assert';
import { test } from 'node:test';
import { toCamelCase, toKebabCase, toPascalCase } from './string-converters.js';

test('toKebabCase', () => {
  const str = 'PascalCase.Test';

  const kebabCase = toKebabCase(str);

  assert.strictEqual(kebabCase, 'pascal-case.test');
});

test('toCamelCase', () => {
  const str = 'PascalCase';

  const kebabCase = toCamelCase(str);

  assert.strictEqual(kebabCase, 'pascalCase');
});

test('toPascalCase', () => {
  const str = 'get';

  const kebabCase = toPascalCase(str);

  assert.strictEqual(kebabCase, 'Get');
});
