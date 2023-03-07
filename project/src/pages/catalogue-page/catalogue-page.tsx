import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  getPromoLoadingStatus,
  getPromo,
} from '../../store/promo-state/selectors';
import {
  getCamerasLoadingStatus,
  getCameras,
  getCamerasTotalCount,
} from '../../store/cameras-load/selectors';
import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import SortForm from '../../components/sort-form/sort-form';
import Loader from '../../components/loader/loader';
import Cards from '../../components/cards/cards';
import Pagination from '../../components/pagination/pagination';
import Footer from '../../components/footer/footer';
import { AppRoute } from '../../const';

function CataloguePage(): JSX.Element {
  const isPromoLoading = useAppSelector(getPromoLoadingStatus);
  const promo = useAppSelector(getPromo);
  const areCamerasLoading = useAppSelector(getCamerasLoadingStatus);
  const cameras = useAppSelector(getCameras);
  const total = useAppSelector(getCamerasTotalCount);
  return (
    <>
      <Helmet>
        <title>Каталог</title>
      </Helmet>
      <Icons />
      <div className="wrapper">
        <Header />
        <main>
          {
            isPromoLoading
              ?
              <Loader />
              :
              promo && <Banner promo={promo} />
          }
          <div className="page-content">
            <Breadcrumbs page={AppRoute.Catalogue} />
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">
                  Каталог фото- и видеотехники
                </h1>
                <div className="page-content__columns">
                  <FilterForm />
                  <div className="catalog__content">
                    <SortForm />
                    {areCamerasLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {cameras && <Cards cameras={cameras} />}
                        {cameras && <Pagination camerasLength={total} />}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
export default CataloguePage;
