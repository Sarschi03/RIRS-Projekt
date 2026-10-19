# 04 – Arhitektura in tehnološki sklad

## 1. Arhitektura

### Glavni deli sistema
- **Frontend:** React, TypeScript, Vite, CSS
- **Backend:** Node.js, Express, TypeScript
- **Podatkovna baza:** PostgreSQL
- **Avtentikacija:** JWT, bcrypt

### Komunikacija med deli sistema
- Frontend in backend komunicirata prek REST API-ja.
- Za prenos podatkov se uporabljata HTTP/HTTPS in JSON.

### Podatkovna baza
- PostgreSQL
- Glavne entitete: uporabnik, projekt, članstvo, naloga, evidenca časa in dnevna obveznost.


### Avtentikacija in upravljanje uporabnikov
- Prijava z e-poštnim naslovom in geslom.
- bcrypt za varno zgoščevanje gesel.
- JWT za avtentikacijo uporabnikov.


### Preprost diagram arhitekture

```text
       Spletni brskalnik
              |
              v
      React + TypeScript
              |
          REST API
              |
              v
      Node.js + Express
              |
       node-postgres (pg)
              |
              v
         PostgreSQL
```

## 2. Tehnološki sklad

- **Frontend:** React, TypeScript, Vite, CSS
- **Backend:** Node.js, Express, TypeScript
- **Podatkovna baza:** PostgreSQL
- **Dostop do podatkovne baze:** node-postgres (pg), SQL
- **Avtentikacija:** JWT, bcrypt
- **Lokalni razvoj:** Visual Studio Code, Node.js, npm


## 3. Arhitekturne odločitve

- **React:** omogoča razvoj interaktivnega uporabniškega vmesnika, kar je primerno za prikaz Kanban table, spreminjanje statusov nalog in uporabo časovnika.
- **TypeScript:** omogoča preverjanje tipov podatkov in zmanjšuje možnost napak pri delu s podatki o uporabnikih, projektih, nalogah in evidencah časa.
- **Node.js in Express:** omogočata razvoj REST API-ja za upravljanje projektov, dodeljevanje nalog, beleženje delovnega časa in preverjanje uporabniških pravic.
- **PostgreSQL:** relacijska podatkovna baza je primerna za shranjevanje medsebojno povezanih podatkov o uporabnikih, projektih, nalogah in opravljenih urah.
- **JWT in bcrypt:** omogočata avtentikacijo uporabnikov in varno shranjevanje gesel.
- **REST API:** omogoča ločen razvoj frontenda in backenda ter kasnejšo povezavo z mobilno aplikacijo.

