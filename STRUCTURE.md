# Struktura e projektit

Tre aplikacione: Express, React/Vite dhe FastAPI. Skedarët e rinj JS/JSX përdorin kebab-case; Python ruan snake_case. Emrat e funksioneve/komponentëve, endpoint-et dhe kontratat e të dhënave janë ruajtur. Emrat standardë të konfigurimeve, `skincare_100.csv` dhe `model.pkl` mbeten siç ishin.

## Folderët

| Vendndodhja | Përmbajtja |
|---|---|
| `backend/src/server.js` | Entry point aktiv, routes, lidhja MongoDB dhe listen |
| `backend/src/features/` | Backend i grupuar sipas funksionaliteteve |
| `backend/src/middleware/` | JWT auth, role dhe validim Joi |
| `backend/tests/feature-flow.test.js` | Skenarë kontrolli të përgjigjeve me DB/ML të simuluara; `npm --prefix backend test` |
| `backend/scripts/seed-products.js` | Utility ekzistues upsert nga CSV kanonik; nuk ekzekutohet gjatë nisjes |
| `backend/prisma/` | Schema e pandryshuar |
| `backend/public/images/` | Imazhet e shërbyera nga backend `/images`, të ruajtura për kompatibilitet |
| `frontend/src/app/` | React entry, routes dhe Redux store |
| `frontend/src/features/` | Faqe, komponentë dhe Redux slices sipas feature-ve |
| `frontend/src/shared/` | Navbar, Axios API client dhe Tailwind stylesheet |
| `frontend/src/assets/template/`, `template-copy/` | Imazhe template dhe kopjet e tyre, të ruajtura sipas kërkesës së përdoruesit |
| `frontend/public/` | Branding, favicon dhe imazhe produktesh `0.jpg`–`99.jpg` |
| `ml-service/` | FastAPI, prediction, modeli dhe utility i eksportimit të modelit |
| `data/` | Katalogu kanonik dhe dataset-i i vjetër i pafshirë |
| `ml/` | Notebook-e, kopje CSV-je dhe të dhëna historike trajnimi |
| `scripts/` | Preprocessing historik që rigjeneron CSV-në; nuk ekzekutohet gjatë nisjes |
| `frontend/dist/` | Output standard i frontend build; artefakt i gjeneruar, jo source code |

## Ku gjendet çdo feature

Path-et backend/frontend janë relative ndaj `backend/src/` dhe `frontend/src/`.

| Feature | Backend | Frontend |
|---|---|---|
| Auth | `features/auth/auth.{routes,controller,service,repository,validator}.js` | `features/auth/login.jsx`, `register.jsx`, `auth.slice.js` |
| Products | `features/products/product.{routes,controller,service,repository}.js` | `features/products/product-explorer.jsx`, `product-card.jsx`, `products.slice.js` |
| Brands/categories/ingredients | `features/{brands,categories,ingredients}/`, secili me route/controller/service/repository | API client i përbashkët sipas përdorimit ekzistues |
| Quiz/assessment | `features/assessment/assessment.{routes,controller,service,repository}.js`, `skin-assessment-log.model.js`; ML te `ml-service/predict.py` në rrënjë | `features/assessment/quiz.jsx` |
| Routine | `features/routines/routine.{routes,controller,service,repository}.js` | `features/routines/routine.jsx`, `routine.slice.js` |
| Progress/dashboard | `features/progress/progress.{routes,controller,service,repository}.js` | `features/routines/dashboard.jsx` |
| Admin | `features/admin/admin.routes.js`, `admin-dashboard.*`, `admin-user.*`, `admin-product.*`: secili me controller/service/repository | `features/admin/admin-layout.jsx`, `dashboard.jsx`, `users-page.jsx`, `products-page.jsx`, `admin.service.js` |
| Export CSV | `features/admin/admin-user.controller.js` → service `exportUsers` → repository `findForExport`; e njëjta rrjedhë te admin-product me `exportProducts` | `features/admin/admin.service.js` dhe faqet users/products |
| Home/navigation | — | `features/home/home.jsx`, `shared/components/navbar.jsx` |
| Notifications | Serveri aktiv nuk inicializon Socket.IO | `features/notifications/notification.slice.js` dhe hook-u pa importues `use-socket.js` |

Çdo feature ndjek Route → Controller → Service → Repository. Route zgjedh endpoint-in dhe middleware-t; controller lexon request-in, kontrollon input-et bazë HTTP dhe kthen status/përgjigje; service kryen logjikën; repository ekzekuton query-t Prisma ose krijimin e log-ut MongoDB. Controller-at dhe service-t nuk importojnë Prisma/Mongoose dhe nuk kryejnë query direkt. Assessment service thërret FastAPI dhe repository ruan rezultatin. Export-i CSV mbetet te admin: service krijon CSV-në dhe controller vendos headers. Janë nxjerrë blloqet ekzistuese me autorizimin e përdoruesit, pa DTO, dependency injection apo klasa të reja.

## Burimi aktual i të dhënave

`data/skincare_100.csv` është katalogu i vetëm kanonik i produkteve. `ml-service/predict.py` dhe `backend/scripts/seed-products.js` lexojnë këtë skedar. Folderët legacy dhe connector-i historik MongoDB u fshinë me autorizim më 2026-09-23; lidhja aktive MongoDB mbetet në server.js. Montimi i dyfishtë auth dhe caktimi i dyfishtë getStats u korrigjuan.

Kopjet `ml-service/skincare_100.csv` dhe `ml/skincare_100.csv` janë byte-identike dhe mbeten të pafshira. Notebook-u historik ruan path-et ekzistuese; nuk u rishkrua ose ritrajnua.

Kodi Express ende referon PostgreSQL për auth/produkte/rutina dhe MongoDB për assessment logs. Kjo dëshmon varësi në kod, jo gjendjen reale të bazave të përdoruesit. Nuk u ekzekutuan seed-e, migrime apo query që ndryshojnë të dhënat. Heqja e këtyre varësive kërkon ndryshim logjike.

`ml-service/model.pkl` është artefakt modeli i kërkuar nga prediction runtime. `data/products.csv`, `backend/products.csv`, `ml/users.csv` dhe `ml/interactions.csv` trajtohen si të dhëna historike, jo burime aktive të katalogut. Shih `CLEANUP.md`.

## Nisja dhe konfigurimi

Nga rrënja, instalimi: `npm --prefix frontend install` dhe `npm --prefix backend install`. Nisja në terminale të veçanta: `npm run dev` dhe `npm run dev:backend`.

Për ML: nga `ml-service/`, ekzekuto `python -m pip install -r requirements.txt`, pastaj `python -m uvicorn main:app --port 8000`.

Komandat `npm run build`, `npm run lint`, `npm run preview` delegojnë te frontend. Vite lexon `.env` nga rrënja përmes `envDir`; backend ruan `dotenv.config()` dhe cwd `backend/` kur niset me npm. `.env` nuk është lëvizur ose ndryshuar. Nuk u shtua fallback i ri i konfigurimit backend.

Lockfile origjinal frontend është në `frontend/package-lock.json`. `node_modules/` i vjetër në rrënjë mund të mbetet lokalisht; instalimi i ri duhet bërë në `frontend/`.

## Dokumentimi

- `INVENTORY.md`: çdo skedar i versionuar para lëvizjeve, eksportet dhe importuesit statikë.
- `CHANGELOG.md`: çdo lëvizje `nga → në` dhe ndryshimet e konfigurimit.
- `CLEANUP.md`: kandidatë pastrimi të pafshirë dhe probleme ekzistuese.
- `FLOW.md`: katër përgjigjet hap pas hapi për mbrojtje, me path-et dhe funksionet aktuale.

## Verifikimi i ndarjes backend — 2026-09-23

- 75 skenarë u ekzekutuan kundrejt kodit para dhe pas ndarjes. Përgjigjet/statuset HTTP, headers CSV, log-et dhe rendi/argumentet e query-ve DB dhe thirrjeve ML përputhen.
- Skenarët përfshijnë sukses/dështim për auth, assessment, routine, progress, admin dhe exports; DB dhe ML janë simuluar, pa prekur të dhëna reale.
- `npm --prefix backend test` riekzekuton skenarët; sintaksa e të gjithë skedarëve backend u verifikua.
- 97 importe lokale backend/frontend u kontrolluan pa referenca të pazgjidhura. Krahasimi i 13 skedarëve routes/middleware/server konfirmoi se, përveç path-eve të importeve, endpoint-et dhe rendi i middleware-ve mbetën të pandryshuara.
- Defektet e mëparshme të auth refresh/isActive të shënuara në FLOW.md mbeten jashtë këtij ristrukturimi; testet ruajnë sjelljen aktuale.

## Verifikimi historik i lëvizjeve fillestare

- 322 skedarët origjinalë të versionuar u gjetën në vendndodhjen përkatëse; 196 u lëvizën/riemërtuan.
- Krahasimi me Git konfirmoi përmbajtjen e ruajtur, përveç importeve/path-eve, konfigurimit të miratuar dhe README-së së përditësuar. Krahasimi i tekstit normalizoi fundet e rreshtave Windows/Git.
- 89 importe lokale statike/dinamike JS/JSX u zgjidhën pa gabime.
- `npm run build` kaloi: 116 module të transformuara. Sintaksa Node.js dhe Python kaloi.
- `npm run lint` raporton 4 gabime dhe 1 warning ekzistues frontend; nuk u ndryshua logjika për t'i fshehur ose rregulluar.
- `.env`, të gjitha `.gitignore` dhe `schema.prisma` mbetën të pandryshuara. Tri kopjet e skincare_100.csv kanë të njëjtin SHA-256 si përpara.
- Prediction runtime nuk u verifikua: interpreter-it Python të disponueshëm i mungon `pandas`. Nuk u ngarkua/ritrajnua modeli ose ndryshua ambienti Python.
- Nuk u verifikuan operacione end-to-end me baza reale dhe nuk u ekzekutuan seed-e/migrime. Varësitë e DB-së dhe problemet ekzistuese përshkruhen te `CLEANUP.md`.
- Output-et e përkohshme të build-it dhe skriptet e auditimit u pastruan pas verifikimit; mund të rigjenerohen me komandat e mësipërme.
