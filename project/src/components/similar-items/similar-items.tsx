import { useState } from 'react';
import { Camera } from '../../types/camera';
import Card from '../card/card';
import { SLIDES_ON_PAGE } from '../../const';

type SimilarItemsProps = {
  cameras: Camera[];
};

function SimilarItems({ cameras }: SimilarItemsProps): JSX.Element {
  const indicies = cameras.map((camera) => camera.id);
  const [firstSlide, setFirstSlide] = useState(0);
  const [lastSlide, setLastSlide] = useState(SLIDES_ON_PAGE);
  const slides = indicies.slice(firstSlide, lastSlide);
  const [isBackButtonDisabled, setBackButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
  const cards = cameras.map((camera) => (
    <Card
      camera={camera}
      key={camera.id}
      isActive={slides.includes(camera.id)}
    />
  ));
  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {cards}
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled={isBackButtonDisabled}
            onClick={
              () => {
                const newFirstSlide = firstSlide - SLIDES_ON_PAGE;
                const newLastSlide = lastSlide - SLIDES_ON_PAGE;
                if (newFirstSlide === 0) {
                  setBackButtonDisabled(true);
                }
                setFirstSlide(newFirstSlide);
                setLastSlide(newLastSlide);
                setNextButtonDisabled(false);
              }
            }
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            disabled={isNextButtonDisabled}
            onClick={
              () => {
                const newFirstSlide = firstSlide + SLIDES_ON_PAGE;
                const newLastSlide = lastSlide + SLIDES_ON_PAGE;
                if (newLastSlide === cameras.length) {
                  setNextButtonDisabled(true);
                }
                setFirstSlide(newFirstSlide);
                setLastSlide(newLastSlide);
                setBackButtonDisabled(false);
              }
            }
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section >
  );
}
export default SimilarItems;
