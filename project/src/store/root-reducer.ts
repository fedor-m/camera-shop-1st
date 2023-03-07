import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasLoad } from './cameras-load/cameras-load';
import { promoState } from './promo-state/promo-state';
import { itemLoad } from './item-load/item-load';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasLoad.reducer,
  [NameSpace.Promo]: promoState.reducer,
  [NameSpace.Item]: itemLoad.reducer
});
