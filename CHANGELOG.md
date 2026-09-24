# Changelog i ristrukturimit

## Ndarja e plotë backend — 2026-09-23

- Assessment, routine, progress dhe admin tani kanë service/repository. Blloqet ekzistuese u nxorën mekanikisht; statuset, query-t dhe rendi i operacioneve ruhen.
- Auth service përdor `auth.repository.findByIdWithRoles` dhe `findById`; nuk kryen query direkte.
- `backend/package.json`: main korrigjohet në src/server.js dhe shtohet `npm test` për feature-flow.test.js.
- FLOW.md dhe STRUCTURE.md u përditësuan sipas rrjedhës reale. Nuk u ndryshuan CSV/imazhe, .env, .gitignore, schema.prisma apo modeli ML.
- 75 skenarë krahasimi para/pas kaluan, përfshirë përgjigje, gabime, headers, log-e dhe query-t.

| Nga | Në |
|---|---|
| backend/src/features/catalog/brands/brand.controller.js | backend/src/features/brands/brand.controller.js |
| backend/src/features/catalog/brands/brand.repository.js | backend/src/features/brands/brand.repository.js |
| backend/src/features/catalog/brands/brand.routes.js | backend/src/features/brands/brand.routes.js |
| backend/src/features/catalog/brands/brand.service.js | backend/src/features/brands/brand.service.js |
| backend/src/features/catalog/categories/category.controller.js | backend/src/features/categories/category.controller.js |
| backend/src/features/catalog/categories/category.repository.js | backend/src/features/categories/category.repository.js |
| backend/src/features/catalog/categories/category.routes.js | backend/src/features/categories/category.routes.js |
| backend/src/features/catalog/categories/category.service.js | backend/src/features/categories/category.service.js |
| backend/src/features/catalog/ingredients/ingredient.controller.js | backend/src/features/ingredients/ingredient.controller.js |
| backend/src/features/catalog/ingredients/ingredient.repository.js | backend/src/features/ingredients/ingredient.repository.js |
| backend/src/features/catalog/ingredients/ingredient.routes.js | backend/src/features/ingredients/ingredient.routes.js |
| backend/src/features/catalog/ingredients/ingredient.service.js | backend/src/features/ingredients/ingredient.service.js |
| backend/src/features/routines/progress.controller.js | backend/src/features/progress/progress.controller.js |
| backend/src/features/routines/progress.routes.js | backend/src/features/progress/progress.routes.js |
| backend/src/shared/middleware/auth.middleware.js | backend/src/middleware/auth.middleware.js |
| backend/src/shared/middleware/role.middleware.js | backend/src/middleware/role.middleware.js |
| backend/src/shared/middleware/validate.middleware.js | backend/src/middleware/validate.middleware.js |

Skedarë të rinj:

- `backend/src/features/assessment/assessment.service.js`
- `backend/src/features/assessment/assessment.repository.js`
- `backend/src/features/routines/routine.service.js`
- `backend/src/features/routines/routine.repository.js`
- `backend/src/features/progress/progress.service.js`
- `backend/src/features/progress/progress.repository.js`
- `backend/src/features/admin/admin-user.service.js`
- `backend/src/features/admin/admin-user.repository.js`
- `backend/src/features/admin/admin-product.service.js`
- `backend/src/features/admin/admin-product.repository.js`
- `backend/src/features/admin/admin-dashboard.service.js`
- `backend/src/features/admin/admin-dashboard.repository.js`
- `backend/tests/feature-flow.test.js`

## Pastrim i autorizuar — 2026-09-23

- U fshinë `backend/scripts/legacy/`, `backend/src/legacy/`, `frontend/src/legacy/` dhe `backend/src/shared/database/mongodb.js` (19 skedarë kodi/stili, përfshirë placeholders bosh).
- Për të ruajtur të gjitha imazhet, `frontend/src/legacy/assets/` u zhvendos në `frontend/src/assets/template/`; `frontend/src/legacy/assets-copy/` në `frontend/src/assets/template-copy/` (hero.png, react.svg dhe vite.svg në secilin folder).
- U hoq montimi i dytë i `/api/auth` në server.js.
- U hoq caktimi i parë, i mbishkruar, i `exports.getStats`; versioni efektiv me `productsByCategory` mbeti i pandryshuar.
- Asnjë CSV apo imazh nuk u fshi. Regjistrimi origjinal i lëvizjeve më poshtë është historik.

Çdo lëvizje/riemërtim është renditur më poshtë. Asnjë dataset, model, imazh apo funksionalitet nuk është fshirë. Importet dhe path-et e skedarëve janë përditësuar; trupi i logjikës së biznesit është ruajtur.

| Nga | Në |
|---|---|
| public/favicon.svg | frontend/public/favicon.svg |
| public/icons.svg | frontend/public/icons.svg |
| public/images/aura-emblem-logo.png | frontend/public/images/aura-emblem-logo.png |
| public/images/aura-hero-lab.png | frontend/public/images/aura-hero-lab.png |
| public/images/products/0.jpg | frontend/public/images/products/0.jpg |
| public/images/products/1.jpg | frontend/public/images/products/1.jpg |
| public/images/products/10.jpg | frontend/public/images/products/10.jpg |
| public/images/products/11.jpg | frontend/public/images/products/11.jpg |
| public/images/products/12.jpg | frontend/public/images/products/12.jpg |
| public/images/products/13.jpg | frontend/public/images/products/13.jpg |
| public/images/products/14.jpg | frontend/public/images/products/14.jpg |
| public/images/products/15.jpg | frontend/public/images/products/15.jpg |
| public/images/products/16.jpg | frontend/public/images/products/16.jpg |
| public/images/products/17.jpg | frontend/public/images/products/17.jpg |
| public/images/products/18.jpg | frontend/public/images/products/18.jpg |
| public/images/products/19.jpg | frontend/public/images/products/19.jpg |
| public/images/products/2.jpg | frontend/public/images/products/2.jpg |
| public/images/products/20.jpg | frontend/public/images/products/20.jpg |
| public/images/products/21.jpg | frontend/public/images/products/21.jpg |
| public/images/products/22.jpg | frontend/public/images/products/22.jpg |
| public/images/products/23.jpg | frontend/public/images/products/23.jpg |
| public/images/products/24.jpg | frontend/public/images/products/24.jpg |
| public/images/products/25.jpg | frontend/public/images/products/25.jpg |
| public/images/products/26.jpg | frontend/public/images/products/26.jpg |
| public/images/products/27.jpg | frontend/public/images/products/27.jpg |
| public/images/products/28.jpg | frontend/public/images/products/28.jpg |
| public/images/products/29.jpg | frontend/public/images/products/29.jpg |
| public/images/products/3.jpg | frontend/public/images/products/3.jpg |
| public/images/products/30.jpg | frontend/public/images/products/30.jpg |
| public/images/products/31.jpg | frontend/public/images/products/31.jpg |
| public/images/products/32.jpg | frontend/public/images/products/32.jpg |
| public/images/products/33.jpg | frontend/public/images/products/33.jpg |
| public/images/products/34.jpg | frontend/public/images/products/34.jpg |
| public/images/products/35.jpg | frontend/public/images/products/35.jpg |
| public/images/products/36.jpg | frontend/public/images/products/36.jpg |
| public/images/products/37.jpg | frontend/public/images/products/37.jpg |
| public/images/products/38.jpg | frontend/public/images/products/38.jpg |
| public/images/products/39.jpg | frontend/public/images/products/39.jpg |
| public/images/products/4.jpg | frontend/public/images/products/4.jpg |
| public/images/products/40.jpg | frontend/public/images/products/40.jpg |
| public/images/products/41.jpg | frontend/public/images/products/41.jpg |
| public/images/products/42.jpg | frontend/public/images/products/42.jpg |
| public/images/products/43.jpg | frontend/public/images/products/43.jpg |
| public/images/products/44.jpg | frontend/public/images/products/44.jpg |
| public/images/products/45.jpg | frontend/public/images/products/45.jpg |
| public/images/products/46.jpg | frontend/public/images/products/46.jpg |
| public/images/products/47.jpg | frontend/public/images/products/47.jpg |
| public/images/products/48.jpg | frontend/public/images/products/48.jpg |
| public/images/products/49.jpg | frontend/public/images/products/49.jpg |
| public/images/products/5.jpg | frontend/public/images/products/5.jpg |
| public/images/products/50.jpg | frontend/public/images/products/50.jpg |
| public/images/products/51.jpg | frontend/public/images/products/51.jpg |
| public/images/products/52.jpg | frontend/public/images/products/52.jpg |
| public/images/products/53.jpg | frontend/public/images/products/53.jpg |
| public/images/products/54.jpg | frontend/public/images/products/54.jpg |
| public/images/products/55.jpg | frontend/public/images/products/55.jpg |
| public/images/products/56.jpg | frontend/public/images/products/56.jpg |
| public/images/products/57.jpg | frontend/public/images/products/57.jpg |
| public/images/products/58.jpg | frontend/public/images/products/58.jpg |
| public/images/products/59.jpg | frontend/public/images/products/59.jpg |
| public/images/products/6.jpg | frontend/public/images/products/6.jpg |
| public/images/products/60.jpg | frontend/public/images/products/60.jpg |
| public/images/products/61.jpg | frontend/public/images/products/61.jpg |
| public/images/products/62.jpg | frontend/public/images/products/62.jpg |
| public/images/products/63.jpg | frontend/public/images/products/63.jpg |
| public/images/products/64.jpg | frontend/public/images/products/64.jpg |
| public/images/products/65.jpg | frontend/public/images/products/65.jpg |
| public/images/products/66.jpg | frontend/public/images/products/66.jpg |
| public/images/products/67.jpg | frontend/public/images/products/67.jpg |
| public/images/products/68.jpg | frontend/public/images/products/68.jpg |
| public/images/products/69.jpg | frontend/public/images/products/69.jpg |
| public/images/products/7.jpg | frontend/public/images/products/7.jpg |
| public/images/products/70.jpg | frontend/public/images/products/70.jpg |
| public/images/products/71.jpg | frontend/public/images/products/71.jpg |
| public/images/products/72.jpg | frontend/public/images/products/72.jpg |
| public/images/products/73.jpg | frontend/public/images/products/73.jpg |
| public/images/products/74.jpg | frontend/public/images/products/74.jpg |
| public/images/products/75.jpg | frontend/public/images/products/75.jpg |
| public/images/products/76.jpg | frontend/public/images/products/76.jpg |
| public/images/products/77.jpg | frontend/public/images/products/77.jpg |
| public/images/products/78.jpg | frontend/public/images/products/78.jpg |
| public/images/products/79.jpg | frontend/public/images/products/79.jpg |
| public/images/products/8.jpg | frontend/public/images/products/8.jpg |
| public/images/products/80.jpg | frontend/public/images/products/80.jpg |
| public/images/products/81.jpg | frontend/public/images/products/81.jpg |
| public/images/products/82.jpg | frontend/public/images/products/82.jpg |
| public/images/products/83.jpg | frontend/public/images/products/83.jpg |
| public/images/products/84.jpg | frontend/public/images/products/84.jpg |
| public/images/products/85.jpg | frontend/public/images/products/85.jpg |
| public/images/products/86.jpg | frontend/public/images/products/86.jpg |
| public/images/products/87.jpg | frontend/public/images/products/87.jpg |
| public/images/products/88.jpg | frontend/public/images/products/88.jpg |
| public/images/products/89.jpg | frontend/public/images/products/89.jpg |
| public/images/products/9.jpg | frontend/public/images/products/9.jpg |
| public/images/products/90.jpg | frontend/public/images/products/90.jpg |
| public/images/products/91.jpg | frontend/public/images/products/91.jpg |
| public/images/products/92.jpg | frontend/public/images/products/92.jpg |
| public/images/products/93.jpg | frontend/public/images/products/93.jpg |
| public/images/products/94.jpg | frontend/public/images/products/94.jpg |
| public/images/products/95.jpg | frontend/public/images/products/95.jpg |
| public/images/products/96.jpg | frontend/public/images/products/96.jpg |
| public/images/products/97.jpg | frontend/public/images/products/97.jpg |
| public/images/products/98.jpg | frontend/public/images/products/98.jpg |
| public/images/products/99.jpg | frontend/public/images/products/99.jpg |
| src/assets copy/hero.png | frontend/src/legacy/assets-copy/hero.png |
| src/assets copy/react.svg | frontend/src/legacy/assets-copy/react.svg |
| src/assets copy/vite.svg | frontend/src/legacy/assets-copy/vite.svg |
| src/assets/hero.png | frontend/src/legacy/assets/hero.png |
| src/assets/react.svg | frontend/src/legacy/assets/react.svg |
| src/assets/vite.svg | frontend/src/legacy/assets/vite.svg |
| package.json | frontend/package.json |
| package-lock.json | frontend/package-lock.json |
| vite.config.js | frontend/vite.config.js |
| eslint.config.js | frontend/eslint.config.js |
| .eslintignore | frontend/.eslintignore |
| index.html | frontend/index.html |
| src/App.jsx | frontend/src/app/app.jsx |
| src/main.jsx | frontend/src/app/main.jsx |
| src/index.css | frontend/src/shared/styles/index.css |
| src/App.css | frontend/src/legacy/app.css |
| src/components/Navbar.jsx | frontend/src/shared/components/navbar.jsx |
| src/components/ProductCard.jsx | frontend/src/features/products/product-card.jsx |
| src/components/FilterBar.jsx | frontend/src/legacy/filter-bar.jsx |
| src/components/ProtectedAdminRoute.jsx | frontend/src/legacy/protected-admin-route.jsx |
| src/components/RoutineCard.jsx | frontend/src/legacy/routine-card.jsx |
| src/hooks/useSocket.js | frontend/src/features/notifications/use-socket.js |
| src/pages/Home.jsx | frontend/src/features/home/home.jsx |
| src/pages/Login.jsx | frontend/src/features/auth/login.jsx |
| src/pages/Register.jsx | frontend/src/features/auth/register.jsx |
| src/pages/ProductExplorer.jsx | frontend/src/features/products/product-explorer.jsx |
| src/pages/Quiz.jsx | frontend/src/features/assessment/quiz.jsx |
| src/pages/Routine.jsx | frontend/src/features/routines/routine.jsx |
| src/pages/Dashboard.jsx | frontend/src/features/routines/dashboard.jsx |
| src/pages/admin/AdminLayout.jsx | frontend/src/features/admin/admin-layout.jsx |
| src/pages/admin/Dashboard.jsx | frontend/src/features/admin/dashboard.jsx |
| src/pages/admin/UsersPage.jsx | frontend/src/features/admin/users-page.jsx |
| src/pages/admin/ProductsPage.jsx | frontend/src/features/admin/products-page.jsx |
| src/services/api.js | frontend/src/shared/services/api.js |
| src/services/adminService.js | frontend/src/features/admin/admin.service.js |
| src/services/authService.js | frontend/src/legacy/auth-service.js |
| src/services/productService.js | frontend/src/legacy/product-service.js |
| src/store/index.js | frontend/src/app/store.js |
| src/store/slices/authSlice.js | frontend/src/features/auth/auth.slice.js |
| src/store/slices/productsSlice.js | frontend/src/features/products/products.slice.js |
| src/store/slices/routineSlice.js | frontend/src/features/routines/routine.slice.js |
| src/store/slices/notificationSlice.js | frontend/src/features/notifications/notification.slice.js |
| backend/server.js | backend/src/server.js |
| backend/src/app.js | backend/src/legacy/app.js |
| backend/src/index.js | backend/src/legacy/index.js |
| backend/src/config/mongodb.js | backend/src/shared/database/mongodb.js |
| backend/src/middlewares/auth.middleware.js | backend/src/shared/middleware/auth.middleware.js |
| backend/src/middlewares/role.middleware.js | backend/src/shared/middleware/role.middleware.js |
| backend/src/middlewares/validate.middleware.js | backend/src/shared/middleware/validate.middleware.js |
| backend/src/routes/auth.routes.js | backend/src/features/auth/auth.routes.js |
| backend/src/controllers/auth.controller.js | backend/src/features/auth/auth.controller.js |
| backend/src/services/auth.service.js | backend/src/features/auth/auth.service.js |
| backend/src/repositories/auth.repository.js | backend/src/features/auth/auth.repository.js |
| backend/src/validators/auth.validator.js | backend/src/features/auth/auth.validator.js |
| backend/src/routes/product.routes.js | backend/src/features/products/product.routes.js |
| backend/src/controllers/product.controller.js | backend/src/features/products/product.controller.js |
| backend/src/services/product.service.js | backend/src/features/products/product.service.js |
| backend/src/repositories/product.repository.js | backend/src/features/products/product.repository.js |
| backend/src/routes/brand.routes.js | backend/src/features/catalog/brands/brand.routes.js |
| backend/src/controllers/brand.controller.js | backend/src/features/catalog/brands/brand.controller.js |
| backend/src/services/brand.service.js | backend/src/features/catalog/brands/brand.service.js |
| backend/src/repositories/brand.repository.js | backend/src/features/catalog/brands/brand.repository.js |
| backend/src/routes/category.routes.js | backend/src/features/catalog/categories/category.routes.js |
| backend/src/controllers/category.controller.js | backend/src/features/catalog/categories/category.controller.js |
| backend/src/services/category.service.js | backend/src/features/catalog/categories/category.service.js |
| backend/src/repositories/category.repository.js | backend/src/features/catalog/categories/category.repository.js |
| backend/src/routes/ingredient.routes.js | backend/src/features/catalog/ingredients/ingredient.routes.js |
| backend/src/controllers/ingredient.controller.js | backend/src/features/catalog/ingredients/ingredient.controller.js |
| backend/src/services/ingredient.service.js | backend/src/features/catalog/ingredients/ingredient.service.js |
| backend/src/repositories/ingredient.repository.js | backend/src/features/catalog/ingredients/ingredient.repository.js |
| backend/src/routes/assessment.routes.js | backend/src/features/assessment/assessment.routes.js |
| backend/src/controllers/assessment.controller.js | backend/src/features/assessment/assessment.controller.js |
| backend/src/routes/routine.routes.js | backend/src/features/routines/routine.routes.js |
| backend/src/controllers/routine.controller.js | backend/src/features/routines/routine.controller.js |
| backend/src/routes/progress.routes.js | backend/src/features/routines/progress.routes.js |
| backend/src/controllers/progress.controller.js | backend/src/features/routines/progress.controller.js |
| backend/src/routes/admin.routes.js | backend/src/features/admin/admin.routes.js |
| backend/src/controllers/admin/adminDashboard.controller.js | backend/src/features/admin/admin-dashboard.controller.js |
| backend/src/controllers/admin/adminProduct.controller.js | backend/src/features/admin/admin-product.controller.js |
| backend/src/controllers/admin/adminUser.controller.js | backend/src/features/admin/admin-user.controller.js |
| backend/src/models/SkinAssessmentLog.js | backend/src/features/assessment/skin-assessment-log.model.js |
| backend/src/models/AssessmentLog.js | backend/src/legacy/models/assessment-log.model.js |
| backend/src/models/ProgressNote.js | backend/src/legacy/models/progress-note.model.js |
| backend/src/models/Recommendation.js | backend/src/legacy/models/recommendation.model.js |
| backend/seedProducts.js | backend/scripts/seed-products.js |
| backend/seed.js | backend/scripts/legacy/seed.js |
| backend/src/scripts/deleteProducts.js | backend/scripts/legacy/delete-products.js |
| backend/src/scripts/fixImages.js | backend/scripts/legacy/fix-images.js |
| backend/src/scripts/fixNames.js | backend/scripts/legacy/fix-names.js |
| backend/src/scripts/seedBase.js | backend/scripts/legacy/seed-base.js |
| backend/src/scripts/seedFix.js | backend/scripts/legacy/seed-fix.js |
| backend/src/scripts/seedProducts.js | backend/scripts/legacy/seed-products.js |

## Ndryshime konfigurimi

- Root package.json ofron komandat dev/build/lint/preview për frontend dhe dev:backend/start:backend për backend.
- Frontend index.html referon src/app/main.jsx; Vite lexon .env nga rrënja dhe ndërton në frontend/dist/ me konfigurimin standard.
- Backend start/dev referojnë src/server.js; rruga statike /images ruan folderin backend/public/images.
- ML dhe të dy seed-et që përdorin skincare_100.csv referojnë data/skincare_100.csv; kopjet mbeten të ruajtura.
- Script-et historike ruajnë input/output path-et e tyre.
- README.md, STRUCTURE.md, INVENTORY.md dhe CLEANUP.md dokumentojnë strukturën dhe kufizimet.
