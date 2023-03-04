import {camerasLoad} from './cameras-load';
import {fetchCamerasAction} from './api-actions';
import {CamerasLoad} from '../../types/state';
import {makeFakeStateCameras} from '../../mocks/mocks';

const fakeStateCameras = makeFakeStateCameras();

describe('Reducer: offerProcess', () => {
  let state: CamerasLoad;

  beforeEach(() => {
    state = {
      cameras: null,
      total: 0,
      areCamerasLoading: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(camerasLoad.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('Action: fetchCamerasAction', () => {
    it('should update loading status to "true" if action pending', () => {
      expect(camerasLoad.reducer(state, {type: fetchCamerasAction.pending.type}))
        .toEqual({...state, areCamerasLoading: true});
    });

    it('should update loading status to "false" and loaded offers if action fulfilled', () => {
      expect(camerasLoad.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: fakeStateCameras}))
        .toEqual({...state, areCamerasLoading: false, cameras: fakeStateCameras.items, total: fakeStateCameras.total});
    });
  });
});
