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
export interface Summary {
  type: SummaryType | null;

  /** Описание. */
  description: string | null;
}

/**
 * Тип погоды.
 *
 * @format int32
 */
export const SummaryType = {
  /** Морозно. */
  Freezing: 0,

  /** Холодно */
  Cool: 1,

  /** Мягкая погода. */
  Mild: 2,

  /** Тепло. */
  Warm: 3,

  /** Жарко. */
  Hot: 4,
} as const;
/**
 * Тип погоды.
 *
 * @format int32
 */
export type SummaryType = (typeof SummaryType)[keyof typeof SummaryType];

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

  /**
   * Температура по шкале Фаренгейта.
   *
   * @format int32
   */
  temperatureF: number;

  summary: Summary | null;
}
