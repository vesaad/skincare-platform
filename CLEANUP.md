# Kandidatë pastrimi — ende të pafshirë

> Përditësim 2026-09-23: përdoruesi autorizoi fshirjen e tre folderëve legacy dhe connector-it të papërdorur `backend/src/shared/database/mongodb.js`; ato tashmë janë fshirë. Imazhet template u ruajtën në `frontend/src/assets/template/` dhe `template-copy/`. Dy duplikimet `/api/auth` dhe `getStats` u korrigjuan. Lista historike më poshtë mbetet për gjurmueshmëri; CSV-të dhe imazhet e dyfishta mbeten të ruajtura.

Asnjë dataset, tabelë, model apo asset ekzistues nuk është fshirë. Përdorimi në source code nuk provon gjendjen reale të bazave, e cila nuk u inspektua.

| Skedarë / grup | Evidenca dhe sugjerimi |
|---|---|
| `data/products.csv`, `backend/products.csv` | Kopje byte-identike të dataset-it të vjetër; referohen nga preprocessing dhe seed-et historike. Pastrimi kërkon vendim për ruajtjen e workflow historik. |
| `ml/users.csv`, `ml/interactions.csv` | Të dhëna historike të notebook-ut; nuk lexohen nga FastAPI runtime. Të dobishme për riprodhimin e trajnimit. |
| `ml-service/skincare_100.csv` | Kopje identike e katalogut kanonik; runtime tani lexon `data/skincare_100.csv`. Kandidat për heqje pas konfirmimit. |
| `ml/skincare_100.csv` | Kopje identike; para heqjes duhet përditësuar path-i i notebook-ut dhe verifikuar trajnimi. |
| `backend/scripts/legacy/` | Scripts historike; disa përdorin fusha të hequra nga schema (`brandId`, `categoryId`, `routineStep`, `description`). Nuk u ekzekutuan. `seed.js` fshin rutina/progress/produkte kur ekzekutohet; sjellja e tij është ruajtur. |
| `scripts/preprocessing.py` | Gjenerator historik që shkruan mbi katalogun kanonik; nuk është pjesë e nisjes normale. |
| `backend/src/legacy/app.js`, `index.js` | Entrypoint alternativ vetëm me admin routes, jashtë start/dev aktual; ruhet për thirrje manuale. |
| `backend/src/legacy/models/` | AssessmentLog, ProgressNote, Recommendation nuk kanë importues statikë në source code. |
| `frontend/src/legacy/` | FilterBar, ProtectedAdminRoute, CSS/template assets pa importues aktivë; kopje assets identike dhe tre placeholders bosh të ruajtur. |
| `frontend/src/features/notifications/use-socket.js` | Hook pa importues; slice notifications mbetet i regjistruar në Redux dhe nuk klasifikohet automatikisht si i papërdorur. |
| `backend/public/images/product_*.jpg` | Imazhe historike, disa identike; shërbehen ende nga `/images` dhe mund të referohen nga DB. Nuk janë të sigurta për fshirje vetëm nga analiza e importeve. |
| `ml/.ipynb_checkpoints/skincare_ml-checkpoint.ipynb` | Checkpoint Jupyter i versionuar, i ruajtur. |

## Modele Prisma pa query direkte runtime

Permission, RolePermission, AuditLog, Notification, Setting, File, SkinProfile, SkinConcern, UserConcern, ProductConcern, Allergy, SkinAssessment dhe ProductInteraction nuk kanë query direkte të gjetura në JS të aplikacionit. Kanë relacione në schema; kjo nuk provon mungesën e të dhënave apo përdoruesve të jashtëm. `schema.prisma` dhe tabelat mbeten të paprekura.

Nuk janë të sigurta për heqje modelet e referuara nga endpoint-et: User, Role, UserRole, RefreshToken, Product, Brand, ProductCategory, Ingredient, ProductIngredient, Routine, RoutineStep, ProgressLog dhe modeli MongoDB SkinAssessmentLog.

## Probleme ekzistuese të ruajtura

- Backend regjistron dy herë `/api/auth`.
- `admin-dashboard.controller.js` cakton `getStats` dy herë; implementimi i dytë mbetet efektiv.
- Repository i brands kërkon relacionin `products`, që mungon në modelin Brand aktual.
- Lint frontend kishte gabime në main, Home, ProductExplorer dhe admin Dashboard; useSocket kishte warning për dependencies.
- `.eslintignore` nuk mbështetet nga versioni aktual ESLint; skedari historik ruhet. Komanda lint e frontend-it tani punon nga folderi frontend.

Këto nuk u korrigjuan sepse kërkojnë ndryshime përtej lëvizjeve/path-eve të miratuara. Nuk u hoqën komente apo implementime potencialisht të përdorshme.
