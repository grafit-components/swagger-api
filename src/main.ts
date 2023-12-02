// import { analytics } from './modules/analytics.js'
import fetch from 'node-fetch';
// path.join

// fetch('https://localhost:7182/swagger/v1/swagger.json').then((console.log));

const message: string = 'Hello node!';
console.log(message);

// analytics('test')
const f = async () => {
  const res = await fetch('https://localhost:7182/swagger/v1/swagger.json');
  const a = await res.text();
  console.log(a);
};

f();
