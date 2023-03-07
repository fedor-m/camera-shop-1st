import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { Pages } from '../../types/pages';
import { Camera } from '../../types/camera';
import { Cameras } from '../../types/cameras';
import { APIRoute } from '../../const';

export const fetchCamerasAction = createAsyncThunk<
  Cameras,
  Pages,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCameras', async ({ start, end }, { extra: api }) => {
  const { data, headers } = await api.get<Camera[]>(
    `${APIRoute.Cameras}?&_start=${start}&_end=${end}`
  );
  const result: Cameras = {
    items: data,
    total: Number(headers['x-total-count']),
  };
  return result;
});

