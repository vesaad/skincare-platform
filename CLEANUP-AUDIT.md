# Verifikimi i pastrimit — 2026-09-23

> Përditësim pas këtij auditimi: me kërkesën e përdoruesit u fshinë tre folderët legacy dhe `backend/src/shared/database/mongodb.js`. Gjashtë imazhet brenda frontend legacy u ruajtën në `frontend/src/assets/template/` dhe `template-copy/`. U hoqën montimi i dytë `/api/auth` dhe implementimi i mbishkruar `getStats`. Tabelat më poshtë dokumentojnë snapshot-in PARA këtij pastrimi, jo gjendjen aktuale.

Workspace i kontrolluar: `C:/Users/Vesa/Desktop/skincare-platform`. Kontrolluar filesystem-i aktual, jo vetëm Git HEAD. U lexuan 328 skedarë projekti (përjashtuar dependencies, build output, Git dhe cache); u analizuan AST-të e 80 skedarëve JS/JSX/config. Çdo import/require dhe lazy import me path literal u kontrollua në disk. Nuk u gjetën path-e të llogaritura që do të mbeteshin të pazgjidhura nga ky kontroll. Source code nuk u ndryshua dhe asgjë nuk u fshi.

## Rezultati PO/JO

| Kontrolli | Rezultati | Evidenca |
|---|---|---|
| Import/require JS/JSX drejt një skedari të munguar? | JO | 89 referenca lokale, të gjitha zgjidhen. 208 deklarata import/require gjithsej; paketat/builtins gjithashtu zgjidhen në instalimin aktual. |
| Import lokal Python drejt një skedari të munguar? | JO | `ml-service/main.py` importon `run_prediction` nga `ml-service/predict.py`, që ekziston. Imports e tjerë në katër scripts Python janë standard library ose paketa. |
| A mungon një paketë Python? | PO | `pandas` mungon në interpreter-in `python` të kontrolluar; figuron te `ml-service/requirements.txt`. Kjo nuk është fshirje e një skedari lokal. |
| A kanë mbaruar të gjitha fshirjet legacy në këtë workspace? | JO | Ekzistojnë ende 24 skedarë brenda tre folderëve legacy, të renditur më poshtë. |
| A importon kodi aktiv një skedar legacy? | JO | Nga `backend/src/server.js` dhe `frontend/src/app/main.jsx` nuk arrihet asnjë skedar legacy. |
| A ka import mes vetë skedarëve legacy? | PO | `backend/src/legacy/index.js` importon `./app`; fshirja vetëm e app.js do të linte entrypoint-in historik me import të prishur. |
| A ka entrypoint alternativ historik? | PO | `backend/src/legacy/index.js` → `app.js`; npm start/dev përdorin vetëm `backend/src/server.js`. |
| A ka metadata entrypoint të pasaktë? | PO | `backend/package.json` deklaron `main: index.js`, por backend/index.js mungon; start/dev mbeten të sakta. Kjo nuk është një import i thyer në aplikacionin aktual. |
| A ka modele Mongoose pa importues? | PO | assessment-log, progress-note, recommendation te legacy/models. Modeli SkinAssessmentLog është i përdorur nga controller-i aktiv dhe duhet ruajtur. |
| A ka kod jashtë legacy pa lidhje me entrypoint-et aktive? | PO | `backend/src/shared/database/mongodb.js` (vetëm legacy/index e importon); `frontend/src/features/notifications/use-socket.js` (asnjë importues). |
| A ka kopje identike? | PO | Krahasim SHA-256: CSV-të, template assets dhe disa imazhe; lista poshtë. |
| A ekzistojnë input-et runtime të ML-së? | PO | `data/skincare_100.csv` dhe `ml-service/model.pkl`; predict.py lexon këto path-e. |
| A provohet funksionimi 100% vetëm nga importet? | JO | Nuk u testuan lidhje DB, endpoint-e end-to-end ose inference. Mungon pandas në interpreter-in lokal. |

## Skedarët legacy që ekzistojnë ende

- `backend/scripts/legacy/delete-products.js`
- `backend/scripts/legacy/fix-images.js`
- `backend/scripts/legacy/fix-names.js`
- `backend/scripts/legacy/seed-base.js`
- `backend/scripts/legacy/seed-fix.js`
- `backend/scripts/legacy/seed-products.js`
- `backend/scripts/legacy/seed.js`
- `backend/src/legacy/app.js`
- `backend/src/legacy/index.js`
- `backend/src/legacy/models/assessment-log.model.js`
- `backend/src/legacy/models/progress-note.model.js`
- `backend/src/legacy/models/recommendation.model.js`
- `frontend/src/legacy/app.css`
- `frontend/src/legacy/assets/hero.png`
- `frontend/src/legacy/assets/react.svg`
- `frontend/src/legacy/assets/vite.svg`
- `frontend/src/legacy/assets-copy/hero.png`
- `frontend/src/legacy/assets-copy/react.svg`
- `frontend/src/legacy/assets-copy/vite.svg`
- `frontend/src/legacy/auth-service.js`
- `frontend/src/legacy/filter-bar.jsx`
- `frontend/src/legacy/product-service.js`
- `frontend/src/legacy/protected-admin-route.jsx`
- `frontend/src/legacy/routine-card.jsx`

## Kandidatë jashtë folderëve legacy

- `backend/src/shared/database/mongodb.js`: përdoret vetëm nga entrypoint-i historik. Serveri aktiv ka lidhjen MongoDB brenda server.js; nuk duhet hequr Mongoose ose modeli aktiv.
- `frontend/src/features/notifications/use-socket.js`: zero importues statikë. `notification.slice.js` përdoret nga store dhe nuk është pa importues.
- `data/products.csv` dhe `backend/products.csv`: dataset historik, kopje identike; preprocessing/seed-et historike e përdorin.
- `ml-service/skincare_100.csv`: kopje identike që nuk lexohet më nga prediction runtime. `data/skincare_100.csv` është burimi kanonik aktiv.
- `ml/skincare_100.csv`, `ml/users.csv`, `ml/interactions.csv`: lexohen nga notebook-u historik, jo nga FastAPI. Heqja e tyre prish riprodhimin e atij notebook-u.
- `ml/.ipynb_checkpoints/skincare_ml-checkpoint.ipynb`: checkpoint historik, i ruajtur. Notebook-u kryesor është workflow trajnimi, jo import runtime.
- `frontend/public/icons.svg`: nuk u gjet referencë në kodin aktual; është asset publik, ndaj kjo nuk provon që URL-ja nuk përdoret jashtë aplikacionit.
- `backend/public/images/product_*.jpg`: shërbehen ende nga serveri. URL-të mund të ruhen në DB, ndaj nuk propozohen si të sigurta për fshirje bazuar vetëm te importet.
- `ml-service/save_model.py`, `backend/scripts/seed-products.js` dhe `scripts/preprocessing.py` janë utilities me hyrje manuale; mungesa e importuesit nuk mjafton për t'i quajtur kod të vdekur.

## Duplikime brenda kodit aktiv

- `backend/src/server.js`: monton `/api/auth` dy herë.
- `backend/src/features/admin/admin-dashboard.controller.js`: cakton `exports.getStats` dy herë; caktimi i dytë mbishkruan të parin.

Asnjë prej tyre nuk u ndryshua. Fshirja e kandidatëve kërkon listën e miratuar të përdoruesit.

## Grupe byte-identike (SHA-256)

- `backend/products.csv`, `data/products.csv`
- `backend/public/images/product_1.jpg`, `backend/public/images/product_83.jpg`
- `backend/public/images/product_11.jpg`, `backend/public/images/product_14.jpg`
- `backend/public/images/product_13.jpg`, `backend/public/images/product_45.jpg`
- `backend/public/images/product_19.jpg`, `backend/public/images/product_42.jpg`
- `backend/public/images/product_2.jpg`, `backend/public/images/product_31.jpg`, `backend/public/images/product_88.jpg`
- `backend/public/images/product_20.jpg`, `backend/public/images/product_48.jpg`
- `backend/public/images/product_21.jpg`, `backend/public/images/product_81.jpg`
- `backend/public/images/product_28.jpg`, `backend/public/images/product_44.jpg`
- `backend/public/images/product_29.jpg`, `backend/public/images/product_73.jpg`
- `backend/public/images/product_33.jpg`, `backend/public/images/product_4.jpg`, `backend/public/images/product_9.jpg`, `backend/public/images/product_99.jpg`
- `backend/public/images/product_35.jpg`, `backend/public/images/product_96.jpg`
- `backend/public/images/product_41.jpg`, `backend/public/images/product_84.jpg`
- `backend/public/images/product_54.jpg`, `backend/public/images/product_7.jpg`, `backend/public/images/product_76.jpg`
- `backend/public/images/product_59.jpg`, `backend/public/images/product_92.jpg`
- `backend/public/images/product_61.jpg`, `backend/public/images/product_78.jpg`
- `backend/public/images/product_67.jpg`, `backend/public/images/product_68.jpg`
- `backend/public/images/product_70.jpg`, `backend/public/images/product_93.jpg`
- `backend/public/images/product_72.jpg`, `backend/public/images/product_94.jpg`
- `backend/public/images/product_80.jpg`, `backend/public/images/product_87.jpg`
- `data/skincare_100.csv`, `ml/skincare_100.csv`, `ml-service/skincare_100.csv`
- `frontend/src/legacy/assets/hero.png`, `frontend/src/legacy/assets-copy/hero.png`
- `frontend/src/legacy/assets/react.svg`, `frontend/src/legacy/assets-copy/react.svg`
- `frontend/src/legacy/assets/vite.svg`, `frontend/src/legacy/assets-copy/vite.svg`
- `frontend/src/legacy/auth-service.js`, `frontend/src/legacy/product-service.js`, `frontend/src/legacy/routine-card.jsx`

## Çdo import lokal JS/JSX i verifikuar

| Importuesi:rreshti | Path-i i shkruar | Skedari real | Ekziston |
|---|---|---|---|
| backend/src/features/admin/admin.routes.js:3 | `../../shared/middleware/auth.middleware.js` | backend/src/shared/middleware/auth.middleware.js | PO |
| backend/src/features/admin/admin.routes.js:4 | `../../shared/middleware/role.middleware.js` | backend/src/shared/middleware/role.middleware.js | PO |
| backend/src/features/admin/admin.routes.js:5 | `./admin-user.controller.js` | backend/src/features/admin/admin-user.controller.js | PO |
| backend/src/features/admin/admin.routes.js:6 | `./admin-product.controller.js` | backend/src/features/admin/admin-product.controller.js | PO |
| backend/src/features/admin/admin.routes.js:7 | `./admin-dashboard.controller.js` | backend/src/features/admin/admin-dashboard.controller.js | PO |
| backend/src/features/assessment/assessment.controller.js:1 | `./skin-assessment-log.model` | backend/src/features/assessment/skin-assessment-log.model.js | PO |
| backend/src/features/assessment/assessment.routes.js:2 | `../../shared/middleware/auth.middleware.js` | backend/src/shared/middleware/auth.middleware.js | PO |
| backend/src/features/assessment/assessment.routes.js:3 | `./assessment.controller.js` | backend/src/features/assessment/assessment.controller.js | PO |
| backend/src/features/auth/auth.controller.js:1 | `./auth.service.js` | backend/src/features/auth/auth.service.js | PO |
| backend/src/features/auth/auth.routes.js:2 | `../../shared/middleware/auth.middleware.js` | backend/src/shared/middleware/auth.middleware.js | PO |
| backend/src/features/auth/auth.routes.js:3 | `../../shared/middleware/validate.middleware.js` | backend/src/shared/middleware/validate.middleware.js | PO |
| backend/src/features/auth/auth.routes.js:4 | `./auth.validator.js` | backend/src/features/auth/auth.validator.js | PO |
| backend/src/features/auth/auth.routes.js:7 | `./auth.controller.js` | backend/src/features/auth/auth.controller.js | PO |
| backend/src/features/auth/auth.service.js:4 | `./auth.repository.js` | backend/src/features/auth/auth.repository.js | PO |
| backend/src/features/catalog/brands/brand.controller.js:1 | `./brand.service.js` | backend/src/features/catalog/brands/brand.service.js | PO |
| backend/src/features/catalog/brands/brand.routes.js:2 | `../../../shared/middleware/auth.middleware.js` | backend/src/shared/middleware/auth.middleware.js | PO |
| backend/src/features/catalog/brands/brand.routes.js:3 | `../../../shared/middleware/role.middleware.js` | backend/src/shared/middleware/role.middleware.js | PO |
| backend/src/features/catalog/brands/brand.routes.js:4 | `./brand.controller.js` | backend/src/features/catalog/brands/brand.controller.js | PO |
| backend/src/features/catalog/brands/brand.service.js:1 | `./brand.repository.js` | backend/src/features/catalog/brands/brand.repository.js | PO |
| backend/src/features/catalog/categories/category.controller.js:1 | `./category.service.js` | backend/src/features/catalog/categories/category.service.js | PO |
| backend/src/features/catalog/categories/category.routes.js:2 | `../../../shared/middleware/auth.middleware.js` | backend/src/shared/middleware/auth.middleware.js | PO |
| backend/src/features/catalog/categories/category.routes.js:3 | `../../../shared/middleware/role.middleware.js` | backend/src/shared/middleware/role.middleware.js | PO |
| backend/src/features/catalog/categories/category.routes.js:4 | `./category.controller.js` | backend/src/features/catalog/categories/category.controller.js | PO |
| backend/src/features/catalog/categories/category.service.js:1 | `./category.repository.js` | backend/src/features/catalog/categories/category.repository.js | PO |
| backend/src/features/catalog/ingredients/ingredient.controller.js:1 | `./ingredient.service.js` | backend/src/features/catalog/ingredients/ingredient.service.js | PO |
| backend/src/features/catalog/ingredients/ingredient.routes.js:2 | `../../../shared/middleware/auth.middleware.js` | backend/src/shared/middleware/auth.middleware.js | PO |
| backend/src/features/catalog/ingredients/ingredient.routes.js:3 | `../../../shared/middleware/role.middleware.js` | backend/src/shared/middleware/role.middleware.js | PO |
| backend/src/features/catalog/ingredients/ingredient.routes.js:4 | `./ingredient.controller.js` | backend/src/features/catalog/ingredients/ingredient.controller.js | PO |
| backend/src/features/catalog/ingredients/ingredient.service.js:1 | `./ingredient.repository.js` | backend/src/features/catalog/ingredients/ingredient.repository.js | PO |
| backend/src/features/products/product.controller.js:1 | `./product.service.js` | backend/src/features/products/product.service.js | PO |
| backend/src/features/products/product.routes.js:2 | `../../shared/middleware/auth.middleware.js` | backend/src/shared/middleware/auth.middleware.js | PO |
| backend/src/features/products/product.routes.js:3 | `../../shared/middleware/role.middleware.js` | backend/src/shared/middleware/role.middleware.js | PO |
| backend/src/features/products/product.routes.js:4 | `./product.controller.js` | backend/src/features/products/product.controller.js | PO |
| backend/src/features/products/product.service.js:1 | `./product.repository.js` | backend/src/features/products/product.repository.js | PO |
| backend/src/features/routines/progress.routes.js:2 | `../../shared/middleware/auth.middleware.js` | backend/src/shared/middleware/auth.middleware.js | PO |
| backend/src/features/routines/progress.routes.js:3 | `./progress.controller.js` | backend/src/features/routines/progress.controller.js | PO |
| backend/src/features/routines/routine.routes.js:2 | `../../shared/middleware/auth.middleware.js` | backend/src/shared/middleware/auth.middleware.js | PO |
| backend/src/features/routines/routine.routes.js:3 | `./routine.controller.js` | backend/src/features/routines/routine.controller.js | PO |
| backend/src/legacy/app.js:10 | `../features/admin/admin.routes.js` | backend/src/features/admin/admin.routes.js | PO |
| backend/src/legacy/index.js:1 | `./app` | backend/src/legacy/app.js | PO |
| backend/src/legacy/index.js:2 | `../shared/database/mongodb` | backend/src/shared/database/mongodb.js | PO |
| backend/src/server.js:5 | `./shared/middleware/auth.middleware.js` | backend/src/shared/middleware/auth.middleware.js | PO |
| backend/src/server.js:16 | `./features/admin/admin.routes.js` | backend/src/features/admin/admin.routes.js | PO |
| backend/src/server.js:17 | `./features/auth/auth.routes.js` | backend/src/features/auth/auth.routes.js | PO |
| backend/src/server.js:20 | `./features/auth/auth.routes.js` | backend/src/features/auth/auth.routes.js | PO |
| backend/src/server.js:25 | `./features/catalog/brands/brand.routes.js` | backend/src/features/catalog/brands/brand.routes.js | PO |
| backend/src/server.js:26 | `./features/catalog/ingredients/ingredient.routes.js` | backend/src/features/catalog/ingredients/ingredient.routes.js | PO |
| backend/src/server.js:27 | `./features/catalog/categories/category.routes.js` | backend/src/features/catalog/categories/category.routes.js | PO |
| backend/src/server.js:28 | `./features/products/product.routes.js` | backend/src/features/products/product.routes.js | PO |
| backend/src/server.js:29 | `./features/assessment/assessment.routes.js` | backend/src/features/assessment/assessment.routes.js | PO |
| backend/src/server.js:30 | `./features/routines/routine.routes.js` | backend/src/features/routines/routine.routes.js | PO |
| backend/src/server.js:31 | `./features/routines/progress.routes.js` | backend/src/features/routines/progress.routes.js | PO |
| frontend/src/app/app.jsx:4 | `../shared/components/navbar` | frontend/src/shared/components/navbar.jsx | PO |
| frontend/src/app/app.jsx:6 | `../features/home/home` | frontend/src/features/home/home.jsx | PO |
| frontend/src/app/app.jsx:7 | `../features/auth/login` | frontend/src/features/auth/login.jsx | PO |
| frontend/src/app/app.jsx:8 | `../features/auth/register` | frontend/src/features/auth/register.jsx | PO |
| frontend/src/app/app.jsx:9 | `../features/products/product-explorer` | frontend/src/features/products/product-explorer.jsx | PO |
| frontend/src/app/app.jsx:10 | `../features/assessment/quiz` | frontend/src/features/assessment/quiz.jsx | PO |
| frontend/src/app/app.jsx:11 | `../features/routines/routine` | frontend/src/features/routines/routine.jsx | PO |
| frontend/src/app/app.jsx:12 | `../features/routines/dashboard` | frontend/src/features/routines/dashboard.jsx | PO |
| frontend/src/app/app.jsx:13 | `../features/admin/admin-layout` | frontend/src/features/admin/admin-layout.jsx | PO |
| frontend/src/app/app.jsx:14 | `../features/admin/dashboard` | frontend/src/features/admin/dashboard.jsx | PO |
| frontend/src/app/app.jsx:15 | `../features/admin/users-page` | frontend/src/features/admin/users-page.jsx | PO |
| frontend/src/app/app.jsx:16 | `../features/admin/products-page` | frontend/src/features/admin/products-page.jsx | PO |
| frontend/src/app/main.jsx:6 | `./store` | frontend/src/app/store.js | PO |
| frontend/src/app/main.jsx:7 | `./app` | frontend/src/app/app.jsx | PO |
| frontend/src/app/main.jsx:8 | `../shared/styles/index.css` | frontend/src/shared/styles/index.css | PO |
| frontend/src/app/store.js:3 | `../features/auth/auth.slice` | frontend/src/features/auth/auth.slice.js | PO |
| frontend/src/app/store.js:4 | `../features/products/products.slice` | frontend/src/features/products/products.slice.js | PO |
| frontend/src/app/store.js:5 | `../features/routines/routine.slice` | frontend/src/features/routines/routine.slice.js | PO |
| frontend/src/app/store.js:6 | `../features/notifications/notification.slice` | frontend/src/features/notifications/notification.slice.js | PO |
| frontend/src/features/admin/dashboard.jsx:2 | `./admin.service` | frontend/src/features/admin/admin.service.js | PO |
| frontend/src/features/admin/products-page.jsx:2 | `./admin.service` | frontend/src/features/admin/admin.service.js | PO |
| frontend/src/features/admin/users-page.jsx:2 | `./admin.service` | frontend/src/features/admin/admin.service.js | PO |
| frontend/src/features/assessment/quiz.jsx:4 | `../../shared/services/api` | frontend/src/shared/services/api.js | PO |
| frontend/src/features/assessment/quiz.jsx:5 | `../routines/routine.slice` | frontend/src/features/routines/routine.slice.js | PO |
| frontend/src/features/auth/login.jsx:4 | `./auth.slice` | frontend/src/features/auth/auth.slice.js | PO |
| frontend/src/features/auth/login.jsx:5 | `../../shared/services/api` | frontend/src/shared/services/api.js | PO |
| frontend/src/features/auth/register.jsx:3 | `../../shared/services/api` | frontend/src/shared/services/api.js | PO |
| frontend/src/features/notifications/use-socket.js:4 | `./notification.slice` | frontend/src/features/notifications/notification.slice.js | PO |
| frontend/src/features/products/product-explorer.jsx:3 | `./products.slice` | frontend/src/features/products/products.slice.js | PO |
| frontend/src/features/products/product-explorer.jsx:4 | `../../shared/services/api` | frontend/src/shared/services/api.js | PO |
| frontend/src/features/products/product-explorer.jsx:5 | `./product-card` | frontend/src/features/products/product-card.jsx | PO |
| frontend/src/features/routines/dashboard.jsx:4 | `../../shared/services/api` | frontend/src/shared/services/api.js | PO |
| frontend/src/features/routines/routine.jsx:4 | `../../shared/services/api` | frontend/src/shared/services/api.js | PO |
| frontend/src/features/routines/routine.jsx:5 | `./routine.slice` | frontend/src/features/routines/routine.slice.js | PO |
| frontend/src/shared/components/navbar.jsx:3 | `../../features/auth/auth.slice` | frontend/src/features/auth/auth.slice.js | PO |
| frontend/src/shared/services/api.js:2 | `../../app/store` | frontend/src/app/store.js | PO |
| frontend/src/shared/services/api.js:3 | `../../features/auth/auth.slice` | frontend/src/features/auth/auth.slice.js | PO |

Imports e Python-it u lexuan me AST: main.py → fastapi, fastapi.middleware.cors, pydantic, predict; predict.py → __future__, re, functools, pathlib, typing, joblib, pandas; save_model.py → pathlib, joblib; scripts/preprocessing.py → pandas, numpy, os. Notebook-u dhe checkpoint-i lexojnë users.csv, skincare_100.csv dhe interactions.csv relativisht ndaj ml/; të tre ekzistojnë. Path-i i eksportit të modelit në notebook është ../ml-service/model.pkl.
