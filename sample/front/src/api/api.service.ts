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

import * as Api from './api';
import * as ApiControllers from './api.controllers';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/** Sample API */
@Injectable({ providedIn: 'root' })
export class ApiService {
  /** Ежедневные новости. */
  readonly dailyNews = {
    /**
     * Получить список новостей.
     *
     * @param _noCache Ignore cache.
     * @request get: /DailyNews/Get
     */
    get: (_noCache = false) =>
      this.http.request<ApiControllers.NewsItem[]>('get', `api/DailyNews/Get`, {
        headers: _noCache ? this.noCacheHeaders : undefined,
      }),
    _paths: { _controller: 'api/DailyNews', get: 'api/DailyNews/Get' },
  } as const;

  /** Прогноз погоды. */
  readonly weatherForecast = {
    /**
     * Получить прогноз погоды на пять дней.
     *
     * @param _noCache Ignore cache.
     * @request get: /WeatherForecast/Get
     */
    get: (_noCache = false) =>
      this.http.request<Api.WeatherForecast[]>('get', `api/WeatherForecast/Get`, {
        headers: _noCache ? this.noCacheHeaders : undefined,
      }),
    _paths: { _controller: 'api/WeatherForecast', get: 'api/WeatherForecast/Get' },
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
