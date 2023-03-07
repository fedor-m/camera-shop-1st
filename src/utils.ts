import dayjs from 'dayjs';
import { Pages } from './types/pages';
import { Stars } from './types/stars';
import { Review } from './types/review';
import {
  CARDS_ON_PAGE,
  MAX_RATING,
  ESCAPE_CODE,
  ESC_CODE,
  DATETIME_FORMAT_BASIC,
  LOCALE,
  DATETIME_FORMAT_RU,
} from './const';
export const getPagesNumber = (camerasLength: number) =>
  camerasLength % CARDS_ON_PAGE === 0
    ? camerasLength / CARDS_ON_PAGE
    : Number((camerasLength / CARDS_ON_PAGE).toFixed(0)) + 1;
export const getItemNumbersToPage = (page: number): Pages => ({
  start: CARDS_ON_PAGE * (page - 1),
  end: CARDS_ON_PAGE * page,
});
export const getStarsInRating = (rating: number): Stars => ({
  gold: [...Array.from({ length: rating }).keys()],
  grey: [...Array.from({ length: MAX_RATING - rating }).keys()],
});
export const getDateFormatBasic = (date: string): string =>
  dayjs(date).format(DATETIME_FORMAT_BASIC);
export const getDateFormatRU = (date: string): string => {
  require('dayjs/locale/ru');
  return dayjs(date).locale(LOCALE).format(DATETIME_FORMAT_RU);
};
export const getSortedReviews = (reviews: Review[] | null): Review[] | null => {
  if (!reviews) {
    return null;
  }
  return [...reviews].sort((a, b) =>
    dayjs(a.createAt).isBefore(dayjs(b.createAt)) ? 1 : -1
  );
};
export const isEscKey = (key: string) =>
  key === ESCAPE_CODE || key === ESC_CODE;
