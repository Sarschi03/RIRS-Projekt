# Podatkovni model

Uporabljena bo relacijska podatkovna baza **PostgreSQL**.

## Entitete in glavna polja

| Entiteta | Glavna polja |
|---|---|
| **Uporabnik** | id (PK), ime, email (unikaten), geslo_hash, vloga (`ZAPOSLENI`, `VODJA_PROJEKTA`, `ADMIN`) |
| **Projekt** | id (PK), naziv, opis, datum_zacetka, vodja_id (FK → Uporabnik) |
| **Clanstvo** | id (PK), projekt_id (FK), uporabnik_id (FK); unikatna kombinacija projekt_id + uporabnik_id |
| **Naloga** | id (PK), projekt_id (FK), dodeljen_uporabnik_id (FK), naslov, opis, navodila, rok, status, prioriteta |
| **EvidencaCasa** | id (PK), naloga_id (FK), uporabnik_id (FK), zacetek, konec, trajanje_minut, nacin_vnosa |
| **DnevnaObveznost** | id (PK), uporabnik_id (FK), naloga_id (FK, lahko NULL), naziv, datum, opravljeno |

## Povezave
- En uporabnik lahko vodi več projektov.
- Uporabniki in projekti so povezani prek članstev (M : N).
- En projekt ima več nalog; posamezna naloga pripada enemu projektu.
- Naloga je lahko dodeljena enemu zaposlenemu; zaposleni ima lahko več nalog.
- Naloga ima več časovnih zapisov; vsak zapis pripada enemu uporabniku.
- Uporabnik ima več dnevnih obveznosti; obveznost je lahko povezana s projektno nalogo.

## Osnutek modela

- **Uporabnik – Projekt:** En uporabnik lahko vodi več projektov, vsak projekt ima enega vodjo.
- **Uporabnik – Članstvo:** En uporabnik ima lahko več članstev v projektih.
- **Projekt – Članstvo:** En projekt ima lahko več članov; članstvo povezuje uporabnika s projektom.
- **Projekt – Naloga:** En projekt vsebuje več nalog, vsaka naloga pripada enemu projektu.
- **Uporabnik – Naloga:** Uporabniku je lahko dodeljenih več nalog, posamezna naloga pa ima največ enega dodeljenega uporabnika.
- **Naloga – Evidenca časa:** Ena naloga ima lahko več časovnih zapisov.
- **Uporabnik – Evidenca časa:** Uporabnik lahko ustvari več časovnih zapisov.
- **Uporabnik – Dnevna obveznost:** Uporabnik lahko načrtuje več dnevnih obveznosti.
- **Naloga – Dnevna obveznost:** Dnevna obveznost je lahko povezana z nalogo, povezava pa ni obvezna.

## Pravila podatkov
- Evidenca časa se lahko shrani le za nalogo, dodeljeno prijavljenemu zaposlenemu; vodja ima ločene pravice za pregled.
- Za posameznega uporabnika je lahko aktiven največ en časovnik (zapis brez konca).
- Trajanje je nenegativno in se ob ustavitvi izračuna iz začetka ter konca; ročni vnos vsebuje oba časa.
- Napredek projekta se izračuna kot delež zaključenih nalog; ure se seštevajo iz evidenc časa.
