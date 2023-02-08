import { Link } from 'react-router-dom';
import classes from './Post.module.css';

//18.)
function Post({ id, author, body }) {
  return (
    <li className={classes.post}>
      <Link to={id}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </Link>
    </li>
  );
}

export default Post;

//18.) I to unutar Post komponente želim zamotati sa 'Link' i importamo komponentu Link iz react-router-dom-a. Zatim postavite put do ID-a do kojeg želim navigirati (<Link to={id}>). Ovo bi opet trebalo biti dinamično jer različiti postovi imaju različite id-ove. Dakle, dodaje se iza trenutno aktivne staze. To bi nam trebalo dati poveznicu koja vodi do objave s određenim ID-om. Kako bih bili sigurni da je pravilno stiliziran, otići ću na CSS modula za objavu i dodati kratki novi stil. Točna pozicija nije važna, targetirat ćemo tehnologiju anchor koju je prikazala komponenta Link i postaviti tekst decoration na none. Uz to samo moramo biti sigurni da je vrijednost za ID proslijeđena u post. Nastavak u 'PostList' komponenti pod 19.)
