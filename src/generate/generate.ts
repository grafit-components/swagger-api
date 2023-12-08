import path from 'node:path';
import { OpenAPIV3 } from 'openapi-types';
import { codeFormat } from '../utils/code-format.js';
import {
  getDocumentByPath,
  getDocumentByUrl,
  saveFile,
} from '../utils/file.provider.js';
import { makeContracts } from './contracts.js';
import { Options } from './options.js';

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

  const contracts = makeContracts(document);

  contracts.modules.forEach(async (module) => {
    const content = await codeFormat(module.content);
    const fileName = path.join(options.outputFolder, `${module.name}.ts`);
    await saveFile(fileName, content);
  });

  return document;
}

function checkDocument(document: OpenAPIV3.Document) {
  if (document.openapi !== '3.0.1') {
    throw Error('Document not supposed.');
  }
}
