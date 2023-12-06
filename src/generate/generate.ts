import { Options } from './options.js';
import { OpenAPIV3 } from 'openapi-types';
import { getDocumentByPath, getDocumentByUrl } from '../utils/file.provider.js';

export async function generation(options: Options) {
  let document: OpenAPIV3.Document | undefined;

  if ('url' in options) {
    document = await getDocumentByUrl(options.url);
  } else if ('path' in options) {
    document = await getDocumentByPath(options.path);
  } else {
    document = options.doc;
  }

  if (!document) {
    throw 'Error while getting document';
  }

  checkDocument(document);

  return document;
}

function checkDocument(document: OpenAPIV3.Document) {
  if (document.openapi !== '3.0.1') {
    throw Error('Document not supposed.');
  }
}
