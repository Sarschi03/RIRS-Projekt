# PostgreSQL za podatkovno bazo

- Status: Sprejeto
- Datum: 2026-10-22

## Kontekst in problem

Uporabniki, članstva, projekti, naloge in evidence ur so medsebojno povezani.

## Obravnavane alternative

- PostgreSQL
- MongoDB
- SQLite

## Sprejeta odločitev in utemeljitev

Izberemo **PostgreSQL**. Relacije in tuji ključi zagotavljajo povezljivost podatkov; SQL omogoča poročila o urah.

## Posledice

### Pozitivne
- Referenčna integriteta.
- Učinkovite agregacije za poročila.

### Negativne
- Potreben je lokalni strežnik baze.
- Treba je vzdrževati shemo.
