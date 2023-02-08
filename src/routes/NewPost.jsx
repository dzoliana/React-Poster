//import { useState } from 'react';
import Modal from '../components/Modal';
import classes from './NewPost.module.css';
import { Link, Form, redirect } from 'react-router-dom';

function NewPost(/* { onAddPost } */) {
  /*   const stateData = useState('');
  stateData[0]; //current value
  stateData[1]; //state updating function */
  // const [modalIsVisible, setModalIsVisible] = useState(true);
  /*   const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState(''); */

  /*   function hideModalHandler() {
    setModalIsVisible(false);
  } */

  /* function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
    console.log(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  } */

  // function submitHandler(event) {
  //   event.preventDefault();
  //   const postData = {
  //     body: enteredBody,
  //     author: enteredAuthor,
  //   };

  //   //10.)
  //   //onAddPost(postData);
  //   //onCancel();
  // /*   fetch('http://localhost:8080/posts', {
  //     method: 'POST',
  //     body: JSON.stringify(postData),
  //     headers: { 'Content-Type': 'application/json' },
  //   }); */
  // }

  return (
    <Modal>
      <Form
        method="post"
        className={classes.form} /* onSubmit={submitHandler} */
      >
        <p>
          <label htmlFor="body">Text</label>
          <textarea
            id="body"
            name="body"
            required
            rows={3} /* onChange={bodyChangeHandler} */
          />
        </p>

        <p>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="author"
            required
            /* onChange={authorChangeHandler} */
          />
        </p>

        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

//12.) 14.)
export async function action({ request }) {
  //15.)
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); //{ body: '...', author: '...' }
  await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: { 'Content-Type': 'application/json' },
  });

  //16.)
  return redirect('/');
}

// 7.) Kada stisnemo na cancel u modal prozoru za novi post, želimo da se zatvori i koristimo Link umjesto button (<button type="button" onClick={onCancel}> ->  <Link to=".." type="button">).

//10.) Za submitting new data - za to možemo iskoristiti React Router. To je komponenta NewPost gdje na kraju imamo ovaj obrazac. I imamo hrpu koda za primanje korisničkog unosa i za sprječavanje zadanog ponašanja preglednika i poduzimanje nečega s podacima.
//Sada, ono što bismo mogli učiniti je da zgrabimo kod za slanje tih podataka u backend, i izrezati ga iz 'addPostHandlera' iz 'Postslist' komponente i riješiti se 'addPostHandlera'. I umjesto toga dodan je gore u 'submitHandler' umjesto pozivanja 'onAddPost' i 'onCancel'. Umjesto da to učinimo, mogli bismo poslati taj 'postData' u backend izravno iz komponente 'NewPost'. I doista, ovo bi funkcioniralo, ali tu je hrpa koda koji bismo ovdje morali napisati, pogotovo zato što vjerojatno nakon toga želimo zatvoriti modal, što znači da onda moramo dodati dodatni kod za navigating do druge rute programatically. Bolji pristup je korištenje posebne značajke koju nudi React Router jer baš kao što možete dodati loaders svojim rutama za učitavanje podataka prije nego što se aktiviraju i prije nego što se komponenta renderira, možete dodati actions rutama. Nastavak u 'main.jsx' pod 11.)

//12.) U tu fju dodamo naš kod za slanje tog zahtjeva (fetch). Još uvijek trebamo dobiti postData... Kako sada doći do podataka koje je korisnik unio u form? Pa prije smo za to morali upravljati sa 'useState'. Sada kada prihvatimo React Router, 'useState' možemo izbrisati i funkcije koje su ažurirale stanje (bodyChangeHandler, authorChangeHandler). Također možemo izbrisati 'submitHandler', useState import, 'onSubmit' događaj (na elementu form unutar <Modal>), i slušatelj 'onChange' na imputs (unutar textarea). I umjesto toga, sve što ovdje moramo učiniti je dodati 'name' atribut koji kasnije želimo koristiti za izdvajanje i slanje naših podataka. Tako npr u bakendu moji postovi imaju body, i author. I ako se želim držati toga za body i author svom 'tekstarea' dajem 'name:body' i 'name:author'.
// 'Name' atribut je zadani HTML atribut koji se može dodati form imputs i prema zadanim postavkama, ako je obrazac poslan, preglednik će, kao što je ranije spomenuto, generirati zahtjev i pokušati ga poslati poslužitelju koji je poslužio tu web stranicu. Što bi bilo pogrešno jer taj poslužitelj koji poslužuje tu web stranicu nema nikakav kod za rukovanje ovim zahtjevom s form podacima na pozadini (backend) jer mi nemamo pozadinski kod kao dio ove React aplikacije. Ali tu sada dolazi React Router. Možemo uvesti posebnu komponentu iz React Routera, a to bi bila komponenta 'Form' s velikim F. A ako to koristimo umjesto uobičajenog ugrađenog elementa form (malo f), React Router će obraditi slanje obrasca (form) i to će spriječiti zadani preglednik da pošalje zahtjev, ali će i dalje prikupljati sve ulazne podatke, i dalje će generirati objekt s tim podacima za nas, i pozvati 'action' iz 'main.jsx' koja je dodijeljena ruti, koja sadrži 'Form'. Nastavak u 'main.jsx' pod 13.)

// Još jedna posljednja stvar koju ću učiniti je da ću dodati 'method' prop u komponentu 'Form' i postaviti je na 'post' (method='post'). Sada je važno razumjeti da nikakav stvarni zahtjev za post neće biti poslan nigdje jer je to još uvijek kod na strani klijenta, ali ono što će React Router učiniti iza kulisa je da će generirati request objekt s tim podacima obrasca uključenim u njega. I dat će ovom request objektu metodu koju bismo onda mogli koristiti u 'action' fji da saznamo koji je obrazac poslan kada je action pokrenut u slučaju da imamo više obrazaca koji pripadaju istoj ruti s istom radnjom. Čak i bez toga, dobra je ideja koristiti semantički ispravan HTTP, a budući da ovdje stvaramo novu objavu, metoda 'post' ima smisla jer je to obično HTTP metoda koja se koristi za stvaranje resursa.

//14.) Dakle, s tim se zahtjev ne šalje backend-u. Umjesto toga, action će se izvršiti i imamo neki argument podataka 'action(data)' (sada kao destrukturiran action({request})). Ovo automatski prosljeđuje React Router. I to nisu podaci od form, umjesto toga to je objekt koji, npr ima svojstvo request s tim request objektom koji je generiran i napravljen od React Router-a. Dakle, React Router poziva funkciju action i prosljeđuje objekt koji uključuje request objekt koji je generiran ovoj action funkciji. Stoga tu možemo upotrijebiti destrukturiranje objekta da se dočepamo tog objekta request. Nastavak 15.).

//15.) I sada taj objekt zahtjeva 'formData' metodu. A kada izvršite tu formData metodu, dobivate pristup podacima kodiranim u tom obrascu, dakle podacima koje je ekstrahirao React Router kada je analizirao taj obrazac i pozvao tu radnju. Sada, formData daje promise, pa bismo ovo trebali pretvoriti u asinkronu funkciju kako bismo mogli koristiti await. I onda smo ovdje dobili naš formData objekt koji je prilično složen objekt. To nije obična pohrana ključeva i vrijednosti. Umjesto toga, to je objekt koji, npr ima get metodu, koju možete pozvati da dobijete vrijednost danu za polje 'body' (formData.get('body')). Tako možete izdvojiti podatke koje je dao korisnik.
// Lakši pristup umjesto toga stvoriti 'postData' konstantu i koristiti ugrađenu klasu Object i pozvati 'fromEntries' i proslijediti joj ovaj 'formData' objekt. Ovo će jednostavno stvoriti osnovni objekt key-vvalue gdje imate ključ body s nekom vrijednošću i ključ author s nekom vrijednošću u našem slučaju ovdje jer imamo tijelo i autora kao imenovane vrijednosti gore u 'Form'. Dakle, tako možemo ekstrahirati formData uz pomoć React Routera. Opet, sve se još uvijek događa na strani klijenta. I stoga sada imamo postData koji su nam potrebni za slanje tog zahtjeva. Također možemo dodati await da čekamo da se zahtjev pošalje (await fetch...). Također bismo mogli dobiti odgovor (response) i analizirati odgovor, npr kako bismo saznali je li nešto pošlo po zlu. Nastavak u 16.)

// 16.) Sada, nakon slanja ovog zahtjeva, možemo pozvati funkciju preusmjeravanja (resirect). Ovo je uvezeno iz react-router-dom i možete ga pozvati u svojim funkcijama action i loader kako biste returnali rezultat pozivanja ove funkcije. Sada, ono što preusmjeravanje radi je da generira response objekt, koji se na kraju vraća ovom radnjom. A ako vratite takav response objekt, React Router će pogledati taj objekt i ako je to odgovor preusmjeravanja (resirect response), što je vrsta odgovora koji se generira pozivanjem preusmjeravanja, React Router će se jednostavno pomaknuti na tu drugu rutu na koju ste pokušavali preusmjeriti. Dakle, ovdje bismo mogli staviti ('/') kako bismo bili sigurni da nakon što je ova akcija pozvana, zapravo natjeramo React Router da učita drugu rutu, rutu s kosom crtom puta, što je u ovom slučaju ruta za 'element: <Posts/>'. Tako da napuštamo rutu 'create-post' i umjesto nje prelazimo na ovu rutu. Tako možemo pokrenuti ovu radnju navigacije. Opet, ovdje sve izvodi React Router. Ovdje nema backend koda. Samo šaljemo zahtjev backend, ali ovaj kod unutar funkcije action radi na strani klijenta u pregledniku.
// Sada koristimo React Router za slanje i dohvaćanje podataka. I kao rezultat toga, možete vidjeti da su naše komponente postale mnogo tanje. Ne moramo ručno pratiti što je uneseno. Ne moramo ručno rukovati slanjem obrasca i spriječiti zadano. Ne moramo učiniti ništa od toga. Umjesto toga prihvaćamo React Router za slanje i dobivanje podataka, za navigaciju između stranica, i zato je React Router izvrstan.
