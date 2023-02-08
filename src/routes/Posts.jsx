import { Outlet } from 'react-router-dom';
import PostsList from '../components/PostsList';

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

// 7.)
export async function loader() {
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  return resData.posts;
}

// 7.) Kako bi JSX datoteka bila glavna, uobičajeno je otići u route component datoteku u 'Posts.jsx', i tamo export-ati dodatnu funkciju, koja se obično zove 'loader'. Jer će to biti funkcija koja će biti dodijeljena tom svojstvu loader-a u definiciji rute u 'main.jsx'. Sada se ova funkcija loader još uvijek izvršava na strani klijenta. To je još uvijek kod koji se izvršava u pregledniku. I stoga, tamo unutra možete raditi što god želite, a što se također može učiniti bilo gdje drugdje u ovoj aplikaciji. Ovdje želim dohvatiti (fetch-ati) svoje postove. Stoga ću otići do komponente 'PostsList' i kopirati response i resData.
//Kod za ažuriranje stanja (updating state) nije bitan jer se funkcija loader izvršava izvan komponente i ne može manipulirati stanjem komponente. Stoga sam izrezao kod za fetching podataka i vratio ga u 'Posts.jsx' u funkciju loader. Finkciji dodajemo async zbog await-a i to možemo učiniti jer ova funkcija koja će biti dodijeljena svojstvu loader u 'main.jsx' može biti asinkrona ili sinkrona funkcija. Može vratiti obećanje ili ne mora. React router ne mari za to. Ali ako vrati obećanje, React router će pričekati da se to obećanje riješi (resolve) prije nego što renderira komponentu rute (element: <Posts/>). Stoga ovdje možemo koristiti async i zatim poslati naš zahtjev za dohvaćanje (fetch) svih postova i ekstrahiranje podataka. I onda možemo returnati podatke koje želimo izložiti elementu koji je prikazan za aktivnu rutu. U ovom slučaju 'resData.posts'. Nastavak u main.jsx 8.)
