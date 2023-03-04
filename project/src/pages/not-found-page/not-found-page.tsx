import { Helmet } from 'react-helmet-async';
import Icons from '../../components/icons/icons';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './not-found-page.css';
function NotFoundPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <Icons />
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <div className="container">
              <div className="not-found-page--div">
                <h1 className='title title--h1'>Страница не найдена</h1>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
export default NotFoundPage;
