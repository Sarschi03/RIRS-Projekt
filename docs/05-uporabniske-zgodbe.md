# Uporabniške zgodbe – workIT



## US-01 – Ustvarjanje projektov in določanje članov
- **Funkcionalnost:** Ustvarjanje projektov in določanje članov (MVP)
- **Uporabniška vloga:** Vodja podjetja
- **Zgodba:** Kot vodja podjetja želim ustvariti projekt in vanj vključiti zaposlene, da lahko organiziram delo projektne ekipe.
- **Acceptance criteria:**
  - Ob ustvarjanju projekta sta naziv in vodja projekta obvezna podatka.
  - Vodja podjetja lahko izbere člane iz seznama obstoječih uporabnikov.
  - Sistem prepreči, da bi bil isti uporabnik dvakrat dodan v isti projekt.
  - Projekt je po shranitvi viden njegovemu vodji in članom.

## US-02 – Dodeljevanje nalog in navodil
- **Funkcionalnost:** Dodeljevanje nalog in navodil (MVP)
- **Uporabniška vloga:** Vodja projekta
- **Zgodba:** Kot vodja projekta želim ustvariti nalogo z navodili, rokom in odgovorno osebo, da zaposleni vedo, kaj morajo narediti.
- **Acceptance criteria:**
  - Vodja projekta lahko doda nalogo samo v projekt, ki ga vodi.
  - Naloga mora vsebovati naslov, opis/navodila in rok izvedbe.
  - Odgovorno osebo je mogoče izbrati samo med člani projekta.
  - Dodeljeni zaposleni lahko odpre nalogo in prebere navodila.

## US-03 – Kanban spremljanje statusa nalog
- **Funkcionalnost:** Kanban spremljanje statusa nalog (MVP)
- **Uporabniška vloga:** Zaposleni
- **Zgodba:** Kot zaposleni želim spreminjati status svojih nalog na Kanban tabli, da lahko ekipi pokažem napredek dela.
- **Acceptance criteria:**
  - Naloge so prikazane v stolpcih Za narediti, V izvajanju in Zaključeno.
  - Zaposleni lahko spremeni status le nalogi, ki mu je dodeljena.
  - Po spremembi statusa se naloga prikaže v ustreznem stolpcu.
  - Sprememba statusa je shranjena in vidna drugim članom projekta.

## US-04 – Beleženje časa s časovnikom ali ročno
- **Funkcionalnost:** Beleženje časa s časovnikom ali ročno (MVP)
- **Uporabniška vloga:** Zaposleni
- **Zgodba:** Kot zaposleni želim beležiti čas dela na nalogi s časovnikom ali ročnim vnosom, da imam natančno evidenco opravljenega dela.
- **Acceptance criteria:**
  - Časovnik je mogoče zagnati samo za nalogo, dodeljeno prijavljenemu zaposlenemu.
  - Uporabnik ima lahko največ en aktiven časovnik.
  - Ob ustavitvi časovnika se shrani trajanje, večje od nič.
  - Ročni vnos zahteva datum, nalogo in pozitivno trajanje v minutah.

## US-05 – Povezovanje evidentiranih ur z nalogami in projekti
- **Funkcionalnost:** Povezovanje evidentiranih ur z nalogami in projekti (MVP)
- **Uporabniška vloga:** Vodja projekta
- **Zgodba:** Kot vodja projekta želim videti ure, povezane s posameznimi nalogami in projektom, da lahko spremljam porabo časa na projektu.
- **Acceptance criteria:**
  - Vsak časovni vnos je povezan z zaposlenim in nalogo.
  - Projekt časovnega vnosa je določen iz pripadajoče naloge.
  - Seštevek ur projekta vključuje vse shranjene vnose njegovih nalog.
  - Vodja projekta vidi vnose samo za projekte, ki jih vodi.

## US-06 – Osebni dnevni načrt
- **Funkcionalnost:** Osebni dnevni načrt (MVP)
- **Uporabniška vloga:** Zaposleni
- **Zgodba:** Kot zaposleni želim sestaviti dnevni načrt iz projektnih nalog in osebnih obveznosti, da lažje organiziram svoje delo.
- **Acceptance criteria:**
  - Zaposleni lahko za izbrani datum doda osebno obveznost.
  - V načrt lahko vključi samo projektne naloge, ki so mu dodeljene.
  - Posamezno obveznost lahko označi kot opravljeno.
  - Osebne obveznosti niso vidne drugim zaposlenim ali vodjem.

## US-07 – Nadzorna plošča vodje
- **Funkcionalnost:** Nadzorna plošča vodje (MVP)
- **Uporabniška vloga:** Vodja projekta
- **Zgodba:** Kot vodja projekta želim videti napredek nalog in porabljene ure na projektu, da lahko spremljam izvajanje projekta.
- **Acceptance criteria:**
  - Nadzorna plošča prikaže število nalog po statusih.
  - Napredek je izračunan kot delež zaključenih nalog; pri projektu brez nalog je 0 %.
  - Prikazan je seštevek evidentiranih ur projekta.
  - Vodja projekta lahko odpre nadzorno ploščo le za projekte, ki jih vodi.

## US-08 – Določanje prioritet nalog
- **Funkcionalnost:** Določanje prioritet nalog (Načrtovano)
- **Uporabniška vloga:** Vodja projekta
- **Zgodba:** Kot vodja projekta želim določiti prioriteto naloge, da ekipa ve, katere naloge so nujnejše.
- **Acceptance criteria:**
  - Prioriteto je mogoče nastaviti na Nizka, Srednja ali Visoka.
  - Novo ustvarjena naloga ima privzeto prioriteto Srednja.
  - Prioriteto lahko spremeni vodja projekta, ki nalogo vodi.
  - Prioriteta je prikazana na kartici naloge.

## US-09 – Filtriranje nalog
- **Funkcionalnost:** Filtriranje nalog (Načrtovano)
- **Uporabniška vloga:** Član projekta
- **Zgodba:** Kot član projekta želim filtrirati naloge po izvajalcu, statusu in roku, da hitreje najdem relevantne naloge.
- **Acceptance criteria:**
  - Filter izvajalca prikazuje le člane izbranega projekta.
  - Filter statusa omogoča izbiro enega od treh statusov.
  - Filter roka prikaže naloge z rokom do izbranega datuma.
  - Ob kombinaciji filtrov so prikazane samo naloge, ki izpolnjujejo vse pogoje.

## US-10 – Zgodovina lastnih ur
- **Funkcionalnost:** Zgodovina lastnih ur (Načrtovano)
- **Uporabniška vloga:** Zaposleni
- **Zgodba:** Kot zaposleni želim pregledati svoje evidentirane ure po dnevih, da lahko preverim, koliko časa sem delal.
- **Acceptance criteria:**
  - Zgodovina prikazuje samo vnose prijavljenega zaposlenega.
  - Vsak vnos prikazuje datum, nalogo in trajanje.
  - Uporabnik lahko izbere začetni in končni datum pregleda.
  - Za izbrano obdobje se izpiše skupni seštevek ur.

## US-11 – Označevanje zamujenih nalog
- **Funkcionalnost:** Označevanje zamujenih nalog (Načrtovano)
- **Uporabniška vloga:** Vodja projekta
- **Zgodba:** Kot vodja projekta želim prepoznati naloge s pretečenim rokom, da lahko pravočasno ukrepam.
- **Acceptance criteria:**
  - Naloga je zamujena, če je rok pred današnjim datumom in status ni Zaključeno.
  - Zamujene naloge imajo jasno besedilno oznako Zamujeno.
  - Zaključene naloge niso označene kot zamujene.
  - Oznaka se posodobi po spremembi roka ali statusa.

## US-12 – Pregled obremenitve zaposlenih
- **Funkcionalnost:** Pregled obremenitve zaposlenih (Načrtovano)
- **Uporabniška vloga:** Vodja projekta
- **Zgodba:** Kot vodja projekta želim videti število odprtih nalog posameznega člana ekipe, da lahko bolj enakomerno razporedim delo.
- **Acceptance criteria:**
  - Pregled vključuje samo člane izbranega projekta.
  - Za vsakega člana se preštejejo naloge s statusom Za narediti ali V izvajanju.
  - Zaključene naloge niso vključene v število odprtih nalog.
  - Vodja projekta nima dostopa do obremenitve v projektih, ki jih ne vodi.

## US-13 – Zgodovina sprememb statusa naloge
- **Funkcionalnost:** Zgodovina sprememb statusa naloge (Načrtovano)
- **Uporabniška vloga:** Vodja projekta
- **Zgodba:** Kot vodja projekta želim pregledati zgodovino sprememb statusa naloge, da lahko sledim poteku izvajanja.
- **Acceptance criteria:**
  - Ob vsaki spremembi statusa se zabeležijo stari in novi status.
  - Zabeležena sta tudi uporabnik in čas spremembe.
  - Zgodovina je prikazana od najnovejše do najstarejše spremembe.
  - Zgodovino lahko vidijo le člani projekta.

## US-14 – Prijava in odjava
- **Funkcionalnost:** Prijava in odjava (Osnovna tehnična)
- **Uporabniška vloga:** Uporabnik
- **Zgodba:** Kot uporabnik želim se prijaviti in odjaviti iz aplikacije, da lahko varno dostopam do svojih podatkov.
- **Acceptance criteria:**
  - Prijava zahteva e-poštni naslov in geslo.
  - Ob napačnih podatkih sistem ne izda prijavnega žetona in prikaže napako.
  - Po uspešni prijavi uporabnik dostopa le do dovoljenih podatkov.
  - Po odjavi aplikacija odstrani prijavne podatke na odjemalcu in onemogoči nadaljnjo uporabo zaščitenih pogledov brez ponovne prijave.

## US-15 – Upravljanje uporabnikov in vlog
- **Funkcionalnost:** Upravljanje uporabnikov in vlog (Osnovna tehnična)
- **Uporabniška vloga:** Vodja podjetja
- **Zgodba:** Kot vodja podjetja želim ustvarjati uporabniške račune in določati vloge, da lahko nadzorujem dostop do aplikacije.
- **Acceptance criteria:**
  - Samo vodja podjetja lahko ustvarja račune in spreminja vloge.
  - E-poštni naslov mora biti edinstven.
  - Uporabniku je dodeljena ena izmed vlog Zaposleni, Vodja projekta ali Vodja podjetja.
  - Sprememba vloge se upošteva pri naslednjem preverjanju pravic na backendu.
