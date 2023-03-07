import { useState, ChangeEvent } from 'react';
import {
  RANGES,
  CATEGORIES,
  TYPES,
  LEVELS
} from '../../const';

function FilterForm(): JSX.Element {
  const state = {
    gte: '',
    lte: '',
  };
  const [range, setRange] = useState(state);
  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRange({ ...range, [name]: value });
  };
  const [categories, setCategories] = useState([] as string[]);
  const handleCheckCategories = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedCategories = [...categories];
    if (event.target.checked) {
      updatedCategories = [...categories, event.target.value];
    } else {
      updatedCategories.splice(categories.indexOf(event.target.value), 1);
    }
    setCategories(updatedCategories);
  };
  const [types, setTypes] = useState([] as string[]);
  const handleCheckTypes = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedTypes = [...types];
    if (event.target.checked) {
      updatedTypes = [...types, event.target.value];
    } else {
      updatedTypes.splice(types.indexOf(event.target.value), 1);
    }
    setTypes(updatedTypes);
  };
  const [levels, setLevels] = useState([] as string[]);
  const handleCheckLevels = (event: ChangeEvent<HTMLInputElement>) => {
    let updatedLevels = [...types];
    if (event.target.checked) {
      updatedLevels = [...levels, event.target.value];
    } else {
      updatedLevels.splice(levels.indexOf(event.target.value), 1);
    }
    setLevels(updatedLevels);
  };
  const handleResetForm = () => {
    setRange(state);
    setCategories([]);
    setTypes([]);
    setLevels([]);
  };
  const rangeInputs = RANGES.map(
    (item) => (
      <div
        className="custom-input"
        key={item.key}
      >
        <label>
          <input
            type="number"
            name={item.key}
            placeholder={item.value}
            onChange={handleRangeChange}
          />
        </label>
      </div>
    )
  );
  const categoriesInputs = CATEGORIES.map(
    (item) => (
      <div
        className="custom-checkbox catalog-filter__item"
        key={item.key}
      >
        <label>
          <input
            type="checkbox"
            name={item.key}
            value={item.value}
            onChange={handleCheckCategories}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">
            {item.value}
          </span>
        </label>
      </div>
    )
  );
  const typesInputs = TYPES.map(
    (item) => (
      <div
        className="custom-checkbox catalog-filter__item"
        key={item.key}
      >
        <label>
          <input
            type="checkbox"
            name={item.key}
            value={item.value}
            onChange={handleCheckTypes}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">
            {item.value}
          </span>
        </label>
      </div>
    )
  );
  const levelsInputs = LEVELS.map(
    (item) => (
      <div
        className="custom-checkbox catalog-filter__item"
        key={item.key}
      >
        <label>
          <input
            type="checkbox"
            name={item.key}
            value={item.value}
            onChange={handleCheckLevels}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">
            {item.value}
          </span>
        </label>
      </div>
    )
  );
  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              {rangeInputs}
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {categoriesInputs}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">
              Тип камеры
            </legend>
            {typesInputs}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            {levelsInputs}
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={handleResetForm}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}
export default FilterForm;
