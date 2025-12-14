# 🎨 VoiceOps Analytics – Frontend

## Overview

**VoiceOps Analytics** is a lightweight frontend dashboard built for analyzing voice AI performance. It visualizes call metrics, highlights failure ("sad path") reasons, and allows users to overwrite sample analytics data while safely persisting changes in Supabase.

This frontend is designed to complement the backend webhook service and fulfills the frontend requirements of the assessment.

---

## ✨ Features

- 🌙 **Modern dark analytics UI**
- 📊 **Call analytics charts** (line + donut)
- 🚨 **Sad Path Analysis** to visualize failure reasons
- ✏️ **Editable chart** with:
  - Email verification before editing
  - Data persistence in Supabase
  - Overwrite confirmation with previous values
- ☁️ **Cloud-deployable**, production-ready setup

---

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Recharts** (data visualization)
- **Supabase** (cloud database)

---

## 📱 Screens / Functional Sections

### 1. Daily Call Volume
Line chart displaying call volume trends (editable)

### 2. Sad Path Analysis
Donut chart showing failure reasons breakdown

### 3. Edit Flow
1. User clicks **Edit**
2. Enters **email** + **new value**
3. Value is saved in **Supabase**
4. Chart updates **immediately**
5. On next edit, previous value is shown and **overwrite is confirmed**

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+
npm or yarn
```

### Installation
```bash
# Clone the repository
git clone https://github.com/Snsnehad/wfg_frontend.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase credentials
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

---

## 🗄️ Database Setup

Create a Supabase table:
```sql
CREATE TABLE chart_updates (
  email TEXT PRIMARY KEY,
  value INTEGER NOT NULL,
);
```

---

## 📄 License

MIT

---

## 👤 Author

**Sneha Dwivedi**  
Full Stack Developer
---

Built with ❤️ for voice AI analytics