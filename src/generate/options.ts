import { OpenAPIV3 } from 'openapi-types';

export type Options = OptionsUrl | OptionsPath | OptionsDoc<OpenAPIV3.Document>;

export interface OptionsUrl extends OptionsCommon {
  /** Url to swagger.json. */
  url: string;
}

export interface OptionsPath extends OptionsCommon {
  /** Path to swagger.json. */
  path: string;

  /** Path to swagger.json of intersection models. */
  pathIntersection?: string;
}

export interface OptionsDoc<DocType extends OpenAPIV3.Document> extends OptionsCommon {
  /** Specification. */
  doc: DocType;
}

export interface OptionsCommon {
  /** Folder with result generations. */
  outputFolder: string;

  /** Don`t clear output folder before generation. */
  suppressClearFolder?: boolean;

  /**
   * Class name service endpoints
   *
   * @default 'Api'
   */
  endpointsServiceName?: string;

  /**
   * Urls path endpoints prefix
   *
   * @default 'api'
   */
  endpointsUrlPrefix?: string;

  /** Contract name prefix. */
  contractsPrefix?: string;

  /**
   * Use Enum type script type for enum spec
   *
   * @default false
   */
  suppressEnumAsObj?: boolean;

  /**
   * Generate dates as string
   *
   * @default false
   */
  datesAsString?: boolean;

  /** Generate export all modules file. */
  publicApi?: boolean;
}
