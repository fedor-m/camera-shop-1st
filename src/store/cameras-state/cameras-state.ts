import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CamerasState } from '../../types/state';
import { fetchCamerasAction } from './api-actions';

const initialState: CamerasState = {
  cameras: null,
  areCamerasLoading: false,
  total: 0
};

export const camerasState = createSlice({
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
