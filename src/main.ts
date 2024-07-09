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
    console.log('See usage: https://github.com/grafit-components/swagger-api');
    return;
  }

  if (!args['--output']) {
    console.error('Required output!');
    return;
  }

  try {
    if (args['--path']) {
      await generation({
        path: args['--path'],
        outputFolder: args['--output'],
        pathIntersection: args['--pathIntersection'],
        contractsPrefix: args['--contractsPrefix'],
        datesAsString: args['--datesAsString'],
        publicApi: args['--publicApi'],
      });
    } else if (args['--url']) {
      await generation({
        url: args['--url'],
        outputFolder: args['--output'],
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
