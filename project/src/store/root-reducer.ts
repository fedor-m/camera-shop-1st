import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasLoad } from './cameras-load/cameras-load';
import { promoLoad } from './promo-load/promo-load';
import { itemLoad } from './item-load/item-load';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasLoad.reducer,
  [NameSpace.Promo]: promoLoad.reducer,
  [NameSpace.Item]: itemLoad.reducer
});
