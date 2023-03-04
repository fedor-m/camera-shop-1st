import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CamerasLoad } from '../../types/state';
import { fetchCamerasAction } from './api-actions';

const initialState: CamerasLoad = {
  cameras: null,
  areCamerasLoading: false,
  total: 0
};

export const camerasLoad = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: { },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.areCamerasLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.areCamerasLoading = false;
        state.cameras = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.areCamerasLoading = false;
      });
  }
});
