//9.)
//import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import Post from './Post';
import classes from './PostsList.module.css';

function PostsList() {
  const posts = useLoaderData();
  // 3.)
  // fetch('http://localhost:8080/posts').then(response=>response.json()).then(data=>{setPosts(data.posts)});
  /*   const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false); */

  // 4.)
  /* useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      //const response = await fetch('http://localhost:8080/posts');
      //const resData = await response.json(); 
      setPosts(resData.posts);
      setIsFetching(false);
    }
    fetchPosts();
  }, []); */

  /* function addPostHandler(postData) {
    //2.)
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: { 'Content-Type': 'application/json' },
    });
    setPosts(existingPosts => [postData, ...existingPosts]);
  } */

  return (
    <>
      {
        /* !isFetching && */ posts.length > 0 && (
          <ul className={classes.posts}>
            {posts.map(post => (
              //19.)
              <Post
                key={post.id}
                id={post.id}
                author={post.author}
                body={post.body}
              />
            ))}
          </ul>
        )
      }
      {
        /* !isFetching && */ posts.length === 0 && (
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h2>There are no posts yet.</h2>
            <p>Start adding some!</p>
          </div>
        )
      }
      {/* {isFetching && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>Loading posts...</p>
        </div>
      )} */}
    </>
  );
}

export default PostsList;

// 2.) A da bismo to učinili, možemo koristiti fetch API. Funkcija fetch dostupna je u preglednicima, nije React značajka. A fetch se može koristiti za slanje HTTP zahtjeva. I za razliku od imena koje sugerira, ne možete ga koristiti samo za dohvaćanje podataka, već i za slanje podataka. Fetch sada uzima url na koji želite poslati zahtjev, u ovom slučaju to je lokalni host 8080 -> http://localhost:8080 jer ovaj backend radi lokalno na našem računalu.
// Također moramo konfigurirati ovaj zahtjev jer prema zadanim postavkama fetch šalje get zahtjev i sada možemo proslijediti objekt kao drugi argument za fetch kako bismo postavili method: post kako bismo pretvorili ovo u post request i zatim dodali body (podatke koje treba priložiti uz ovaj odlazni zahtjev). A ovdje podaci koje želim poslati su podaci o post-u 'postData'. Ali ovo moramo pretvoriti u JSON format, što možemo učiniti s ugrađenim JSON objektom i metodom stringify.
// I posljednje, trebali bismo dodati 'headers' ovom odlaznom zahtjevu postavljanjem objekta na svojstvo ovog zaglavlja. Dodajemo zaglavlje 'Content-type' i postavljamo na aplication/json.
//tako možemo poslati post request sa postData pravim putem na dummy backend
//Fetch će zatim poslati ovaj zahtjev, kliknuti API rutu u 'app.js' u backendu i onda će konačno vratiti odgovor. Trenutačno me ne zanima odgovor.
// Ako dodam novi post u pregledniku, on se i dalje pojavljuje lokalno jer i dalje ažuriram svoje postove kao i prije. Ali ako se prebacimo na backend, trebali bismo vidjeti da smo u 'posts.json' također dobili post. Dakle, doista je primljen na pozadini i tamo pohranjen. I to je općenito način na koji možemo poslati zahtjev s našeg frontenda na backend.

// 3.) Kako ćemo fetch-at postove kada reloadamo stranicu? Zato mogli reći da idete na PostsList jer nam tamo trebaju postovi. Tu također šaljemo zahtjev za dohvaćanje (fetch). Ciljamo na isti URL kao i prije jer ako pogledamo pozadinu, vidimo da nam na kraju zahtjev za get('/posts', async...) daje sve naše postove. A onda ovdje već šaljemo get zahtjev jer to je zadano za funkciju dohvaćanja tako da ne moramo konfigurirati ovaj zahtjev. Sada na kraju, želim biti siguran da ažuriramo svoje postove (u const [posts, setPosts] = useState([]);) kad god dobijemo odgovor. Za to možete pokušati koristiti async await ali to nije baš podržano. Component functions moraju vraćati JSX kod ili neke druge vrijednosti, ali obećanja se ne bi trebala vraćati, barem za ovu standardnu komponentu ovdje bez korištenja bilo kakvog dodatnog okvira povrh Reacta ili bilo čega sličnog. Dakle, obećanja se možda neće vratiti, a budući da dodavanje async ispred funkcije uvijek osigurava da ova funkcija vrati promise jer se svi podaci koje returna funkcija zamotaju u obećanje, ovdje ne smijemo koristiti async i stoga ne možemo koristiti await ovdje.
//zato ćemo dodati metodu 'then' da bismo dobili naš odgovor, a zatim returnati 'response.json' da raspakiramo podatke iz odgovora jer to je način na koji to radite s ovim odgovorom. Postoji JSON metoda, koja vam onda u konačnici daje podatke koji su poslani natrag s poslužitelja. A ti podaci koji se šalju natrag su objekt s 'posts' key koji sadrži sve dohvaćene objave (u backendu  res.json({ posts: storedPosts });). Zatim pristupamo 'data.posts' sa 'setPosts(data.posts)'
// Ne biste trebali pisati ovaj kod jer ako biste napisali ovaj kod, on bi teoretski ažurirao stanje s novim postovima, ali bi uzrokovao beskonačnu petlju, a zašto bi to učinio? Pa, jednostavno zato što kad god ažurirate svoje stanje, kao što ste naučili, React ponovno izvršava funkciju vaše komponente. To je jedna od ključnih ideja Reacta da ažuriranje stanja uzrokuje ponovno izvršavanje funkcije komponente (PostsList npr), tako da React može ažurirati korisničko sučelje ako je potrebno. Međutim, ako se funkcija ove komponente ponovno izvrši, fetch se također ponovno šalje. Pa smo poslali još jedan zahtjev, dobili smo podatke, ažurirali stanje i petlja ponovno počinje.
// Ovo je, čest problem i stoga React ima rješenje. Sada, značajka koju možemo koristiti za rješavanje ovakvih problema gdje učinkovito želimo izazvati nuspojavu u component funkciji, dakle gdje želimo pokrenuti neku radnju koja ne utječe izravno na JSX kod ili koja čini bilo što drugo što nije povezano s renderiranjem UI.

// 4.) U takvim slučajevima korisitmo 'useEffect', koja je tu da omota nuspojave. useEffect vam omogućuje sigurno pokretanje ovakvog koda bez izazivanja beskonačne petlje. Izvršite useEffect i za razliku od useState, ne vraća vrijednost. Umjesto toga, uzima funkciju kao vrijednost i kao drugi argument, niz. React će tu funkciju izvršiti umjesto vas kad god smatra da ovaj efekt zahtijeva izvršenje, a drugi argument (array) ima veze s tim.
//Kreirali smo novu async fju jer useEfect uzima fju koja nebi trebala vratiti promise itself, već bi trebala vratiti ništa ili cleanup fju te se zato ova async fja odma i poziva.
// Sada će react sam odlučiti kada će se ova fja izvršiti. To će se kontrolirati sa drugim argumentom koji je prosljeđen u 'useEffect', niz. Ovaj niz na kraju specificira ovisnosti vaše funkcije. A ovisnost je jednostavno bilo koja varijabla ili funkcija koja se može definirati izvan ove effect funkcije  bilo gdje u vašim React komponentama, u ovoj komponenti ili nekoj nadređenoj komponenti koja se prenosi kroz props. I kad god se takva varijabla ili funkcija definirana izvan funkcije efekta promijeni, primi novu vrijednost. Sada, ako imamo prazan niz, to jednostavno znači da ova funkcija nema ovisnosti i stoga se više nikada neće izvršiti.
//Umjesto toga, React će ga izvršiti samo jednom i tada se ova komponenta prvi put renderira. I tehnički, izvršava se nakon što se komponenta prvi put renderira, tako da teoretski, komponenta se prvo renderira bez ikakvih objava, a zatim odmah izvršava ovu funkciju effect gdje se objave ažuriraju. Ali to je sve tako brzo da ovdje vidimo samo konačno stanje u kojem se objave fetch-aju.

//9.) Možemo ići na postsList i tu sada možemo importati i hook 'useLoaderData' iz react-router-doma. Sada se ova hook može pozvati unutar funkcije komponente PostsList. Kao i sve hooks, mora se koristiti samo unutar funkcija komponente i to nam daje podatke koje vraća loader (iz Posts.jsx) koji je dodijeljen ruti koja je ruta koja je aktivna kada se renderira komponenta postsList. Dakle, na kraju dobivam svoje postove jer u loader-u returnam postove ('return resData.posts;'). Rješimo se posts i fetching napisanih preko 'useState', te 'useEffect' jer ga ne koristimo više za fetching.

//19.) Dakle, na 'PostList' gdje renderiram svoje postove sada također postavljam ID prop i postavljam ga na ' id={post.id}' jer moji postovi sada imaju ID-ove budući da dolaze iz backend i tamo se dodaje ID.  Postavljamo ID prop na 'Post' tako da se tamo može koristiti za Link.
