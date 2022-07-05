export interface PaginateQueryParams {
  limit: number;
  page: number;
}

export type Email = string;
export type Alias = string;
export type Date = string;
export type DateTime = string;
export type Url = string;
export type Id = string;
export type Locale = string;

export enum Environment {
  Production = "production",
  Staging = "staging",
  Development = "development",
}
