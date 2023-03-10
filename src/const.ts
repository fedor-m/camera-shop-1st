import { Pages } from './types/pages';
export enum AppRoute {
  Catalogue = '/',
  CataloguePage = '/catalog/page',
  Item = '/item',
  Basket = '/basket',
  NotFound = '*',
}
export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Similar = '/similar',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders',
}
export enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  Item = 'ITEM'
}
export enum Tabs {
  Characteristics = 'characteristics',
  Description = 'description'
}
export enum Sort {
  Rating = 'rating',
  Price = 'price'
}
export enum Fields {
  Rating = 'rating',
  UserName = 'userName',
  Advantage = 'advantage',
  Disadvantage = 'disadvantage',
  Review = 'review'
}
export const RANGES = Object.freeze(
  [
    {
      key: 'gte',
      value: 'от'
    },
    {
      key: 'lte',
      value: 'до'
    }
  ]
);
export const CATEGORIES = Object.freeze(
  [
    {
      key: 'photocamera',
      value: 'Фотокамера'
    },
    {
      key: 'videocamera',
      value: 'Видеокамера'
    }
  ]
);
export const TYPES = Object.freeze(
  [
    {
      key: 'digital',
      value: 'Цифровая'
    },
    {
      key: 'film',
      value: 'Плёночная'
    },
    {
      key: 'snapshot',
      value: 'Моментальная'
    },
    {
      key: 'collection',
      value: 'Коллекционная'
    }
  ]
);
export const LEVELS = Object.freeze([
  {
    key: 'zero',
    value: 'Нулевой'
  },
  {
    key: 'non-professional',
    value: 'Любительский'
  },
  {
    key: 'professional',
    value: 'Профессиональный'
  }
]);
export const CARDS_ON_PAGE = 9;
export const FIRST_PAGE_DATA: Pages = {
  start: 0,
  end: CARDS_ON_PAGE
};
export const SLIDES_ON_PAGE = 3;
export const REVIEWS_ON_PAGE = 3;
export const MIN_REVIEW_LENGTH = 5;
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const RATINGS = Object.freeze(
  [
    {
      mark: 5,
      text:'Отлично'
    },
    {
      mark: 4,
      text:'Хорошо'
    },
    {
      mark: 3,
      text:'Нормально'
    },
    {
      mark: 2,
      text:'Плохо'
    },
    {
      mark: 1,
      text:'Ужасно'
    }
  ]
);
export const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/';
export const REQUEST_TIMEOUT = 5000;
export const ESCAPE_CODE = 'Escape';
export const ESC_CODE = 'Esc';
export const FIRST = 1;
export const SECOND = 2;
export const DATETIME_FORMAT_BASIC = 'YYYY-MM-DD';
export const LOCALE = 'ru';
export const DATETIME_FORMAT_RU = 'D MMMM';
