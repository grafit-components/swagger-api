import assert from 'node:assert';
import { test } from 'node:test';
import {
  getDocumentByPath,
  getDocumentByUrl,
  saveFile,
} from './file.provider.js';

test('Fetch swagger.json', { skip: true }, async () => {
  const url = 'https://localhost:7182/swagger/v1/swagger.json';
  const document = await getDocumentByUrl(url);
  assert.equal(!!document, true);
});

test('Read swagger.json', { skip: true }, async () => {
  const path = 'assets/swagger.json';
  const document = await getDocumentByPath(path);
  assert.equal(!!document, true);
});

test('save file', { skip: true }, () => {
  saveFile('./assets/test/test.ts', 'Hello');
});
