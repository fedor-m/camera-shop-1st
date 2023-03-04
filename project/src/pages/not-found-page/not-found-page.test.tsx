import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundPage from './not-found-page';

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HelmetProvider>
        <HistoryRouter history={history}>
          <NotFoundPage />
        </HistoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
  });
});
