import { useEffect } from 'react';
import { isEscKey } from '../../utils';

type ModalProps = {
  openModalWindow: (state: boolean) => void;
  title: string;
  children?: JSX.Element;
};

function Modal({ openModalWindow, title, children }: ModalProps): JSX.Element {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isEscKey(event.key)) {
        openModalWindow(false);
      }
    };
    let isMounted = true;
    if (isMounted) {
      document.body.classList.add('no-scroll');
      document.addEventListener('keydown', handleEscKey);
    }
    return () => {
      isMounted = false;
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [openModalWindow]);
  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={() => openModalWindow(false)}
        />
        <div className="modal__content">
          <p className="title title--h4">{title}</p>
          {children}
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => openModalWindow(false)}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
