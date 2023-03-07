import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import { store } from './store/store';
import { fetchCamerasAction } from './store/cameras-load/api-actions';
import { fetchPromoAction } from './store/promo-state/api-actions';
import App from './components/app/app';
import { FIRST_PAGE_DATA } from './const';

store.dispatch(fetchCamerasAction(FIRST_PAGE_DATA));
store.dispatch(fetchPromoAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
