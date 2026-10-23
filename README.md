# workIT

**workIT** je spletna aplikacija za organizacijo dela v manjših podjetjih in projektnih ekipah. Omogoča upravljanje projektov in nalog, dodeljevanje dela in navodil zaposlenim, spremljanje napredka na Kanban tabli, beleženje delovnega časa ter načrtovanje dnevnih obveznosti. Vodje lahko spremljajo napredek projektov in opravljene ure, vodja podjetja pa upravlja uporabnike.

## Uporabniške vloge

- **Zaposleni:** spremlja dodeljene naloge, beleži čas in ureja svoj dnevni načrt.
- **Vodja projekta:** ustvarja in dodeljuje projektne naloge, dodaja navodila ter spremlja napredek svojih projektov.
- **Vodja podjetja:** upravlja uporabnike in spremlja projekte ter evidence časa.

## Uporabljene tehnologije

- **Frontend:** React, TypeScript, Vite, CSS
- **Backend:** Node.js, Express, TypeScript
- **Podatkovna baza:** PostgreSQL
- **Dostop do baze:** node-postgres (`pg`), SQL
- **Avtentikacija:** JWT, bcrypt
- **Razvojna orodja:** Visual Studio Code, npm, Git, GitHub, Postman

## Zagon frontenda

Predpogoja: Node.js 24 LTS in npm.

```sh
cd frontend
npm ci
npm run dev
```

Struktura projekta in razvojni ukazi so opisani v
[`frontend/README.md`](./frontend/README.md).

## Dokumentacija

Projektna dokumentacija je v mapi [`docs/`](./docs/):

- [01 – Zasnova rešitve](./docs/01-zasnova-resitve.md)
- [02 – Funkcionalnosti in obseg](./docs/02-funkcionalnosti-in-obseg.md)
- [03 – Podatkovni model](./docs/03-podatkovni-model.md)
- [04 – Arhitektura in tehnološki sklad](./docs/04-arhitektura-in-tehnoloski-sklad.md)
- [05 – Uporabniške zgodbe](./docs/05-uporabniske-zgodbe.md)
- [06 – Wireframe-i](./docs/06-wireframe-i.md)

> Projekt je v fazi načrtovanja in razvoja.
