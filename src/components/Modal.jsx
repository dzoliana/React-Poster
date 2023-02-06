//hook
import { useNavigate } from 'react-router-dom';
import classes from './Modal.module.css';

function Modal({ children }) {
  // 6.)
  const navigate = useNavigate();
  function closeHandler() {
    navigate('..');
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;

//6.) 'useNavigate' se može izvršiti da bi se dobila funkcija za navigaciju, koju spremam u konstantu navigate. Stoga je možemo izvršiti kao funkciju u 'closeHandleru', a zatim u zagradama proslijeđujemo put do kojeg želimo ići kada se izvrši. Možemo ići do '/' kako bismo se klikom na pozadinu, vratiti na početnu stranicu. Možemo to učiniti fleksibilnijim i koristiti relativni put s dvije točke ispred ('..'), što funkcionira na isti način kao što dvije točke rade u terminalu kada se koristi naredba CD.
