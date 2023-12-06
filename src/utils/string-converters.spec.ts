import { test } from 'node:test';
import { toKebabCase } from './string-converters.js';
import assert from 'node:assert';

test('toKebabCase', () => {
  const str = 'PascalCase.Test';

  const kebabCase = toKebabCase(str);

  assert.strictEqual(kebabCase, 'pascal-case.test');
});
