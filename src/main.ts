#!/usr/bin/env node

import arg from 'arg';
import { generation } from './generate/generate.js';

(async () => {
  const args = arg({
    // Types
    '--help': Boolean,
    '--output': String,
    '--path': String,
    '--url': String,
    '--datesAsString': Boolean,
    '--publicApi': Boolean,
    '--pathIntersection': String,
    '--contractsPrefix': String,

    // Aliases
    '-h': '--help',
    '-o': '--output',
    '-p': '--path',
    '-u': '--url',
  });

  if (args['--help']) {
    const helpText = `@grafit/swagger-api - API Generator for Angular

Usage:
  swagger-api [options]

Options:
  -h, --help                  Show this help message and exit
  -o, --output <directory>    Output directory for generated files (default: ./src/api)
  -p, --path <file>           Path to local OpenAPI/Swagger JSON file (e.g. ./swagger.json )
  -u, --url <url>             URL to remote OpenAPI/Swagger specification
  --datesAsString             Generate dates type as strings instead of Date objects (default: false)
  --publicApi                 Generate export all modules file (default: false)
  --pathIntersection <file>   Generate only common contracts from specifications (e.g. ./swagger.json )
  --contractsPrefix <prefix>  Prefix for generated contracts (e.g. "Api" for ApiUser)

Examples:
  Generate from remote specification:
    swagger-api -u https://api.example.com/swagger.json -o ./src/api

  Generate from local file with custom options:
    swagger-api -p ./swagger.json --datesAsString

  Generate only common contracts from specifications:
    swagger-api -p ./../swagger/web/swagger.json --pathIntersection ./../swagger/mobile/swagger.json --contractsPrefix Lib

Note:
  You must specify either --path or --url parameter.
  Local file takes precedence when both are provided.`;
    console.log(helpText);
    return;
  }

  try {
    if (args['--path']) {
      await generation({
        path: args['--path'],
        outputFolder: args['--output'] ?? './src/api',
        pathIntersection: args['--pathIntersection'],
        contractsPrefix: args['--contractsPrefix'],
        datesAsString: args['--datesAsString'],
        publicApi: args['--publicApi'],
      });
    } else if (args['--url']) {
      await generation({
        url: args['--url'],
        outputFolder: args['--output'] ?? './src/api',
        pathIntersection: args['--pathIntersection'],
        contractsPrefix: args['--contractsPrefix'],
        datesAsString: args['--datesAsString'],
        publicApi: args['--publicApi'],
      });
    } else {
      console.error('Required path or url to specification!');
    }
  } catch (e) {
    console.error(e);
  }
})();
