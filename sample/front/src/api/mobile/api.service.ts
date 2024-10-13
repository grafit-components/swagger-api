/* eslint-disable */
/* tslint:disable */
// noinspection SpellCheckingInspection

/*
 * --------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-API                  ##
 * ##                                                          ##
 * ## SOURCE: https://github.com/grafit-components/swagger-api ##
 * --------------------------------------------------------------
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/** Sample API */
@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly weatherForecast = {
    _paths: { _WeatherForecast: 'api/WeatherForecast' },
  } as const;

  noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
  });
  constructor(private http: HttpClient) {}
}

export interface Options {
  observe?: 'body' | 'events' | 'response';
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}
