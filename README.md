# FastBill – Lightweight Inventory & Billing Web App

FastBill is a **lightweight, web-based inventory and billing system** designed for **small businesses** that operate with:
- Slow or unreliable internet connections  
- Older computers or low-end hardware  
- Limited IT support  
- A need for simple, fast, and dependable software  

Many existing billing and inventory systems are **heavy**, **resource-hungry**, or **overly complex**.  
FastBill focuses on **speed, simplicity, and reliability** instead.

---

## 🚩 Why FastBill?

Small businesses such as stationery shops, grocery stores, medical stores, and local retailers often face:
- Desktop software that runs slowly on old systems
- Heavy applications that require frequent updates
- Tools that assume high-speed internet availability
- Complicated UIs that slow down daily billing work
- Expensive licensing or subscription models

**FastBill solves this by being:**
- Web-based (runs entirely in a browser)
- Lightweight (low CPU and memory usage)
- Fast even on low-end machines
- Easy to deploy locally or on a small server
- Simple enough for non-technical users

---

## ✨ Key Features

### Inventory Management
- Add, update, and delete products
- Real-time stock tracking
- Category-based organization
- Low-stock (refill) alerts

### Billing System
- Fast product search and cart-based billing
- Automatic stock deduction on billing
- Accurate total calculation
- PDF bill generation

### Refill Alerts
- Automatic alerts when stock reaches refill limit
- Dedicated view for low-stock products

### Dashboard
- Quick overview of inventory and billing
- Fast navigation between modules
- Minimalist, distraction-free UI

---

## 🧠 Design Philosophy
- **Minimalist UI** – no unnecessary clutter  
- **Metro-inspired layout** – clear sections, fast navigation  
- **Calm color palette** – grayscale UI, color only for important actions  
- **User comfort first** – designed for long daily usage  

The goal is to make users feel *at home*, not overwhelmed.

---

## 🛠️ Tech Stack

### Backend
- **Python**
- **FastAPI** – high-performance, lightweight backend
- **Uvicorn** – ASGI server
- **File-based JSON storage** (simple, portable, DB-free)
- **ReportLab** – PDF generation

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Shadcn/UI components**
- **Lucide Icons**

### Tooling
- Git & GitHub (SSH-based authentication)
- Cross-platform (Linux & Windows)
- Modular, scalable project structure

---

## 📁 Project Structure (High Level)

```
fastbill/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── models/
│   │   └── main.py
│   ├── venv/
│   └── requirements.txt
│
├── frontend/
│   └── app/
│       ├── src/
│       │   ├── pages/
│       │   ├── components/
│       │   ├── hooks/
│       │   └── lib/
│       └── package.json
│
└── README.md
```

---

## 🚀 Setup & Run (Local)

### Backend Setup

#### Bash / Zsh (Linux & macOS)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Fish (Linux)
```fish
cd backend
python -m venv venv
source venv/bin/activate.fish
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### PowerShell (Windows)
```powershell
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Backend will run at:**  
`http://127.0.0.1:8000`

**API docs:**  
`http://127.0.0.1:8000/docs`

### Frontend Setup

```bash
cd frontend/app
npm install
npm run dev
```

**Frontend will run at:**  
`http://localhost:5173`

---

## 🎯 Future Improvements

- Optional database support (SQLite / PostgreSQL)
- Offline-first mode
- User authentication & roles
- Multi-store support
- Docker-based deployment
- Cloud hosting options

---

## 📌 Target Users

- Small retail businesses
- Local shops with old hardware
- Educational projects
- Developers learning full-stack architecture
- Anyone needing a fast, simple billing system

---

## 📜 License

Open-source project intended for learning, experimentation, and small-scale real-world usage.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or suggestions, please open an issue on Github
