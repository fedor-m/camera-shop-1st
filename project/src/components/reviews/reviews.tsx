import { useState } from 'react';
import { Review } from '../../types/review';
import ReviewCard from '../review-card/review-card';
import { REVIEWS_ON_PAGE } from '../../const';

type ReviewsProps = {
  reviews: Review[] | null;
  openModalWindow: (id: boolean) => void;
};

function Reviews({ reviews, openModalWindow }: ReviewsProps): JSX.Element {
  const [reviewsToDisplay, setReviewsToDisplay] = useState(REVIEWS_ON_PAGE);
  const [isMoreReviewsButtonDisabled, setIsMoreReviewsButtonDisabled] = useState(false);
  const reviewCards = reviews && reviews.slice(0, reviewsToDisplay).map((review) => (
    <ReviewCard
      key={review.id}
      review={review}
    />
  ));
  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button
            className="btn"
            type="button"
            onClick={() => openModalWindow(true)}
          >
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {reviewCards}
        </ul>
        <div className="review-block__buttons">
          {
            !isMoreReviewsButtonDisabled &&
            <button
              className="btn btn--purple"
              type="button"
              onClick={
                () => {
                  const newReviews = reviewsToDisplay + REVIEWS_ON_PAGE;
                  const areReviewsReachedLimit = reviews && (newReviews >= reviews.length || reviews.length < REVIEWS_ON_PAGE);
                  if (areReviewsReachedLimit) {
                    setIsMoreReviewsButtonDisabled(true);
                  }
                  setReviewsToDisplay(newReviews);
                }
              }
            >
              Показать больше отзывов
            </button>
          }
        </div>
      </div>
    </section >
  );
}
export default Reviews;
