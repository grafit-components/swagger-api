#!/usr/bin/env node
// import { OpenAPIV2 } from 'openapi-types';
//
// const u = 'https://localhost:7182/swagger/v1/swagger.json';

// import { analytics } from './modules/analytics.js'
// path.join
// const u1 = 'http://petstore.swagger.io/v2/swagger.json';
//
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//
// const r = await fetch(u);
//
// const document: OpenAPIV2.Document = (await r.json()) as OpenAPIV2.Document;
//
// const paths = Object.keys(document.paths);
// console.log(document.paths[paths[0]].get?.security);
//
// console.log(document.tags);

// console.log(document.definitions?.WeatherForecast.required);

// console.log(JSON.stringify(t));

// const message: string = 'Hello node!';
// console.log(message);

// analytics('test')
// const f = async () => {
//   const res = await fetch('https://localhost:7182/swagger/v1/swagger.json');
//   const a = await res.text();
//   console.log(a);
// };
//
// f();

import { generation } from './generate/generate.js';

generation({
  path: './../assets/swagger.json',
  outputFolder: './../assets/test',
}).then(
  () => console.log('Finish'),
  (reason) => console.error(reason),
);
