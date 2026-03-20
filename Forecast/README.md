# 🌬️ UK Wind Forecast Monitoring Pro

A production-grade full-stack analytics platform built using a MERN-style architecture to evaluate UK national-level wind generation forecasts against actual generation data.

---

## 🚀 Live Demo

* **Frontend (Vercel):** https://your-frontend-link
* **Backend (Render):** https://your-backend-link

---

## 📌 Overview

This system ingests real-time wind generation data from BMRS (Elexon), processes forecast vs actual performance, and visualizes key reliability metrics.

It is designed to simulate a real-world energy analytics system used for:

* Grid reliability monitoring
* Forecast performance evaluation
* Renewable energy planning

---

## ⚡ Engine Highlights (Advanced Engineering)

* **Sequential Chunking Engine**
  Implemented a custom chunking mechanism (5-day windows) to bypass BMRS API range limitations, enabling stable ingestion of large historical datasets (~30 days+).

* **Intelligent Time Alignment**
  Micro-service logic to align forecast and actual values across varying publication horizons (0–48 hours).

* **In-Memory Caching Layer**
  Reduces redundant API calls and significantly improves performance for repeated queries.

* **Fault-Tolerant Data Handling**
  Missing/null values are safely ignored to maintain data integrity in analytics.

---

## 🧠 System Architecture

```text
React Dashboard (Frontend)
        ↓
Node.js API (Backend)
        ↓
BMRS API (Elexon Data Source)
        ↓
Data Processing Layer (Chunking + Filtering + Merging)
        ↓
Metrics Engine (MAE, RMSE, Bias, P95 Reliability)
        ↓
Visualization Layer (Charts + KPI Cards)
```

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS v4
* Custom SVG-based charts (high-performance rendering)

### Backend

* Node.js (ES Modules)
* Express.js
* Axios (API calls)
* Node-Cache (in-memory caching)

### Data Processing

* Time-series alignment logic
* Forecast horizon filtering (0–48h)
* Chunked data ingestion engine

---

## 📁 Project Structure

```text
Frontend/
  ├── components/
  ├── pages/
  ├── assets/

Backend/
  ├── controllers/
  ├── services/
  ├── routes/
  ├── utils/

Analysis.ipynb
README.md
```

---

## ⚙️ How to Run Locally

### Prerequisites

* Node.js (v20+)

---

### 1. Start Backend

```bash
cd Backend
npm install
npm start
```

Runs on:
http://localhost:5000

---

### 2. Start Frontend

```bash
cd Frontend
npm install
npm run dev
```

Runs on:
http://localhost:5173

---

## ⚙️ Data Processing Logic

* Filters data from **January 2025 onwards**
* Applies **forecast horizon filter (0–48 hours)**
  *(horizon = startTime - publishTime)*
* Uses **chunked fetching (5-day windows)** to overcome API limits
* Removes null/missing values
* Aligns actual vs forecast using `startTime`
* Sorts chronologically for time-series visualization

---

## 📊 Metrics & Analysis

### Mean Absolute Error (MAE)

Measures average absolute deviation between forecast and actual values.

### Root Mean Square Error (RMSE)

Penalizes larger errors more significantly, highlighting volatility.

### Bias

Indicates systematic overprediction or underprediction.

### Model Confidence

Derived from normalized error relative to average generation.

---

## 📈 Statistical Analysis Summary (Analysis.ipynb)

* **P95 Reliability Analysis**
  Identifies the "firm" wind generation capacity that can be reliably expected even under low-wind conditions.

* **Forecast Bias Insights**
  Detected consistent underprediction during high wind generation periods.

* **Volatility Detection**
  High RMSE values correlate with unstable wind patterns across time intervals.

---

## 🖼️ Screenshots

<img width="1919" height="964" alt="image" src="https://github.com/user-attachments/assets/cdc9b11f-72f4-4235-b59d-4e25f96803bd" />

<img width="1919" height="965" alt="image" src="https://github.com/user-attachments/assets/8384b516-48de-439e-9a1c-9392936e8c9c" />



---

## 📹 Demo Video

Unlisted YouTube Link:
https://your-youtube-link

---

## 🤖 AI Disclosure

This project was developed using AI-assisted pair programming.

Tools used:

* Antigravity AI (Google DeepMind)
* ChatGPT (OpenAI)

AI was used for:

* Backend architecture planning
* Data processing optimization
* UI structuring and component design

All final implementation, integration, and validation were performed manually.

---

## 🎯 Use Cases

* Renewable energy forecasting validation
* Grid stability analysis
* Power generation planning
* Risk assessment for low-wind scenarios

---

## 🚀 Future Improvements

* Redis caching for distributed scalability
* Real-time streaming with WebSockets
* Advanced ML-based forecasting models
* Role-based dashboards with authentication

---

## 📦 Submission Notes

* Includes full Git history for development traceability
* Modular and scalable backend architecture
* Clean, reusable frontend components
* Integrated statistical analysis notebook



**Sandeep**
Full Stack Developer (MERN)
