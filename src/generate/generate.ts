import path from 'node:path';
import { OpenAPIV3 } from 'openapi-types';
import { codeFormat } from '../utils/code-format.js';
import {
  getDocumentByPath,
  getDocumentByUrl,
  removeFolder,
  saveFile,
} from '../utils/file.provider.js';
import { makeContracts } from './contracts.js';
import { Options } from './options.js';

export async function generation(options: Options) {
  let document: OpenAPIV3.Document | undefined;

  if ('url' in options) {
    console.log('Download document from ' + options.url);
    document = await getDocumentByUrl(options.url);
  } else if ('path' in options) {
    console.log('Read document ' + options.path);
    document = await getDocumentByPath(options.path);
  } else {
    document = options.doc;
  }

  if (!document) {
    throw 'Error while getting document';
  }

  checkDocument(document);
  console.log('Document received');

  console.log('Generate contracts');
  const contracts = makeContracts(document);

  if (!options.suppressClearFolder) {
    console.log('Clear output folder');
    await removeFolder(options.outputFolder);
  }

  console.log('Save contracts');
  for (const module of contracts.modules) {
    const content = await codeFormat(module.content);
    const fileName = path.join(options.outputFolder, `${module.name}.ts`);
    await saveFile(fileName, content);
  }
  console.log(`Saved ${contracts.modules.length} modules`);
}

function checkDocument(document: OpenAPIV3.Document) {
  if (document.openapi !== '3.0.1') {
    throw Error('Document not supposed.');
  }
}
