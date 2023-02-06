//Komponente koje se koriste kao rute trebaju ići u mapu routes, a ostale komponente koje se koriste negdje drugdje ostat će u mapi komponenti.

import { Outlet } from 'react-router-dom';
import MainHeader from '../components/MainHeader';

//ovo će biti layout route koji je omotan oko drugih ruta tako da se MainHeader dijeli, a zatim se sadržaj gornjih ruta prikazuje ispod ovog MainHeadera.
function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default RootLayout;

//sada dijelimo ovu komponentu MainHeader, ali ne govorimo react-routeru gdje da prikaže sadržaj ovih ugniježđenih ruta. I to je, naravno, nešto što bismo trebali učiniti. A to radimo odlaskom na RootLayout i import-amo Outlet komponente iz react-router-dom. To je posebna komponenta koju pruža paket react-router, koja bi trebala biti prikazana na mjestu gdje bi trebao biti prikazan stvarni sadržaj ugniježđene rute, trebao bi biti umetnut. Dakle, ovo je jednostavno rezervirano mjesto gdje ugniježđene rute mogu prikazati svoj sadržaj u RootLayoutu.
