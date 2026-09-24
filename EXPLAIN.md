# Aplikacioni — përmbledhje për mbrojtje

## Çfarë bën?

Platforma sugjeron kujdes për lëkurën sipas përgjigjeve të përdoruesit. Ai shfleton produkte, ruan rutinën dhe shënon progresin. Administratori menaxhon përdoruesit, produktet dhe sheh statistika.

## Tre pjesët

**Frontend — pjesa që shikon përdoruesi:** React ndërton faqet. Redux është memoria e përbashkët e aplikacionit. Axios dërgon kërkesat te serveri, si korrier. Të dhënat e hyrjes dhe rutinës ruhen edhe në shfletues.

**Backend — serveri që kryen punën:** Route është sporteli; controller është recepsionisti; service është punëtori; repository është magazinieri. Ky i fundit lexon ose ruan të dhëna. Kodi kërkon PostgreSQL për llogaritë, produktet dhe rutinat; MongoDB ruan historikun e vlerësimit. Këto janë depo të dhënash; funksionimi i tyre real nuk është verifikuar këtu.

**ML — pjesa që parashikon rekomandimin:** Modeli i gatshëm `model.pkl` zgjedh llojin e rutinës dhe jep besueshmërinë. Produktet zgjidhen nga `data/skincare_100.csv`, katalogu në formë tabele. Përdoren kategori dhe përbërës të paracaktuar; zgjidhet produkti më i lirë ndër kandidatët. Modeli nuk mëson rishtazi gjatë kërkesës.

## Hyrja në 6 hapa

1. Përdoruesi shkruan email-in dhe fjalëkalimin. Faqja ia dërgon serverit.
2. Serveri kontrollon formatin dhe kërkon llogarinë.
3. Krahason fjalëkalimin me gjurmën e mbrojtur të ruajtur, jo me tekst të lexueshëm.
4. Lexon rolin dhe krijon një token: biletë dixhitale hyrjeje, të quajtur JWT. Krijon edhe biletën rinovuese, refresh token.
5. Faqja ruan biletat në memorien e aplikacionit dhe shfletuesit. Pastaj hap panelin personal.
6. Kërkesat e mëvonshme bartin biletën. Pas refuzimit të hyrjes, dërguesi i përbashkët provon një rinovim; dërguesi administrativ nuk e bën.

## Pyetësori → rutina në 6 hapa

1. Përdoruesi plotëson pyetësorin për lëkurën. Faqja përgatit përgjigjet dhe i dërgon.
2. Serveri kontrollon biletën dhe ia përcjell përgjigjet pjesës rekomanduese.
3. Ajo kthen rutinën, besueshmërinë dhe produktet nga katalogu.
4. Serveri ruan historikun e vlerësimit dhe kthen përgjigjen.
5. Faqja mban rezultatin në memorien e aplikacionit dhe shfaq rutinën.
6. Vetëm butoni i ruajtjes e regjistron rutinën si aktive. Rutina e mëparshme çaktivizohet; paneli personal lejon shënimin e progresit.

## Administratori dhe përdoruesi

- Regjistrimi cakton rolin `User`, nëse ky rol ekziston në depo. Hyrja lexon rolin e parë; mungesa zëvendësohet me `User`.
- Faqet personale kërkojnë hyrje. Paneli administrativ kërkon rolin `Admin`.
- Serveri kontrollon veçmas biletën dhe rolin për kërkesat administrative. Fshehja e butonave nuk është mbrojtja e vetme.
- Kufizime aktuale: rinovimi nuk ringarkon rolin. Shenja aktiv/joaktiv nuk kontrollohet gjatë hyrjes.
