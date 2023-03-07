import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchCamerasAction } from '../../store/cameras-state/api-actions';
import {
  AppRoute,
  FIRST,
  SECOND
} from '../../const';
import { getPagesNumber, getItemNumbersToPage } from '../../utils';

type PaginationProps = {
  camerasLength: number;
};

function Pagination({ camerasLength }: PaginationProps): JSX.Element {
  const { id } = useParams();
  const page = !isNaN(Number(id)) ? Number(id) : FIRST;
  const pagesNumber = camerasLength && getPagesNumber(camerasLength);
  const pagesList = [...Array.from({ length: pagesNumber }).keys()];
  const isFirstPage = page === FIRST;
  const isSecondPage = page === SECOND;
  const isLastPage = page === pagesNumber;
  const itemsToPreviousPage = getItemNumbersToPage(page - 1);
  const itemsToNextPage = getItemNumbersToPage(page + 1);
  const dispatch = useAppDispatch();
  const paginationItems = pagesList.map((item, index) => (
    <li
      className="pagination__item"
      key={item + 1}
    >
      {
        <Link
          className={`pagination__link ${(index + 1) === page ? 'pagination__link--active' : ''}`}
          to={
            index === 0
              ?
              AppRoute.Catalogue
              :
              `${AppRoute.CataloguePage}/${index + 1}`
          }
          onClick={
            () => {
              const items = getItemNumbersToPage(index + 1);
              dispatch(fetchCamerasAction({ start: items.start, end: items.end }));
            }
          }
        >
          {index + 1}
        </Link>
      }
    </li>
  ));
  const previousPageButton = (
    <li className="pagination__item">
      <Link
        className="pagination__link pagination__link--text"
        to={
          !isSecondPage
            ?
            `${AppRoute.CataloguePage}/${page - 1}`
            :
            AppRoute.Catalogue
        }
        onClick={
          () => {
            dispatch(
              fetchCamerasAction(
                {
                  start: itemsToPreviousPage.start,
                  end: itemsToPreviousPage.end
                }
              )
            );
          }
        }
      >
        Назад
      </Link>
    </li>
  );
  const nextPageButton = (
    <li className="pagination__item">
      <Link
        className="pagination__link pagination__link--text"
        to={`${AppRoute.CataloguePage}/${page + 1}`}
        onClick={
          () => {
            dispatch(
              fetchCamerasAction(
                {
                  start: itemsToNextPage.start,
                  end: itemsToNextPage.end
                }
              )
            );
          }
        }
      >
        Далее
      </Link>
    </li>
  );

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          !isFirstPage && previousPageButton
        }
        {paginationItems}
        {
          !isLastPage && nextPageButton
        }
      </ul>
    </div>
  );
}
export default Pagination;
