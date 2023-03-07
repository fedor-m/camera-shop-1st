import { render, screen } from '@testing-library/react';
import FilterForm from './filter-form';
describe('Component: FilterForm', () => {
  it('should render correctly', () => {
    render(<FilterForm />);
    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('от')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('до')).toBeInTheDocument();
  });
}
);
