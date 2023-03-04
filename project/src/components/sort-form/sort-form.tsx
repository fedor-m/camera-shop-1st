import { useState, ChangeEvent } from 'react';
import { Sort } from '../../const';

function SortForm(): JSX.Element {
  const state = {
    sort: '',
    order: '',
  };
  const [formData, setFormData] = useState(state);
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                value="price"
                onChange={handleFieldChange}
              />
              <label
                htmlFor="sortPrice"
                className={formData.sort === Sort.Price ? 'btn btn--purple' : 'btn btn--transparent'}
              >
                по цене
              </label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                value="rating"
                onChange={handleFieldChange}
              />
              <label
                htmlFor="sortPopular"
                className={formData.sort === Sort.Rating ? 'btn btn--purple' : 'btn btn--transparent'}
              >
                по популярности
              </label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="order"
                value="asc"
                aria-label="По возрастанию"
                onChange={handleFieldChange}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="order"
                value="desc"
                aria-label="По убыванию"
                onChange={handleFieldChange}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default SortForm;
