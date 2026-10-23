# JWT, bcrypt in preverjanje pravic

- Status: Sprejeto
- Datum: 2026-10-22

## Kontekst in problem

Zaposleni, vodja projekta in vodja podjetja imajo različne pravice; ure zaposlenih so zaščitene.

## Obravnavane alternative

- JWT + bcrypt + RBAC
- Strežniške seje
- Zunanji ponudnik identitete

## Sprejeta odločitev in utemeljitev

Izberemo **JWT + bcrypt + RBAC**. JWT preverja prijavo, bcrypt ščiti gesla, backend pa ob vsakem zahtevku preveri vlogo in članstvo v projektu.

## Posledice

### Pozitivne
- Centralizirano preverjanje dostopa.
- Gesla niso shranjena v izvirni obliki.

### Negativne
- Treba je varno upravljati žetone in odjavo.
- JWT sam ne zagotavlja pravic brez preverjanja na strežniku.
