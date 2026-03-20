# UK Wind Forecast Monitoring Pro

A high-performance monitoring dashboard using a MERN-style stack (React + Node.js) to evaluate UK national-level wind generation forecasts.

## 🚀 Application Technical Stack
- **Frontend**: React (Vite) + Tailwind CSS v4 + SVGs (Custom Charts)
- **Backend**: Node.js + Express (ES Modules)
- **Data Engine**: Parallel BMRS (Elexon) API hooks with synchronous data merging and local in-memory caching.

## 📁 Project Structure
- `Frontend/`: React application logic, custom UI design, and responsive Tailwind components.
- `Backend/`: Modular Express server with dedicated services for processing, metrics, and data normalization.
- `Analysis.ipynb`: Statistical analysis of forecast error and grid reliability (Jupyter Notebook).
- `.gitignore`: Configured to ignore node_modules and sensitive env files for cleaner source control.

## 🛠️ How to Start the Application locally

### Prerequisites
- Node.js (v20+) installed.

### 1. Start the Backend
```bash
cd Backend
npm install
npm install -g nodemon  # (if not already present)
npm start
```
The backend server will run on `http://localhost:5000`.

### 2. Start the Frontend
```bash
cd Frontend
npm install
npm run dev
```
The dashboard will be available at `http://localhost:5173`.

## 📊 Forecast Analysis Summary
- **Error Metrics**: Calculated Mean Absolute Error (MAE), Root Mean Square Error (RMSE), and Model Bias across a sliding 48h horizon.
- **Reliability Recommendation**: Based on P95 quantile analysis of historical generation (Jan 2025 onwards), the system identifies the "firm" capacity slice of wind generation that can be reliably expected to meet demand even in low-wind scenarios.

## 🤖 AI Disclosure
**Note**: This application, including its frontend components and backend services, was architected and implemented using **Antigravity AI (Google DeepMind)** as a pair programmer. Extensive cross-functional refactoring, data processing logic, and statistical derivation models were assisted by AI agents to achieve production-grade modularity and code quality.

## 🎥 YouTube Demo & Analysis Walkthrough
- [Youtube Unlisted Video Placeholder]

---
Developed for the Full Stack SWE Challenge.
