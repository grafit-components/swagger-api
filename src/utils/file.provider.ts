import { OpenAPIV3_1 } from 'openapi-types';
import { readFile } from 'fs/promises';

export async function getDocumentByUrl<Type>(url: string): Promise<Type> {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const r = await fetch(url);
  const document = (await r.json()) as Type;
  return document;
}

export async function getDocumentByPath<Type>(path: string): Promise<Type> {
  const fileString = await readFile(path, { encoding: 'utf8' });
  const document: Type = JSON.parse(fileString);
  return document;
}
