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

/** Описание погоды. */
export interface LibSummary {
  type: LibSummaryType | null;

  /** Описание. */
  description: string | null;
}

/**
 * Тип погоды.
 *
 * @format int32
 */
export const LibSummaryType = {
  /** Морозно. */
  Freezing: 0,

  /** Холодно */
  Cool: 1,

  /** Мягкая погода. */
  Mild: 2,

  /** Тепло. */
  Warm: 2,

  /** Жарко. */
  Hot: 3,
} as const;
/**
 * Тип погоды.
 *
 * @format int32
 */
export type LibSummaryType = (typeof LibSummaryType)[keyof typeof LibSummaryType];

/** Данные о погоде. */
export interface LibWeatherForecast {
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

  /**
   * Температура по шкале Фаренгейта.
   *
   * @format int32
   */
  temperatureF: number;

  summary: LibSummary | null;
}
