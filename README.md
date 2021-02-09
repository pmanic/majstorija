# Opis projekta

Web aplikacija za brzo povezivanje korisnika i majstora radi efikasnog resavanja kucnih kvarova i problema.

Aplikacija ima 3 tipa korisnika: Admin, majstor, korisnik.

O korisniku:
  - Lak uvid u informacije o majstoru
      - Informacije o dostupnosti
      - Podaci o delatnosti, veštinama i oceni majstora
  - Efikasno povezivanje majstora i korisnika
      - Sortiran prikaz dostupnih majstora na osnovu odabranih filtera i kalendara rasporeda
      - Uvid u istoriju kontaktiranih majstora
      - Mogućnost ocenjivanja kontaktiranih  majstora

O majstoru:
  - Jednovremeni uvid majstora u kalendar aktivnosti
  - Lista zahteva poslatih od strane korisnika koje majstor može odbiti/prihvatiti
  - Mogućnost slanja zahteva za kategoriju koja se ne nalazi u listi postojećih

O adminu:
  - Uvid u listu registrovanih majstora i korisnika
  - Kreiranje, ažuriranje i brisanje naloga majstora i korisnika
  - Pregled zahteva poslatih od strane majstora za dodavanje nove kategorije, odbijanje/prihvatanje istih

# Korišćene tehnologije

  - Frontend:
      - HTML5 
      - CSS 
      - SASS
      - React.js
  - Backend:
      - Node.js
      - Express.js (framework)
      - MongoDB

# Pokretanje projekta

1. Potrebno je instalirati sve zavisnosti pomoću komande ```npm install```
2. Uz pomoć komande ```npm run start``` paket *concurrently* paralelno pokreće komande ```npm run server``` i ```npm run client```
3. Na portovima http://localhost:3000/ i http://localhost:5000/ biće pokrenuti klient i server respektivno
