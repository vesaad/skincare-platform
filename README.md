# Skincare Platform

Express + Prisma/PostgreSQL, React/Vite + Redux dhe FastAPI. Backend ruan integrimin ekzistues MongoDB për assessment logs.

Katalogu kanonik është `data/skincare_100.csv`; modeli i trajnuar është `ml-service/model.pkl`. Të dhënat historike mbeten të pafshira. Nuk nevojitet rigjenerim i CSV-së për nisjen normale.

```sh
npm --prefix frontend install
npm --prefix backend install
npm run dev
```

Në një terminal tjetër: `npm run dev:backend`.

Për ML:

```sh
cd ml-service
python -m pip install -r requirements.txt
python -m uvicorn main:app --port 8000
```

Backend ruan konfigurimin ekzistues dotenv dhe varësitë e bazave; ato duhen konfiguruar si më parë. `.env`, `.gitignore` dhe `backend/prisma/schema.prisma` nuk janë ndryshuar.

- [STRUCTURE.md](STRUCTURE.md): folderët, feature-t, komandat dhe burimet e të dhënave.
- [INVENTORY.md](INVENTORY.md): inventari para ristrukturimit.
- [CHANGELOG.md](CHANGELOG.md): çdo lëvizje/riemërtim.
- [CLEANUP.md](CLEANUP.md): sugjerime pastrimi dhe probleme ekzistuese.

`npm run build` ndërton frontend-in në `frontend/dist/`. `npm run preview` shfaq build-in. `npm run lint` kontrollon frontend-in; gabimet ekzistuese React janë dokumentuar te CLEANUP.md. Output-i i build-it nuk duhet versionuar; `.gitignore` ekzistues është lënë i paprekur.
