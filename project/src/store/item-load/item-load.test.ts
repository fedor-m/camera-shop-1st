import { itemLoad } from './item-load';
import {
  fetchSelectedCameraAction,
  fetchSimilarItemsAction,
  fetchReviewsAction,
  sendReviewAction,
} from './api-actions';
import { ItemLoad } from '../../types/state';
import {
  makeFakeCamera,
  makeFakeSimilarCameras,
  makeFakeReviews,
  makeFakeReview
} from '../../mocks/mocks';

const fakeCamera = makeFakeCamera();
const fakeSimilarCameras = makeFakeSimilarCameras();
const fakeReviews = makeFakeReviews();
const fakeReview = makeFakeReview();
describe('Reducer: itemLoad', () => {
  let state: ItemLoad;

  beforeEach(() => {
    state = {
      selectedCamera: null,
      isSelectedCameraLoading: false,
      hasSelectedCameraLoadingError: false,
      similarItems: null,
      areSimilarItemsLoading: false,
      reviews: null,
      areReviewsLoading: false,
      isReviewFormBlocked: false,
      addedReview: null
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(itemLoad.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  describe('Action: fetchSelectedCameraAction', () => {
    it('should update loading status to "true" and reset error if action pending', () => {
      expect(
        itemLoad.reducer(state, {
          type: fetchSelectedCameraAction.pending.type,
        })
      ).toEqual({
        ...state,
        isSelectedCameraLoading: true,
        hasSelectedCameraLoadingError: false,
      });
    });

    it('should update loading status to "false" and loaded offer property if action fulfilled', () => {
      expect(
        itemLoad.reducer(state, {
          type: fetchSelectedCameraAction.fulfilled.type,
          payload: fakeCamera,
        })
      ).toEqual({
        ...state,
        isSelectedCameraLoading: false,
        selectedCamera: fakeCamera,
      });
    });

    it('should update loading status to "false" and add error if action rejected', () => {
      expect(
        itemLoad.reducer(state, {
          type: fetchSelectedCameraAction.rejected.type,
        })
      ).toEqual({
        ...state,
        isSelectedCameraLoading: false,
        hasSelectedCameraLoadingError: true,
      });
    });
  });

  describe('Action: fetchSimilarItemsAction', () => {
    it('should loaded nearest offers if action fulfilled', () => {
      expect(
        itemLoad.reducer(state, {
          type: fetchSimilarItemsAction.fulfilled.type,
          payload: fakeSimilarCameras,
        })
      ).toEqual({ ...state, similarItems: fakeSimilarCameras });
    });
  });

  describe('Action: fetchReviewsAction', () => {
    it('should loaded reviews if action fulfilled', () => {
      expect(
        itemLoad.reducer(state, {
          type: fetchReviewsAction.fulfilled.type,
          payload: fakeReviews,
        })
      ).toEqual({ ...state, reviews: fakeReviews, addedReview: null });
    });
  });

  describe('Action: sendReviewAction', () => {
    it('should update form block status to "true" if action pending', () => {
      expect(
        itemLoad.reducer(state, { type: sendReviewAction.pending.type })
      ).toEqual({ ...state, isReviewFormBlocked: true });
    });

    it('should update form block status to "false" and loaded reviews if action fulfilled', () => {
      expect(
        itemLoad.reducer(state, {
          type: sendReviewAction.fulfilled.type,
          payload: fakeReview,
        })
      ).toEqual({ ...state, isReviewFormBlocked: false, addedReview: fakeReview });
    });

    it('should update form block status to "false" if action rejected', () => {
      expect(
        itemLoad.reducer(state, { type: sendReviewAction.rejected.type })
      ).toEqual({ ...state, isReviewFormBlocked: false});
    });
  });
});
