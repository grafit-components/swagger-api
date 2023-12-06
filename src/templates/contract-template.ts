import {OpenAPIV3} from 'openapi-types';
import {makeJsDoc} from './js-doc-template.js';

export function makeContract(
    component: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    makeRef: (component: OpenAPIV3.ReferenceObject) => string,
    name?: string,
) {
    if ('$ref' in component) {
        return makeRef(component);
    }

    switch (component.type) {
        case 'integer':
        case 'number':
            return makeNumber(component);
        case 'array':
            return makeArrayContract(component, makeRef);
        case 'object':
            return makeObject(component, makeRef, name);
    }

}

// function makeRef(component: OpenAPIV3.ReferenceObject) {
//   if (!component.$ref.startsWith('#/components/schemas/')) {
//     throw 'Unknown ref';
//   }
//
//   return '';
// }

export function makeArrayContract(
    component: OpenAPIV3.ArraySchemaObject,
    makeRef: (component: OpenAPIV3.ReferenceObject) => string,
): string {
    return `${makeContract(component.items, makeRef)}[]`;
}

export function makeNumber(component: OpenAPIV3.BaseSchemaObject) {
    return `number${component?.nullable ? ' | null' : ''}`;
}

export function makeObject(
    component: OpenAPIV3.NonArraySchemaObject,
    makeRef: (component: OpenAPIV3.ReferenceObject) => string,
    name?: string,
) {
    const strings = [];

    if (name) {
        strings.push(makeJsDoc(component));
        strings.push(`export interface ${name} {`);
    } else {
        strings.push('{');
    }

    if (component.properties) {
        const fieldNames = Object.keys(component.properties);
        fieldNames.forEach((fieldName) => {
            const fieldComponent = component.properties![fieldName];
            strings.push(makeJsDoc(fieldComponent));
            strings.push(`${fieldName}: ${makeContract(fieldComponent, makeRef)}`);
        });
    }

    strings.push('}');

    return strings.join('\n');
}
