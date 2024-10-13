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

/** Новость. */
export interface NewsItem {
  /** Заголовок. */
  title: string | null;

  /** Текст. */
  text: string | null;

  summary: Summary | null;
}

/** Описание новости. */
export interface Summary {
  /** Аннотация. */
  annotation: string | null;

  /** Автор. */
  author: string | null;
}
