import {promoLoad} from './promo-load';
import {fetchPromoAction} from './api-actions';
import {PromoLoad} from '../../types/state';
import {makeFakePromo} from '../../mocks/mocks';

const fakePromo = makeFakePromo();

describe('Reducer: offerProcess', () => {
  let state: PromoLoad;

  beforeEach(() => {
    state = {
      promo: null,
      isPromoLoading: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(promoLoad.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('Action: fetchPromoAction', () => {
    it('should update loading status to "true" if action pending', () => {
      expect(promoLoad.reducer(state, {type: fetchPromoAction.pending.type}))
        .toEqual({...state, isPromoLoading: true});
    });

    it('should update loading status to "false" and loaded offers if action fulfilled', () => {
      expect(promoLoad.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: fakePromo}))
        .toEqual({...state, isPromoLoading: false, promo: fakePromo});
    });
  });
});
