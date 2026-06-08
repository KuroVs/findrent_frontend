# FindRent Dashboard 🏠

Administrative dashboard for real estate property management. Built as a frontend portfolio project using React, Vite and Tailwind CSS.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Client:** Fetch API
* **State Management:** React Hooks

---

## 📁 Project Structure

```
findrent_frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── Toast.jsx
│   │   ├── OwnerModal.jsx
│   │   ├── AmenityModal.jsx
│   │   └── PropertyModal.jsx
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
├── public/
├── index.html
├── vite.config.js
└── README.md
```

---

## ✨ Features

### Owners Management

* View all owners
* Create new owners
* Edit owner information
* Delete owners
* Responsive cards layout
* Success and error notifications

### Amenities Management

* View all amenities
* Create amenities
* Edit amenities
* Delete amenities
* Confirmation dialogs before deletion

### Properties Management

* View all properties
* Create properties
* Edit properties
* Delete properties
* Assign amenities to properties
* Remove amenities from properties
* Detailed property side panel
* Property status indicator
* Operation type indicator (Sale / Rent)
* Automatic pagination
* Responsive design

### Property Filters

* Filter by city
* Filter by minimum price
* Filter by maximum price
* Filter by bedrooms
* Filter by bathrooms
* Filter by operation type
* Pagination support

### Dashboard Experience

* Mobile responsive layout
* Interactive detail panels
* Reusable modals
* Toast notifications
* Confirmation dialogs
* Sidebar navigation
* Clean administrative interface

---

## 🗄️ Pages

| Page       | Description                                       |
| ---------- | ------------------------------------------------- |
| Amenities  | Manage amenities (CRUD)                           |
| Owners     | Manage property owners (CRUD)                     |
| Properties | Manage properties, amenities, filters and details |

---

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

Make sure the backend is running, then verify the base URL in:

```js
src/services/api.js
```

Example:

```js
const API_URL = 'http://localhost:3000'
```

### 4. Start the development server

```bash
npm run dev
```

Application runs at:

```text
http://localhost:5173
```

---

## 🧩 Components

| Component     | Description                     |
| ------------- | ------------------------------- |
| Sidebar       | Navigation menu                 |
| Header        | Top bar with page title         |
| ConfirmDialog | Reusable confirmation modal     |
| Toast         | Success and error notifications |
| OwnerModal    | Owner creation and editing      |
| AmenityModal  | Amenity creation and editing    |
| PropertyModal | Property creation and editing   |

---

## 📡 Backend Integration

The dashboard consumes the FindRent REST API built with:

* Express.js
* PostgreSQL
* Knex.js
* Swagger/OpenAPI

Supported operations:

* GET
* POST
* PATCH
* DELETE

---

## 🌍 Geolocation Support

Properties automatically receive latitude and longitude coordinates through backend geocoding based on:

* City
* Address

Coordinates are obtained using OpenStreetMap's Nominatim service.

---

## 🔗 Related Repositories

Backend API:

https://github.com/KuroVs/findrent_backend

---

## 🏗️ Architecture

Frontend Architecture:

```
Pages
  ↓
Components
  ↓
Services
  ↓
REST API
  ↓
PostgreSQL
```

---

## 🔜 Future Improvements

* [ ] JWT Authentication
* [ ] Interactive maps with Leaflet
* [ ] Property image uploads
* [ ] Advanced property filters
* [ ] Dashboard analytics
* [ ] Dark mode
* [ ] Role-based permissions

---

## 👨‍💻 Author

Miguel Angel Viloria Sierra

Portfolio project focused on full-stack development with React, Express and PostgreSQL.
