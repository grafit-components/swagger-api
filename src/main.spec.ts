import { test } from 'node:test';
import { sum } from './main.js';
import assert from 'node:assert';

test('Sum test', () => {
  const s = sum(1, 2);
  assert.strictEqual(s, 3);
});
