# Cila faqe flet me serverin?

Frontend-i është pjesa që shikon përdoruesi; backend-i është serveri që përpunon kërkesat.
Endpoint-i është adresa ku dërgohet kërkesa, si sporteli për një shërbim të caktuar.
`GET` lexon, `POST` dërgon për përpunim ose ruajtje, `PUT` ndryshon, ndërsa `DELETE` fshin.
`:id` zëvendësohet me numrin e përdoruesit ose produktit.
CSV është skedar me rreshta dhe kolona, i hapshëm edhe në Excel.

File-t janë brenda `frontend/src/features/`. Adresave u paraprin `http://localhost:3001` në kodin aktual.

| Faqja (frontend)                | Endpoint i thirrur           | Metoda | Çfarë ndodh në backend (shkurt) |
| ---                             | ---                          | ---    | --- |
| `home/home.jsx`                 | asnjë — statike ndaj serverit| —      | Nuk dërgon kërkesa për përpunim në server |
| `auth/login.jsx`                | `/api/auth/login`            | POST   | Kontrollon kredencialet dhe jep lejen e hyrjes |
| `auth/register.jsx`             | `/api/auth/register`         | POST   | Krijon llogarinë dhe ruan fjalëkalimin të mbrojtur |
| `products/product-explorer.jsx` | `/api/products/search`       | GET    | Kërkon produktet sipas filtrave dhe faqes |
| `assessment/quiz.jsx`           | `/api/assessment`            | POST   | Kërkon rekomandimin dhe ruan rezultatin e vlerësimit |
| `routines/routine.jsx`          | `/api/routines`              | POST   | Ruan rutinën e re si aktive |
| `routines/dashboard.jsx`        | `/api/routines/active`       | GET    | Kthen rutinën aktive dhe shënimet e fundit |
| `routines/dashboard.jsx`        | `/api/progress-logs`         | POST   | Ruan vlerësimin dhe shënimin e progresit |
| `admin/admin-layout.jsx`        | asnjë — vetëm navigim        | —      | Nuk dërgon vetë kërkesa në server |
| `admin/dashboard.jsx`           | `/api/admin/stats`           | GET    | Numëron përdoruesit dhe produktet sipas kategorive |
| `admin/users-page.jsx`          | `/api/admin/users`           | GET    | Kthen listën e përdoruesve me rolet |
| `admin/users-page.jsx`          | `/api/admin/users/:id/status`| PUT    | Ndërron shenjën aktiv ose joaktiv të përdoruesit |
| `admin/users-page.jsx`          | `/api/admin/users/:id`       | DELETE | Fshin lidhjet e roleve dhe përdoruesin |
| `admin/users-page.jsx`          | `/api/admin/export/users`    | GET    | Përgatit listën e përdoruesve për shkarkim |
| `admin/products-page.jsx`       | `/api/admin/products`        | GET    | Kthen listën e produkteve për administrim |
| `admin/products-page.jsx`       | `/api/admin/products/:id`    | PUT    | Përditëson të dhënat e produktit të zgjedhur |
| `admin/products-page.jsx`       | `/api/admin/products/:id`    | DELETE | Fshin produktin e zgjedhur nga databaza |
| `admin/products-page.jsx`       | `/api/admin/export/products` | GET    | Përgatit listën e produkteve për shkarkim |

## Thirrja automatike e përbashkët

Token-i është një biletë dixhitale që dëshmon hyrjen. Refresh token-i është bileta për ta rinovuar atë.

| Faqja (frontend) | Endpoint i thirrur | Metoda | Çfarë ndodh në backend (shkurt) |
| --- | --- | --- | --- |
| `auth/login.jsx`, `auth/register.jsx`, `products/product-explorer.jsx`, `assessment/quiz.jsx`, `routines/routine.jsx`, `routines/dashboard.jsx` — përmes `shared/services/api.js` | `/api/auth/refresh` | POST | Kontrollon biletën rinovuese dhe lëshon bileta të reja |

Kjo ndodh vetëm pas përgjigjes `401` (hyrja nuk pranohet), kur ekziston bileta rinovuese.
`api.js` provon vetëm një herë për kërkesën; pas suksesit, përsërit kërkesën fillestare.
Faqet admin përdorin `admin.service.js`; ai nuk ka këtë rinovim automatik.

## Ku përpunohet kërkesa?

Controller-i është recepsionisti që merr kërkesën; service është punëtori që kryen punën.
Emrat më poshtë gjenden brenda `backend/src/features/`.

- Hyrja, regjistrimi dhe rinovimi: `auth/auth.controller.js` → `auth/auth.service.js`.
- Kërkimi i produkteve: `products/product.controller.js` → `products/product.service.js`.
- Quiz-i: `assessment/assessment.controller.js` → `assessment/assessment.service.js` → shërbimi rekomandues, zakonisht `POST http://localhost:8000/predict`.
- Rutina: `routines/routine.controller.js` → `routines/routine.service.js`.
- Progresi: `progress/progress.controller.js` → `progress/progress.service.js`.
- Administrimi: `admin/admin-user.controller.js`, `admin/admin-product.controller.js`, `admin/admin-dashboard.controller.js` → file-t përkatës `.service.js`.

## Dallime të rëndësishme nga kodi

- Home nuk kërkon të dhëna nga serveri. Vlerësimet e shkruara aty ruhen vetëm në shfletues.
- `routine.jsx` lexon rezultatin e quiz-it nga memoria e aplikacionit; nuk bën kërkesë për marrjen e rutinës.
- Faqet admin thërrasin funksionet e `admin.service.js`. Pas ndryshimeve ose fshirjeve, marrin sërish listën përkatëse.
- `createProduct` dhe `assignRole` ekzistojnë në atë file, por këto faqe nuk i thërrasin.
- Asnjë faqe nuk përdor Socket.IO (komunikim i menjëhershëm me mesazhe).
- `notifications/use-socket.js` dërgon `user:join` dhe dëgjon `notification:new`, por nuk importohet nga kodi tjetër i frontend-it.
- Kontrolli përfshiu thirrjet e drejtpërdrejta, funksionet ndihmëse dhe adresat e regjistruara në `backend/src/server.js`.
