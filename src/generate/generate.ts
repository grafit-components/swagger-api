import path from 'node:path';
import { OpenAPIV3 } from 'openapi-types';
import { codeFormat } from '../utils/code-format.js';
import { getDocumentByPath, getDocumentByUrl, removeFolder, saveFile } from '../utils/file.provider.js';
import { toKebabCase } from '../utils/string-converters';
import { makeContracts } from './contracts.js';
import { makeEndpoints } from './endpoints';
import { Options } from './options.js';

export async function generation(options: Options) {
  let document: OpenAPIV3.Document | undefined;
  let documentIntersection: OpenAPIV3.Document | undefined;

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

  if ('pathIntersection' in options && options.pathIntersection !== undefined) {
    documentIntersection = await getDocumentByPath(options.pathIntersection);
    if (!documentIntersection) {
      throw 'Error while getting document intersection';
    }
    checkDocument(documentIntersection);
  }

  console.log('Generate contracts');
  const contracts = makeContracts(options, document, documentIntersection);

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

  if (options.publicApi) {
    console.log('Save public api');
    const content = await codeFormat(contracts.exportsAll);
    const fileName = path.join(options.outputFolder, `public-api.ts`);
    await saveFile(fileName, content);
  }

  if (documentIntersection === undefined) {
    console.log('Generate api service');
    const apiServiceRaw = makeEndpoints(document, options);
    const apiServiceWithImport = `${contracts.importsAll}\n${apiServiceRaw}`;
    const apiServiceFormatted = await codeFormat(apiServiceWithImport);
    const serviceName = path.join(
      options.outputFolder,
      toKebabCase(`${options.endpointsServiceName ?? 'api'}.service.ts`),
    );
    console.log('Save api service');
    await saveFile(serviceName, apiServiceFormatted);
  } else {
    console.log(`Skip generating api service`);
  }

  console.log('Completed');
}

function checkDocument(document: OpenAPIV3.Document) {
  if (document.openapi !== '3.0.1') {
    throw Error('Document not supposed.');
  }
}
