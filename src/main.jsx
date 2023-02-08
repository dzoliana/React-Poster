import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//8.)
import Posts, { loader as postsLoader } from './routes/Posts';
import NewPost, { action as newPostAction } from './routes/NewPost';
import PostDetails, {
  loader as PostDetailsLoader,
} from './components/PostDetails';
import RootLayout from './routes/RootLayout';
import './index.css';

// 5.)
/* const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        children: [{ path: '/create-post', element: <NewPost /> }],
      }, //<our-domain>
    ],
  },
]); */

// 6.)
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postsLoader,
        children: [
          { path: '/create-post', element: <NewPost />, action: newPostAction },
          {
            path: '/:postId',
            element: <PostDetails />,
            loader: PostDetailsLoader,
          },
        ],
      }, //<our-domain>
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

//Za stvaranje 3 odvojene stranice: starting page, new post page i post detail page ako kliknem na post. Zato importamo react-router-dom i umjeto 'App' pišemo 'RouterProvider'
//ovo omogućuje routing i govori React Routeru da bi trebao promatrati URL i početi renderirati različite komponente za različite staze. Ali samo dodavanjem na ovaj način neće uspjeti. I to ima smisla jer naravno također morate reći React Routeru koje komponente treba učitati za koje staze, tako da morate konfigurirati usmjerivač.
//Zato RouterProvider uzima ruter prop koji želi route konfiguracijski objekt kao vrijednost. A taj se konfiguracijski objekt stvara pomoću funkcije uvezene iz react-router-dom koja se zove 'createBrowserRouter'. Zatim možemo pozvati tu funkciju da stvorimo takav konfiguracijski objekt rute i pohranimo ga u konstantu, te proslijedimo tu konstantu, tu vrijednost konfiguracijskog objekta, kao vrijednost router prop-u na 'RouterProvider'.

// 5.) 'createBrowserRouter' uzima niz svih ruta koje želite imati, popis route definicija. A definicija rute je jednostavno objekt. Objekt koji obično treba imati svojstvo staze gdje vi, npr definirate putanju jedne rute. Dakle, ovdje bismo mogli imati više objekata, a svaki objekt predstavlja jednu rutu, jedan put i komponentu koja bi se trebala učitati za put. Dakle, ovdje bismo mogli imati putanju '/nothing' kao glavnu rutu, koja se zatim učitava za našu domenu, što je jednako samom ulasku u našu domenu.
//Također biste trebali dodati svojstvo elementa gdje sada definirate JSX kod koji bi trebao biti prikazan na zaslonu kada ova ruta postane aktivna, dakle kada je ova staza aktivna. A ovdje u mom slučaju to je trenutno samo komponenta aplikacije (komponenta koju smo prethodno prikazali sada je komponenta koja bi trebala biti prikazana ako je putanja '/nothing').

//Prilikom izrade složenijih React aplikacija s Routingom, prilično je uobičajeno da neke rute također trebaju imati zajedničke elemente izgleda (layout). Na primjer, glavna navigacijska traka na vrhu bi vjerojatno trebala biti vidljiva na svim rutama koje imamo. A da biste to postigli, možete dodati takozvane rute izgleda (layout routes). Koje su zapravo samo normalne rute, ali rute koje ugnijezde druge rute unutar sebe. Da bismo dodali takvu rutu izgleda, mogli bismo dodati novu definiciju rute. Pozicija u nizu nije bitna. I onda je ovdje staza još uvijek '/ništa', jer želim stvoriti raspored koji obavija sve rute bez obzira koju stazu imaju. Zatim moramo dodati element i novu komponentu.

// 6.) React router, kada se koristi verzija 6.4 ili novija pomaže u dohvaćanju i slanju podataka. Budući da dohvaćamo podatke, u komponenti Posts, imamo komponentu PostsList, a tamo dohvaćamo (fetching) podatke. U 'PostsList' imamo useEffect hook gdje učitavamo postove i postavljamo postove. U 'PostsList', 'addPostHandler' također moramo kodirati za slanje postData, ali taj kod se trenutno više ne koristi.
// Kada je riječ o fetching podataka, mogli bismo se zadržati na useEffect. Ali kada koristite React router verzije 6.4 ili novije, imamo praktičniji način da to učinimo. Budući da s tom verzijom možete ići na svoje definicije rute do rute kojoj su potrebni podaci, npr ruta Posts gore, i možete dodati svojstvo 'loader' toj definiciji rute. Sada svojstvo 'loader' očekuje da će dobiti funkciju kao vrijednost, a React router će izvršiti tu funkciju kad god se ta ruta aktivira, dakle kad god se sprema prikazati 'element'. Tada se ta funkcija izvršava i možete se koristiti za učitavanje i pripremu bilo kojih podataka koji bi mogli biti potrebni komponenti rute ili bilo kojoj drugoj komponenti koja se koristi kao dio te rute. Stoga bismo u fji mogli dodati data fetching logiku za slanje tog HTTP zahtjeva. Ali kako bi JSX datoteka bila glavna, uobičajeno je otići u route component datoteku u 'Posts.jsx', i tamo export-ati dodatnu funkciju, koja se obično zove 'loader'. Nastavak u Post.jsx - 7.)

//8.) A onda u main.jsx, možemo importati loader i dati mi 'as postsLoader' jer bismo mogli imati više loader-a s različitih ruta i ne želimo sukobe imena. Na kraju je funkcija loader iz 'Posts.jsx' dodijeljena kao vrijednost za ovo svojstvo loader u definiciji rute 'loader: postsLoader'. Stoga će React router izvršiti tu funkciju i pričekati da se obećanje riješi prije nego što renderira element '<Posts/>'.
//A podaci koje returnamo iz fje 'loader' iz 'Posts' zapravo su izloženi elementu Posts komponente. React router će se pobrinuti da se returnanim podacima može pristupiti u tom elementu rute ili u bilo kojoj ugniježđenoj komponenti, tako i u '<PostsList/>'. Nastavak u PostsList 9.)

// 11.) Dakle, ruti 'create-post' unutar router, možemo dodati 'action' postavljanjem svojstva akcije. I baš kao i loader, akcija želi funkciju kao vrijednost. Međutim, ta će se funkcija sada pokrenuti kada se obrazac (form) pošalje na toj ruti.
// Što znači da bismo u komponenti 'NewPost' mogli exportati takvu akcijsku funkciju kako bismo ponovno imali taj kod blizu komponente kojoj pripada. A onda bismo u tu fju mogli dodati naš kod za slanje tog zahtjeva (fetch). Nastavak u NewPost pod 12.)

//13.) Dakle, sada kada se koristi komponenta 'Form', React Router će se na kraju pobrinuti da se 'action' izvrši i stoga možemo importat 'action as newPostAction' funkciju, koju export-amo u 'NewPost'-u. Pišemo pseudonim u slučaju da imamo više akcija s različitih ruta kako bismo izbjegli sukobe. I dodijelite to kao vrijednost za svojstvo akcije dolje 'action: newPostAction'.
//Tako da će na kraju React Router izvršiti 'action' funkciju ako se pošalje 'Form' u 'NewPost.jsx'.
