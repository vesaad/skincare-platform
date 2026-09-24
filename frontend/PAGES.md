# Harta faqe → URL

File-t janë relative ndaj `frontend/src/`. Burimi: `app/app.jsx`.

| URL | File | Çfarë bën | Qasja |
| --- | --- | --- | --- |
| `/` | `features/home/home.jsx` | Prezanton platformën dhe kujdesin personal | Publike |
| `/login` | `features/auth/login.jsx` | Hyrje në llogarinë e përdoruesit | Publike |
| `/register` | `features/auth/register.jsx` | Krijon llogari të re përdoruesi | Publike |
| `/products` | `features/products/product-explorer.jsx` | Shfaq, kërkon dhe filtron produkte | Publike |
| `/quiz` | `features/assessment/quiz.jsx` | Mbledh përgjigje për rekomandimin personal | Kërkon login |
| `/routine` | `features/routines/routine.jsx` | Shfaq dhe ruan rutinën e rekomanduar | Kërkon login |
| `/dashboard` | `features/routines/dashboard.jsx` | Shfaq rutinën aktive dhe regjistron progres | Kërkon login |
| `/admin` (prind) | `features/admin/admin-layout.jsx` | Përmban navigimin dhe faqet administrative | Vetëm Admin |
| `/admin` (index) | `features/admin/dashboard.jsx` | Shfaq statistikat e panelit administrativ | Vetëm Admin |
| `/admin/users` | `features/admin/users-page.jsx` | Menaxhon përdoruesit dhe eksporton listën | Vetëm Admin |
| `/admin/products` | `features/admin/products-page.jsx` | Menaxhon produktet dhe eksporton listën | Vetëm Admin |

`/admin` ka dy deklarime route: layout-in prind dhe faqen index që shfaqet brenda tij; nuk janë dy URL të ndryshme. Faqet fëmijë trashëgojnë `AdminRoute`.

`PrivateRoute` kërkon `auth.isAuthenticated`. `AdminRoute` kërkon edhe `auth.user.role === 'Admin'`. Këto janë kontrollet e frontend-it; API-ja ka kontrollet e veta në backend.
