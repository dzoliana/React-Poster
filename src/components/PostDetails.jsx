import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './PostDetails.module.css';

function PostDetails() {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;

//17.)
export async function loader({ params }) {
  const response = await fetch('http://localhost:8080/posts/' + params.postId);
  const resData = await response.json();
  return resData.post;
}

//17.) U ovom loaderu želim poslati zahtjev backend ruti 'app.get("/posts/:id"...)' (to je ekspresni JS nema nikakve veze s React routerom). Ali na kraju trebamo poslati zahtjev našoj backend domeni '/posts/:id'. Stoga ću ovdje ponovno upotrijebiti funkciju 'fetch' koja je poslala moj zahtjev HTTP 'localgost:8080/posts/' i zatim plus ID posta za koji je ova ruta aktivirana. Naravno, to će biti različiti ID-ovi pa nam treba način da dobijemo stvarni ID koji je učitan za to točno vrijeme kada je ova ruta aktivirana.
//A to možemo dobiti iz data objekta koji je proslijeđen loaderu. Baš kao što 'action' u 'NewPost' prima objekt koji npr uključuje request svojstvo (action({ request })) s detaljima o tom request objektu koji je generirao React router. Loader također prima objekt koji bi također bio request objekt, ali koji je još važnije ima objekt 'params'. Ovo također postoji za action funkcije. A ovaj 'params' objekt nam jednostavno omogućuje pristup ID-u za ovu rutu (params.postId).
//Ovo će vam dati stvarni ID posta koji je uključen u URL kada se posjeti ova ruta. I poslat će takav zahtjev backendu da dohvati (fetch) detalje za taj post. Sada možemo await-at da dobijemo naš response. Tada možemo dobiti podatke o odgovoru await-ajući 'response.json'. I onda želim returnati 'resData.post' zato što moj backend šalje natrag objekt s ključem 'res.json({ post });' koji sadrži post koji je dohvaćen (fetchan). Dakle, sada vraćamo jedan post, dobivamo joj pristup uz korištenje 'const post = useLoaderData();' u 'PostDetails' i registrirali smo ovaj loader za ovu details rutu.
//Za sve to moramo biti sigurni da možemo doći do ove rute. A kako bih to postigli, vratit ću se na komponentu 'PostList' gdje renderiram svoje postove, a time i na komponentu 'Post' gdje imam stvarni post. Nastavak u 'Post' komponenti pod 18.)
