import { OpenAPIV2 } from 'openapi-types';

export async function getDocument(url: string) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const r = await fetch(url);
  const document: OpenAPIV2.Document = (await r.json()) as OpenAPIV2.Document;

  return document;
}
