import { OpenAPIV3 } from 'openapi-types';

export function makeEndpoints(document: OpenAPIV3.Document) {
  const pathsObj = document.paths;

  const paths = Object.keys(pathsObj);

  const strings = ['class {'];

  console.log(paths);
  // for (let i=0; i< strings.length; ) {
  //   const tag = pathsObj[paths[i].
  // }

  strings.push('}');
}

// export function groupPaths(paths: string[]) {
//   return paths.reduce((groups, path) => {
//     const segments = path.split('/');
//   }, [] as PathGroup[]);
// }

// interface PathGroup {
//   path: string;
//   child: PathGroup[];
// }
//
// class Test {
//   readonly Tag = {
//     /** Test */
//     path: '',
//
//     /** Comment */
//     m: () => {},
//   } as const;
//   // readonly Tag = (() => {
//   //
//   //   return {
//   //     function t(){
//   //
//   //   }
//   //   }
//   // })();
// }
//
// class PathStr {
//   constructor(public readonly path: string) {}
// }
