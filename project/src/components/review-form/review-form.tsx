import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getReviewFormBlockedStatus } from '../../store/item-load/selectors';
import { sendReviewAction } from '../../store/item-load/api-actions';
import { MIN_REVIEW_LENGTH, MAX_RATING, MIN_RATING, RATINGS } from '../../const';

type ReviewFormProps = {
  itemID: number;
};

function ReviewForm({ itemID }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isReviewFormBlocked = useAppSelector(getReviewFormBlockedStatus);
  const formState = {
    cameraId: itemID,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: '0',
  };
  const errorsState = {
    userName: false,
    advantage: false,
    disadvantage: false,
    review: false,
    rating: false,
  };
  const [formData, setFormData] = useState(formState);
  const [errors, setErrors] = useState(errorsState);
  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      !errors.userName &&
      !errors.advantage &&
      !errors.disadvantage &&
      !errors.review &&
      !errors.rating
    ) {
      const { cameraId, userName, advantage, disadvantage, review, rating } =
        formData;
      dispatch(
        sendReviewAction({
          cameraId,
          userName,
          advantage,
          disadvantage,
          review,
          rating: +rating,
        })
      ).then(() => {
        setFormData(formState);
        setErrors(errorsState);
      });
    } else {
      setErrors({
        ...errors,
        userName: formData.userName === '',
        advantage: formData.advantage === '',
        disadvantage: formData.disadvantage === '',
        review: formData.review.length < MIN_REVIEW_LENGTH,
        rating:
          isNaN(Number(formData.rating)) ||
          Number(formData.rating) > MAX_RATING ||
          Number(formData.rating) < MIN_RATING,
      });
    }
  };
  const starsInputs = RATINGS.map((rating) => (
    <Fragment key={`star-${rating.mark}`}>
      <input
        className="visually-hidden"
        id={`star-${rating.mark}`}
        name="rating"
        type="radio"
        defaultValue={rating.mark}
        onChange={handleFieldChange}
        disabled={isReviewFormBlocked}
      />
      <label
        className="rate__label"
        htmlFor={`star-${rating.mark}`}
        title={rating.text}
      />
    </Fragment>
  ));
  const rateClass = 'rate form-review__item';
  const inputClass = 'custom-input form-review__item';
  const textAreaClass = 'custom-textarea form-review__item';
  return (
    <form method="post" noValidate onSubmit={handleFormSubmit}>
      <div className="form-review__rate">
        <fieldset
          className={`${rateClass}${errors.rating ? ' is-invalid' : ''}`}
        >
          <legend className="rate__caption">
            Рейтинг
            <svg width="9" height="9" aria-hidden="true">
              <use xlinkHref="#icon-snowflake" />
            </svg>
          </legend>
          <div className="rate__bar">
            <div className="rate__group">
              {starsInputs}
            </div>
            <div className="rate__progress">
              <span className="rate__stars">{formData.rating}</span>
              <span>&nbsp;</span>
              <span>/</span>
              <span>&nbsp;</span>
              <span className="rate__all-stars">{MAX_RATING}</span>
            </div>
          </div>
          <p className="rate__message">Нужно оценить товар</p>
        </fieldset>
        <div
          className={`${inputClass}${errors.userName ? ' is-invalid' : ''}`}
        >
          <label>
            <span className="custom-input__label">
              Ваше имя
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <input
              type="text"
              name="userName"
              placeholder="Введите ваше имя"
              defaultValue={formData.userName}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <p className="custom-input__error">Нужно указать имя</p>
        </div>
        <div
          className={`${inputClass}${errors.advantage ? ' is-invalid' : ''}`}
        >
          <label>
            <span className="custom-input__label">
              Достоинства
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <input
              type="text"
              name="advantage"
              placeholder="Основные преимущества товара"
              defaultValue={formData.advantage}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <p className="custom-input__error">Нужно указать достоинства</p>
        </div>
        <div
          className={`${inputClass}${errors.disadvantage ? ' is-invalid' : ''}`}
        >
          <label>
            <span className="custom-input__label">
              Недостатки
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <input
              type="text"
              name="disadvantage"
              placeholder="Главные недостатки товара"
              defaultValue={formData.disadvantage}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <p className="custom-input__error">Нужно указать недостатки</p>
        </div>
        <div
          className={`${textAreaClass}${errors.review ? ' is-invalid' : ''}`}
        >
          <label>
            <span className="custom-textarea__label">
              Комментарий
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <textarea
              name="review"
              minLength={5}
              placeholder="Поделитесь своим опытом покупки"
              defaultValue={formData.review}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <div className="custom-textarea__error">
            Нужно добавить комментарий
          </div>
        </div>
      </div>
      <button
        className="btn btn--purple form-review__btn"
        type="submit"
        disabled={isReviewFormBlocked}
      >
        Отправить отзыв
      </button>
    </form>
  );
}
export default ReviewForm;
