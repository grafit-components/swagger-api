import { test } from 'node:test';
import { getDocument } from './document-file.provider.js';
import assert from 'node:assert';

test('Fetch swagger.json', async () => {
  const url = 'https://localhost:7182/swagger/v1/swagger.json';
  const doc = await getDocument(url);
  assert.equal(!!doc, true);
});
