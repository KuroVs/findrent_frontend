# FindRent Dashboard 🏠
Admin panel for real estate property management. Built as a frontend portfolio project.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Fetch API

## 📁 Project Structure
findrent_frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── ConfirmDialog.jsx
│   │   └── Toast.jsx
│   ├── pages/
│   │   ├── AmenitiesPage.jsx
│   │   ├── OwnersPage.jsx
│   │   └── PropertiesPage.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── amenities.service.js
│   │   ├── owners.service.js
│   │   └── properties.service.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js

## 🗄️ Pages
| Page | Description |
|------|-------------|
| Amenities | List, create, edit and delete amenities |
| Owners | List, create, edit and delete property owners |
| Properties | List, create, edit and delete properties with amenities |

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/KuroVs/findrent_frontend.git
cd findrent_frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure the API URL
Make sure the backend is running, then verify the base URL in `src/services/api.js`:
```js
const API_URL = 'http://localhost:3000'
```

### 4. Start the dev server
```bash
npm run dev
```
App runs at http://localhost:5173

## 🧩 Components
| Component | Description |
|-----------|-------------|
| `Sidebar` | Dark navigation sidebar with active route highlight |
| `Header` | Top bar with page title and system status |
| `ConfirmDialog` | Reusable confirmation modal |
| `Toast` | Temporary success/error notifications |

## 🔗 Related
Backend API → [findrent_backend](https://github.com/KuroVs/findrent_backend)

## 🔜 Upcoming Features
- [ ] Create and edit amenities
- [ ] Owners management with pagination
- [ ] Properties management with expandable rows
- [ ] Responsive sidebar for mobile
- [ ] JWT Authentication