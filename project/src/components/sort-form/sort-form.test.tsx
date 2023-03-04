import { render, screen } from '@testing-library/react';
import SortForm from './sort-form';
describe('Component: SortForm', () => {
  it('should render correctly', () => {
    render(<SortForm />);
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });
}
);
