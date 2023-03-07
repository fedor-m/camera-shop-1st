import { store } from '../store/store';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type CamerasLoad = {
  cameras: null | Camera[];
  total: number;
  areCamerasLoading: boolean;
}
export type PromoState = {
  promo: null | Promo;
  isPromoLoading: boolean;
}
export type ItemLoad = {
  selectedCamera: null | Camera;
  isSelectedCameraLoading: boolean;
  hasSelectedCameraLoadingError: boolean;
  similarItems: null | Camera[];
  areSimilarItemsLoading: boolean;
  reviews: null | Review[];
  areReviewsLoading: boolean;
  isReviewFormBlocked: boolean;
  addedReview: null | Review;
}
