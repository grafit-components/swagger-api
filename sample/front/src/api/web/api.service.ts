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

import * as LibraryWeather from './library.weather';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

/** Sample API */
@Injectable({ providedIn: 'root' })
export class ApiService {
  /** Прогноз погоды. */
  readonly weatherForecast = {
    /**
     * Получить прогноз погоды на пять дней.
     *
     * @param _noCache Ignore cache.
     * @request get: /WeatherForecast/Get
     */
    get: (_noCache = false) =>
      this.http.request<LibraryWeather.WeatherForecast[]>('get', `api/WeatherForecast/Get`, {
        headers: _noCache ? this.noCacheHeaders : undefined,
      }),
    _paths: { _controller: 'api/WeatherForecast', get: 'api/WeatherForecast/Get' },
  } as const;

  private readonly noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
  });
  private readonly http = inject(HttpClient);
}

export interface Options {
  observe?: 'body' | 'events' | 'response';
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}
