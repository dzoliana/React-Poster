import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Posts from './routes/Posts';
import NewPost from './routes/NewPost';
import RootLayout from './routes/RootLayout';
import './index.css';

// 5.)
const router = createBrowserRouter([
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
