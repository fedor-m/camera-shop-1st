import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';

export const getCameras = (state: State): null | Camera[] =>
  state[NameSpace.Cameras].cameras;
export const getCamerasLoadingStatus = (state: State): boolean =>
  state[NameSpace.Cameras].areCamerasLoading;
export const getCamerasTotalCount = (state: State): number =>
  state[NameSpace.Cameras].total;
