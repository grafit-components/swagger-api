import { OpenAPIV3_1 } from 'openapi-types';
import { readFile } from 'fs/promises';

export async function getDocumentByUrl(url: string) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const r = await fetch(url);
  const document: OpenAPIV3_1.Document =
    (await r.json()) as OpenAPIV3_1.Document;
  checkDocument(document);
  return document;
}

export async function getDocumentByPath(path: string) {
  const fileString = await readFile(path, { encoding: 'utf8' });
  const document: OpenAPIV3_1.Document = JSON.parse(fileString);
  checkDocument(document);
  return document;
}

function checkDocument(document: OpenAPIV3_1.Document) {
  if (document.openapi !== '3.0.1') {
    throw Error('Document not supposed.');
  }
}
