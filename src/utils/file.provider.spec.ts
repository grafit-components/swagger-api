import { test } from 'node:test';
import { getDocumentByPath, getDocumentByUrl } from './file.provider.js';
import assert from 'node:assert';

test('Fetch swagger.json', { skip: true }, async () => {
  const url = 'https://localhost:7182/swagger/v1/swagger.json';
  const document = await getDocumentByUrl(url);
  assert.equal(!!document, true);
});

test('Read swagger.json', async () => {
  const path = 'assets/swagger.json';
  const document = await getDocumentByPath(path);
  assert.equal(!!document, true);
});
