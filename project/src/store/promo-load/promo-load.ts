import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PromoLoad } from '../../types/state';
import { fetchPromoAction } from './api-actions';

const initialState: PromoLoad = {
  promo: null,
  isPromoLoading: false
};

export const promoLoad = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.isPromoLoading = false;
        state.promo = action.payload;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoLoading = false;
      });
  }
});
