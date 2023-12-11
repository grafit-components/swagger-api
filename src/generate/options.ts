import { OpenAPIV3 } from 'openapi-types';

export type Options = OptionsUrl | OptionsPath | OptionsDoc<OpenAPIV3.Document>;

export interface OptionsUrl extends OptionsCommon {
  /** Url to swagger.json. */
  url: string;
}

export interface OptionsPath extends OptionsCommon {
  /** Path to swagger.json. */
  path: string;
}

export interface OptionsDoc<DocType extends OpenAPIV3.Document>
  extends OptionsCommon {
  /** Specification. */
  doc: DocType;
}

export interface OptionsCommon {
  /** Folder with result generations. */
  outputFolder: string;

  /** Don`t clear output folder before generation. */
  suppressClearFolder?: boolean;
}
