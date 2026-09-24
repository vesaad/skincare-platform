# Inventari para ristrukturimit

Snapshot i skedarëve të versionuar përpara çdo lëvizjeje. Për çdo skedar: roli/eksportet dhe importuesit lokalë statikë. Referencat dinamike dhe hyrjet CLI shënohen veçmas; mungesa e importit nuk provon që një script apo asset mund të fshihet. `.env` është regjistruar vetëm me emër, pa lexuar përmbajtjen. `node_modules`, `.git` dhe cache-t e gjeneruara nuk janë source code dhe nuk inventarizohen individualisht.

| Skedari | Roli / eksportet | Importues / përdorues |
|---|---|---|
| .env | Environment configuration; content not read or changed | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| .eslintignore | Entry point, configuration or documentation | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| .gitignore | Entry point, configuration or documentation | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| .vscode/settings.json | Entry point, configuration or documentation | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| README.md | Entry point, configuration or documentation | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/.gitignore | Entry point, configuration or documentation | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/package-lock.json | Dependency lockfile | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/package.json | Package dependencies and executable scripts | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/prisma/schema.prisma | Prisma models and relations; protected, unchanged | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/products.csv | Historical dataset; retained | backend/src/scripts/seedProducts.js; backend/src/scripts/seedFix.js (cwd-relative) |
| backend/public/images/product_0.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_1.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_10.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_100.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_11.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_12.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_13.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_14.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_15.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_16.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_17.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_18.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_19.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_2.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_20.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_21.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_22.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_23.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_24.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_25.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_26.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_27.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_28.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_29.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_3.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_30.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_31.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_32.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_33.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_34.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_35.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_36.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_37.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_38.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_39.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_4.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_40.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_41.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_42.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_43.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_44.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_45.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_46.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_47.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_48.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_49.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_5.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_50.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_51.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_52.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_53.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_54.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_55.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_56.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_57.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_58.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_59.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_6.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_60.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_61.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_62.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_63.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_64.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_65.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_66.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_67.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_68.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_69.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_7.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_70.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_71.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_72.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_73.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_74.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_75.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_76.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_77.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_78.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_79.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_8.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_80.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_81.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_82.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_83.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_84.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_85.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_86.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_87.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_88.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_89.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_9.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_90.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_91.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_92.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_93.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_94.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_95.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_96.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_97.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_98.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/public/images/product_99.jpg | Image served by backend /images; legacy scripts may reference filename | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/seed.js | Defines: seed; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/seedProducts.js | Defines: seed; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/server.js | Entry point, configuration or documentation | backend/package.json (start/dev) |
| backend/src/app.js | Exports: app | backend/src/index.js |
| backend/src/config/mongodb.js | Exports: connectMongo | backend/src/index.js |
| backend/src/controllers/admin/adminDashboard.controller.js | Exports: getStats | backend/src/routes/admin.routes.js |
| backend/src/controllers/admin/adminProduct.controller.js | Exports: getAll; create; update; delete; exportProducts | backend/src/routes/admin.routes.js |
| backend/src/controllers/admin/adminUser.controller.js | Exports: getAll; toggleStatus; assignRole; deleteUser; exportUsers | backend/src/routes/admin.routes.js |
| backend/src/controllers/assessment.controller.js | Exports: { assess } | backend/src/routes/assessment.routes.js |
| backend/src/controllers/auth.controller.js | Exports: { register, login, refresh, logout, me } | backend/src/routes/auth.routes.js |
| backend/src/controllers/brand.controller.js | Exports: { getAll, create } | backend/src/routes/brand.routes.js |
| backend/src/controllers/category.controller.js | Exports: { getAll, create } | backend/src/routes/category.routes.js |
| backend/src/controllers/ingredient.controller.js | Exports: { getAll, create } | backend/src/routes/ingredient.routes.js |
| backend/src/controllers/product.controller.js | Exports: { getAll, search, getById, create, update, remove } | backend/src/routes/product.routes.js |
| backend/src/controllers/progress.controller.js | Exports: { createProgressLog } | backend/src/routes/progress.routes.js |
| backend/src/controllers/routine.controller.js | Exports: { saveRoutine, getActiveRoutine } | backend/src/routes/routine.routes.js |
| backend/src/index.js | Entry point, configuration or documentation | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/src/middlewares/auth.middleware.js | Exports: authMiddleware | backend/server.js; backend/src/routes/admin.routes.js; backend/src/routes/assessment.routes.js; backend/src/routes/auth.routes.js; backend/src/routes/brand.routes.js; backend/src/routes/category.routes.js; backend/src/routes/ingredient.routes.js; backend/src/routes/product.routes.js; backend/src/routes/progress.routes.js; backend/src/routes/routine.routes.js |
| backend/src/middlewares/role.middleware.js | Exports: roleMiddleware | backend/src/routes/admin.routes.js; backend/src/routes/brand.routes.js; backend/src/routes/category.routes.js; backend/src/routes/ingredient.routes.js; backend/src/routes/product.routes.js |
| backend/src/middlewares/validate.middleware.js | Exports: validateMiddleware | backend/src/routes/auth.routes.js |
| backend/src/models/AssessmentLog.js | Exports: mongoose.model('AssessmentLog', assessmentLogSchema) | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/src/models/ProgressNote.js | Exports: mongoose.model('ProgressNote', progressNoteSchema) | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/src/models/Recommendation.js | Exports: mongoose.model('Recommendation', recommendationSchema) | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/src/models/SkinAssessmentLog.js | Exports: mongoose.model('SkinAssessmentLog', skinAssessmentLogSchema) | backend/src/controllers/assessment.controller.js |
| backend/src/repositories/auth.repository.js | Exports: {   findByEmail,   createUser,   findRoleByName,   assignRoleToUser,   saveRefreshToken,   findRefreshToken,   revokeRefreshToken } | backend/src/services/auth.service.js |
| backend/src/repositories/brand.repository.js | Exports: { findAll, create } | backend/src/services/brand.service.js |
| backend/src/repositories/category.repository.js | Exports: { findAll, create } | backend/src/services/category.service.js |
| backend/src/repositories/ingredient.repository.js | Exports: { findAll, create } | backend/src/services/ingredient.service.js |
| backend/src/repositories/product.repository.js | Exports: { findAll, findById, count, create, update, remove } | backend/src/services/product.service.js |
| backend/src/routes/admin.routes.js | Exports: router | backend/server.js; backend/src/app.js |
| backend/src/routes/assessment.routes.js | Exports: router | backend/server.js |
| backend/src/routes/auth.routes.js | Exports: router | backend/server.js; backend/server.js |
| backend/src/routes/brand.routes.js | Exports: router | backend/server.js |
| backend/src/routes/category.routes.js | Exports: router | backend/server.js |
| backend/src/routes/ingredient.routes.js | Exports: router | backend/server.js |
| backend/src/routes/product.routes.js | Exports: router | backend/server.js |
| backend/src/routes/progress.routes.js | Exports: router | backend/server.js |
| backend/src/routes/routine.routes.js | Exports: router | backend/server.js |
| backend/src/scripts/deleteProducts.js | Defines: clean; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/src/scripts/fixImages.js | Defines: fix; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/src/scripts/fixNames.js | Defines: fixNames; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/src/scripts/seedBase.js | Defines: seed; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/src/scripts/seedFix.js | Defines: seed; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/src/scripts/seedProducts.js | Defines: seed; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| backend/src/services/auth.service.js | Exports: { register, login, refresh, logout } | backend/src/controllers/auth.controller.js |
| backend/src/services/brand.service.js | Exports: { getAll, create } | backend/src/controllers/brand.controller.js |
| backend/src/services/category.service.js | Exports: { getAll, create } | backend/src/controllers/category.controller.js |
| backend/src/services/ingredient.service.js | Exports: { getAll, create } | backend/src/controllers/ingredient.controller.js |
| backend/src/services/product.service.js | Exports: { getAll, search, getById, create, update, remove } | backend/src/controllers/product.controller.js |
| backend/src/validators/auth.validator.js | Exports: { registerSchema, loginSchema } | backend/src/routes/auth.routes.js |
| data/products.csv | Historical dataset; retained | scripts/preprocessing.py |
| data/skincare_100.csv | Canonical catalog or identical copy | backend/seedProducts.js; scripts/preprocessing.py (output) |
| eslint.config.js | Exports: defineConfig | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| index.html | Entry point, configuration or documentation | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| ml-service/.gitignore | Entry point, configuration or documentation | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| ml-service/main.py | Defines: PredictRequest, health, predict; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| ml-service/model.pkl | Required trained model artifact | ml-service/predict.py; ml-service/save_model.py; ml/skincare_ml.ipynb |
| ml-service/predict.py | Defines: _normalize_ingredient, _ingredient_matches, load_model_bundle, load_products_df, _encode_value, _build_feature_vector, predict_routine, select_product, build_routine_products, run_prediction; script/module | ml-service/main.py |
| ml-service/requirements.txt | Configuration or artifact | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| ml-service/save_model.py | Defines: save_bundle; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| ml-service/skincare_100.csv | Canonical catalog or identical copy | ml-service/predict.py; backend/seed.js |
| ml/.gitignore | Entry point, configuration or documentation | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| ml/.ipynb_checkpoints/skincare_ml-checkpoint.ipynb | Historical training notebook; retained including outputs | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| ml/interactions.csv | Historical dataset; retained | ml/skincare_ml.ipynb (training) |
| ml/skincare_100.csv | Canonical catalog or identical copy | ml/skincare_ml.ipynb (training) |
| ml/skincare_ml.ipynb | Historical training notebook; retained including outputs | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| ml/users.csv | Historical dataset; retained | ml/skincare_ml.ipynb (training) |
| package-lock.json | Dependency lockfile | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| package.json | Package dependencies and executable scripts | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/favicon.svg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/icons.svg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/aura-emblem-logo.png | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/aura-hero-lab.png | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/0.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/1.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/10.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/11.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/12.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/13.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/14.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/15.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/16.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/17.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/18.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/19.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/2.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/20.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/21.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/22.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/23.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/24.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/25.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/26.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/27.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/28.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/29.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/3.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/30.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/31.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/32.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/33.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/34.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/35.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/36.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/37.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/38.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/39.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/4.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/40.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/41.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/42.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/43.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/44.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/45.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/46.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/47.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/48.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/49.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/5.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/50.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/51.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/52.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/53.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/54.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/55.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/56.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/57.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/58.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/59.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/6.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/60.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/61.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/62.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/63.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/64.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/65.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/66.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/67.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/68.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/69.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/7.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/70.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/71.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/72.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/73.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/74.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/75.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/76.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/77.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/78.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/79.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/8.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/80.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/81.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/82.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/83.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/84.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/85.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/86.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/87.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/88.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/89.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/9.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/90.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/91.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/92.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/93.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/94.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/95.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/96.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/97.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/98.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| public/images/products/99.jpg | Public asset served by Vite; product images selected dynamically by ID | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| scripts/preprocessing.py | Defines: assign_category, main; script/module | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/App.css | Stylesheet | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/App.jsx | Exports: App | src/main.jsx |
| src/assets copy/hero.png | Template/legacy image asset; no static import found | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/assets copy/react.svg | Template/legacy image asset; no static import found | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/assets copy/vite.svg | Template/legacy image asset; no static import found | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/assets/hero.png | Template/legacy image asset; no static import found | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/assets/react.svg | Template/legacy image asset; no static import found | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/assets/vite.svg | Template/legacy image asset; no static import found | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/components/FilterBar.jsx | Exports: FilterBar | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/components/Navbar.jsx | Exports: Navbar | src/App.jsx |
| src/components/ProductCard.jsx | Exports: ProductCard | src/pages/ProductExplorer.jsx |
| src/components/ProtectedAdminRoute.jsx | Exports: ProtectedAdminRoute | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/components/RoutineCard.jsx | Empty placeholder; retained | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/hooks/useSocket.js | Exports: useSocket | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/index.css | Stylesheet | src/main.jsx |
| src/main.jsx | Entry point, configuration or documentation | index.html (entry script) |
| src/pages/Dashboard.jsx | Exports: Dashboard | src/App.jsx |
| src/pages/Home.jsx | Exports: Home | src/App.jsx |
| src/pages/Login.jsx | Exports: Login | src/App.jsx |
| src/pages/ProductExplorer.jsx | Exports: ProductExplorer | src/App.jsx |
| src/pages/Quiz.jsx | Exports: Quiz | src/App.jsx |
| src/pages/Register.jsx | Exports: Register | src/App.jsx |
| src/pages/Routine.jsx | Exports: Routine | src/App.jsx |
| src/pages/admin/AdminLayout.jsx | Exports: AdminLayout | src/App.jsx |
| src/pages/admin/Dashboard.jsx | Exports: Dashboard | src/App.jsx |
| src/pages/admin/ProductsPage.jsx | Exports: ProductsPage | src/App.jsx |
| src/pages/admin/UsersPage.jsx | Exports: UsersPage | src/App.jsx |
| src/services/adminService.js | Exports: getStats; getUsers; toggleUserStatus; assignRole; deleteUser; exportUsers; getProducts; createProduct; updateProduct; deleteProduct; exportProducts | src/pages/admin/Dashboard.jsx; src/pages/admin/ProductsPage.jsx; src/pages/admin/UsersPage.jsx |
| src/services/api.js | Exports: api | src/pages/Dashboard.jsx; src/pages/Login.jsx; src/pages/ProductExplorer.jsx; src/pages/Quiz.jsx; src/pages/Register.jsx; src/pages/Routine.jsx |
| src/services/authService.js | Empty placeholder; retained | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/services/productService.js | Empty placeholder; retained | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
| src/store/index.js | Exports: store; persistor | src/main.jsx; src/services/api.js |
| src/store/slices/authSlice.js | Exports: { loginSuccess, logout, updateTokens }; authSlice.reducer | src/components/Navbar.jsx; src/pages/Login.jsx; src/services/api.js; src/store/index.js |
| src/store/slices/notificationSlice.js | Exports: { addNotification, clearNotifications }; notificationSlice.reducer | src/hooks/useSocket.js; src/store/index.js |
| src/store/slices/productsSlice.js | Exports: { setProducts, setFilters, setLoading }; productsSlice.reducer | src/pages/ProductExplorer.jsx; src/store/index.js |
| src/store/slices/routineSlice.js | Exports: { setRoutine, setProfile, setSavedRoutineId, setLoading }; routineSlice.reducer | src/pages/Quiz.jsx; src/pages/Routine.jsx; src/store/index.js |
| vite.config.js | Exports: defineConfig | Asnjë import lokal statik; mund të jetë hyrje CLI, konfigurim ose asset dinamik |
