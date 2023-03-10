import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getReviewFormBlockedStatus } from '../../store/item-state/selectors';
import { sendReviewAction } from '../../store/item-state/api-actions';
import { MIN_REVIEW_LENGTH, MAX_RATING, MIN_RATING, RATINGS, Fields } from '../../const';

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
  const [isFormTouched, setFormTouched] = useState(false);
  const checkFieldsSubmittedCorrectly = (): boolean => {
    const { userName, advantage, disadvantage, review, rating } =
      formData;
    return (
      userName.trim().length > 0 &&
      advantage.trim().length > 0 &&
      disadvantage.trim().length > 0 &&
      review.trim().length >= MIN_REVIEW_LENGTH &&
      Number(rating) >= MIN_RATING &&
      Number(rating) <= MAX_RATING
    );
  };
  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (isFormTouched) {
      switch (name) {
        case Fields.Rating: {
          setErrors({
            ...errors,
            rating: Number(value) < MIN_RATING || Number(value) > MAX_RATING
          });
          break;
        }
        case Fields.UserName: {
          setErrors({
            ...errors,
            userName: value.trim().length === 0
          });
          break;
        }
        case Fields.Advantage: {
          setErrors({
            ...errors,
            advantage: value.trim().length === 0
          });
          break;
        }
        case Fields.Disadvantage: {
          setErrors({
            ...errors,
            disadvantage: value.trim().length === 0
          });
          break;
        }
        case Fields.Review: {
          setErrors({
            ...errors,
            review: value.trim().length < MIN_REVIEW_LENGTH
          });
          break;
        }
      }
    }
  };
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormTouched(true);
    if (checkFieldsSubmittedCorrectly()) {
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
        setFormTouched(false);
      });
    }
    else {
      setErrors({
        ...errors,
        userName: formData.userName.trim().length === 0,
        advantage: formData.advantage.trim().length === 0,
        disadvantage: formData.disadvantage.trim().length === 0,
        review: formData.review.trim().length < MIN_REVIEW_LENGTH,
        rating:
          Number(formData.rating) < MIN_RATING ||
          Number(formData.rating) > MAX_RATING
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
            ??????????????
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
          <p className="rate__message">?????????? ?????????????? ??????????</p>
        </fieldset>
        <div
          className={`${inputClass}${errors.userName ? ' is-invalid' : ''}`}
        >
          <label>
            <span className="custom-input__label">
              ???????? ??????
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <input
              type="text"
              name="userName"
              placeholder="?????????????? ???????? ??????"
              defaultValue={formData.userName}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <p className="custom-input__error">?????????? ?????????????? ??????</p>
        </div>
        <div
          className={`${inputClass}${errors.advantage ? ' is-invalid' : ''}`}
        >
          <label>
            <span className="custom-input__label">
              ??????????????????????
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <input
              type="text"
              name="advantage"
              placeholder="???????????????? ???????????????????????? ????????????"
              defaultValue={formData.advantage}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <p className="custom-input__error">?????????? ?????????????? ??????????????????????</p>
        </div>
        <div
          className={`${inputClass}${errors.disadvantage ? ' is-invalid' : ''}`}
        >
          <label>
            <span className="custom-input__label">
              ????????????????????
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <input
              type="text"
              name="disadvantage"
              placeholder="?????????????? ???????????????????? ????????????"
              defaultValue={formData.disadvantage}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <p className="custom-input__error">?????????? ?????????????? ????????????????????</p>
        </div>
        <div
          className={`${textAreaClass}${errors.review ? ' is-invalid' : ''}`}
        >
          <label>
            <span className="custom-textarea__label">
              ??????????????????????
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <textarea
              name="review"
              minLength={5}
              placeholder="???????????????????? ?????????? ???????????? ??????????????"
              defaultValue={formData.review}
              onChange={handleFieldChange}
              disabled={isReviewFormBlocked}
            />
          </label>
          <div className="custom-textarea__error">
            ?????????? ???????????????? ??????????????????????
          </div>
        </div>
      </div>
      <button
        className="btn btn--purple form-review__btn"
        type="submit"
        disabled={isReviewFormBlocked}
      >
        ?????????????????? ??????????
      </button>
    </form>
  );
}
export default ReviewForm;
