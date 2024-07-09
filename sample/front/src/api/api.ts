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

/** Данные о погоде. */
export interface WeatherForecast {
  /**
   * Дата.
   *
   * @format date-time
   */
  date: Date;

  /**
   * Температура в градусах.
   *
   * @format int32
   */
  temperatureC: number;

  /** @format int32 */
  temperatureF: number;

  summary: string | null;
}
