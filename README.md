# बुलंदी साहित्य संस्थान | Bulandi Sahitya Sansthan
### Fullstack Platform (MERN Stack: MongoDB • Express • React • Node.js)

An international cultural and literary platform honoring Hindi and indigenous Indian languages, commemorating **500+ Sunday Online E-Goshthis** and the **101-Hour Non-Stop Marathon World Record** certified by the World Book of Records (London).

---

## 🏛️ Architecture & Folder Structure

```text
Bulandi-Website-Project/
├── backend/                        # Express & MongoDB REST API Service
│   ├── config/                     # Database connection (Mongoose + resilient memory store)
│   ├── models/                     # Mongoose Schemas (Poems, Sessions, Members, Donations, Forms, Events)
│   ├── routes/                     # REST API Endpoints (/api/poems, /api/sunday-sessions, etc.)
│   ├── server.js                   # Server bootstrap & middleware
│   ├── .env                        # Port & MongoDB URI configurations
│   └── package.json
│
├── frontend/                       # React 18 + Vite Web Application
│   ├── public/assets/images/       # High-definition client media assets (Banner, Trophy, Sessions)
│   ├── src/
│   │   ├── components/             # Reusable UI modules (Navbar, Hero, SundayGoshthi, WorldRecords, 
│   │   │                           # EventsSection, PoemSubmission, Membership, Donations, AdminReviewModal)
│   │   ├── translations.js         # Complete site-wide bilingual engine (Hindi & English)
│   │   ├── index.css               # Official Brand Design System tokens & responsive styling
│   │   ├── App.jsx                 # Master application controller
│   │   └── main.jsx
│   ├── vite.config.js              # Dev proxy configuration to Backend API
│   └── package.json
│
├── 01-Client-Requirements/         # Official requirements & proposals
├── 02-Project-Planning/            # Specifications, sitemaps, user flows, architecture
├── 03-Design/                      # UI style guide & wireframe documentation
├── 05-Testing/                     # Functional & responsive verification checklist
├── 06-Client-Assets/               # Original client high-res assets
├── .gitignore                      # Git exclusion rules
└── package.json                    # Root monorepo orchestration scripts
```

---

## 🚀 Quick Start & Development

### 1. Prerequisites
- **Node.js** v18+ & **npm**
- **MongoDB** running locally on default port `27017` (or provide `MONGO_URI` in `backend/.env`)

### 2. Install All Dependencies
From the repository root:
```bash
npm run install:all
```

### 3. Run Both Frontend and Backend Concurrently
```bash
npm run dev
```
- **Frontend URL:** [http://localhost:3000](http://localhost:3000)
- **Backend API URL:** [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 4. Run Individually (Optional)
- Backend: `npm run dev:backend`
- Frontend: `npm run dev:frontend`

---

## 🌐 Implemented Features & Endpoints

| Feature | Frontend Section / Component | Backend API Endpoint |
|---|---|---|
| **Bilingual Language Switcher** | Dynamic Instant toggle between **हिंदी** & **English** | Persistent in `localStorage` |
| **Hero & Metric Counters** | 500+ Sessions, 101h Record, 50k+ Poets, 45+ Nations | Dynamic animated stats |
| **Sunday E-Goshthi Spotlight** | 249th Live Session Card & Digital Pass Generator | `POST /api/sunday-sessions` |
| **World Records Showcase** | 101-Hour Non-stop Marathon Certificate & Trophy Modal | Interactive image preview |
| **Programs & Events** | Category Filter (`All`, `Online`, `Offline`, `Competitions`) | `GET /api/events` |
| **Poem Submission Portal** | Genre/Language Selectors, Originality check, Reference Code | `POST /api/poems` (`BLD-POEM-2026-XXXX`) |
| **Annual Membership** | Standard (₹500), Special (₹1,500), Patron (₹5,000) + ID Card | `POST /api/memberships` (`BLD-MEM-XXXX`) |
| **Donations & Cultural Support** | Preset amounts, Cause selector, 80G disclaimer & receipts | `POST /api/donations` (`BLD-DON-XXXX`) |
| **Admin Review Portal (CMS)** | Full Moderator Dashboard for Poems, Attendees & Members | `GET /api/admin/stats`<br>`PATCH /api/poems/:id/status` |
| **Volunteer & Institution MoU** | Volunteer application & University collaboration forms | `POST /api/volunteers`<br>`POST /api/collaborations` |
| **Contact & Secretariat** | Office coordinates, Email, Hotline, Enquiry form | `POST /api/contact` |

---

## 🐙 How to Push to GitHub

1. Ensure you are on the `main` branch:
   ```bash
   git branch -M main
   ```
2. Stage and commit:
   ```bash
   git add .
   git commit -m "feat: complete MERN stack architecture with frontend and backend"
   ```
3. Add your GitHub remote repository:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/Bulandi-Website-Project.git
   ```
4. Push `main` and create `develop`:
   ```bash
   git push -u origin main
   git checkout -b develop
   git push -u origin develop
   ```
